require('dotenv').config();
const express = require('express');
const oracledb = require('oracledb');
const cors     = require('cors');
const bcrypt   = require('bcryptjs');
const axios    = require('axios');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const db = {
  user:          process.env.DB_USER,
  password:      process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT,
};


oracledb.getConnection(db)
  .then(c => { console.log('DB Connected!'); c.close(); })
  .catch(e => console.error('DB Failed:', e.message));

// Helper — open connection, run query, close
async function query(sql, binds = {}, opts = {}) {
  const conn = await oracledb.getConnection(db);
  try {
    return await conn.execute(sql, binds, { outFormat: oracledb.OUT_FORMAT_OBJECT, ...opts });
  } finally {
    await conn.close();
  }
}

// ─── REGISTER ────────────────────────────────────────────────────
app.post('/api/register', async (req, res) => {
  const { Full_Name, Email, Password, CNIC, Phone, Address } = req.body || {};

  if (!Full_Name || !Email || !Password)
    return res.status(400).json({ message: 'Name, Email and Password required.' });

  try {
    const hashed = await bcrypt.hash(Password, 10);
    const result = await query(
      `INSERT INTO USERS (FULL_NAME, EMAIL, PASSWORD, CNIC, PHONE, ADDRESS, ROLE)
       VALUES (:Full_Name, :Email, :hashed, :CNIC, :Phone, :Address, 'User')
       RETURNING USER_ID INTO :id`,
      {
        Full_Name, Email, hashed,
        CNIC:    CNIC    || null,
        Phone:   Phone   || null,
        Address: Address || null,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      },
      { autoCommit: true }
    );
    res.status(201).json({ user_id: result.outBinds.id?.[0], message: 'Registered successfully.' });
  } catch (err) {
    if (err.errorNum === 1)
      return res.status(409).json({ message: 'Email or CNIC already exists.' });
    console.error('Register Error:', err.message);
    res.status(500).json({ message: 'Registration failed.', details: err.message });
  }
});

// ─── LOGIN ───────────────────────────────────────────────────────
app.post('/api/login', async (req, res) => {
  const { Email, Password } = req.body || {};
  if (!Email || !Password)
    return res.status(400).json({ message: 'Email and Password required.' });

  try {
    const result = await query(
      `SELECT USER_ID, FULL_NAME, EMAIL, PASSWORD, CNIC, PHONE, ADDRESS,
              ROLE, USER_PROFILEPIC, FATHER_NAME, DISTRICT,
              TO_CHAR(DOB, 'YYYY-MM-DD') AS DOB
       FROM USERS WHERE EMAIL = :Email`,
      { Email }
    );

    if (!result.rows.length)
      return res.status(401).json({ message: 'Invalid email or password.' });

    const u = result.rows[0];
    if (!await bcrypt.compare(Password, u.PASSWORD))
      return res.status(401).json({ message: 'Invalid email or password.' });

    // Save login log
    try {
      const ua  = String(req.headers['user-agent'] || '');
      const fwd = req.headers['x-forwarded-for'];
      const ip  = String(typeof fwd === 'string' ? fwd.split(',')[0].trim() : req.socket?.remoteAddress || '');

      const device = /mobile/i.test(ua) ? 'Mobile' : /tablet|ipad/i.test(ua) ? 'Tablet' : 'Desktop';

      const isLocal = ['::1','127.0.0.1'].includes(ip) || ip.startsWith('192.168') || ip.startsWith('10.');
      let location  = 'Local Device';
      if (!isLocal) {
        const geo = await axios.get(`http://ip-api.com/json/${ip}?fields=city,country`, { timeout: 3000 }).catch(() => null);
        location = geo?.data?.city ? `${geo.data.city}, ${geo.data.country}` : ip || 'Unknown';
      }

      const conn2 = await oracledb.getConnection(db);
      await conn2.execute(
        `INSERT INTO LOGIN_LOGS (USER_ID, DEVICE, IP_ADDRESS, STATUS, LOGIN_AT)
         VALUES (:uid, :device, :loc, 'Success', SYSTIMESTAMP)`,
        { uid: u.USER_ID, device: device.substring(0,100), loc: location.substring(0,50) },
        { autoCommit: true }
      );
      await conn2.close();
    } catch (logErr) {
      console.error('Log error:', logErr.message);
    }

    // CLOB pic → string
    let pic = '';
    if (u.USER_PROFILEPIC) {
      pic = typeof u.USER_PROFILEPIC === 'string'
        ? u.USER_PROFILEPIC
        : (await u.USER_PROFILEPIC.getData?.() || '');
    }

    res.json({
      user_id:     u.USER_ID,
      full_name:   u.FULL_NAME   || '',
      email:       u.EMAIL       || '',
      cnic:        u.CNIC        || '',
      phone:       u.PHONE       || '',
      address:     u.ADDRESS     || '',
      role:        u.ROLE        || 'User',
      profilepic:  pic,
      father_name: u.FATHER_NAME || '',
      district:    u.DISTRICT    || '',
      dob:         u.DOB         || '',
    });

  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: 'Login failed.', details: err.message });
  }
});

// ─── UPDATE PROFILE ──────────────────────────────────────────────
app.put('/api/users/:id', async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId) return res.status(400).json({ message: 'Invalid user ID.' });

  const { full_name, phone, address, cnic, father_name, district, dob, profilepic } = req.body || {};

  try {
    await query(
      `UPDATE USERS SET
         FULL_NAME       = :full_name,
         PHONE           = :phone,
         ADDRESS         = :address,
         CNIC            = :cnic,
         FATHER_NAME     = :father_name,
         DISTRICT        = :district,
         DOB             = TO_DATE(NULLIF(:dob, ''), 'YYYY-MM-DD'),
         USER_PROFILEPIC = :profilepic
       WHERE USER_ID = :user_id`,
      {
        full_name:   full_name   || null,
        phone:       phone       || null,
        address:     address     || null,
        cnic:        cnic        || null,
        father_name: father_name || null,
        district:    district    || null,
        dob:         dob         || null,
        profilepic:  profilepic ? { val: profilepic, type: oracledb.CLOB } : null,
        user_id:     userId,
      },
      { autoCommit: true }
    );
    res.json({ message: 'Profile updated successfully.' });
  } catch (err) {
    console.error('Update Error:', err.message);
    res.status(500).json({ message: 'Update failed.', details: err.message });
  }
});

// ─── GET LOGIN LOGS ──────────────────────────────────────────────
app.get('/api/users/:id/logs', async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId) return res.status(400).json({ message: 'Invalid user ID.' });

  try {
    const result = await query(
      `SELECT TO_CHAR(LOGIN_AT, 'DD Mon YYYY') AS DATE_STR,
              DEVICE, IP_ADDRESS, STATUS
       FROM LOGIN_LOGS
       WHERE USER_ID = :user_id
       ORDER BY LOGIN_AT DESC
       FETCH FIRST 10 ROWS ONLY`,
      { user_id: userId }
    );
    res.json(result.rows || []);
  } catch (err) {
    console.error('Logs Error:', err.message);
    res.status(500).json({ message: 'Could not fetch logs.' });
  }
});

// ─── GET ALL USERS ───────────────────────────────────────────────
app.get('/api/users', async (req, res) => {
  try {
    const result = await query(
      `SELECT USER_ID, FULL_NAME, EMAIL, CNIC, PHONE, ADDRESS,
              FATHER_NAME, DISTRICT, TO_CHAR(DOB,'YYYY-MM-DD') AS DOB,
              ROLE, CREATED_AT, USER_PROFILEPIC
       FROM USERS ORDER BY USER_ID`
    );
    res.json(result.rows || []);
  } catch (err) {
    console.error('Users Error:', err.message);
    res.status(500).json({ message: 'Could not fetch users.' });
  }
});

// ─── GET DATA (admin) ─────────────────────────────────────────────
app.get('/api/data', async (req, res) => {
  try {
    const result = await query(
      `SELECT USER_ID, FULL_NAME, EMAIL, CNIC, PHONE, ADDRESS,
              FATHER_NAME, DISTRICT, TO_CHAR(DOB,'YYYY-MM-DD') AS DOB,
              ROLE, CREATED_AT, USER_PROFILEPIC
       FROM USERS ORDER BY USER_ID`
    );
    res.json(result.rows || []);
  } catch (err) {
    console.error('Data Error:', err.message);
    res.status(500).json({ message: 'Could not fetch data.' });
  }
});

// ─── START ───────────────────────────────────────────────────────
app.listen(5000, () => console.log('🚀 Server running on port 5000'));










// ─── GET ALL DEPARTMENTS ──────────────────────────────────────────
app.get('/api/departments', async (req, res) => {
  try {
    const result = await query(`SELECT DEPT_ID, DEPT_NAME FROM DEPARTMENTS ORDER BY DEPT_ID`);
    res.json(result.rows || []);
  } catch (err) {
    console.error('Departments Error:', err.message);
    res.status(500).json({ message: 'Could not fetch departments.' });
  }
});


// ─── GET OFFICERS (optionally filter by dept) ─────────────────────
app.get('/api/officers', async (req, res) => {
  const deptId = req.query.dept_id;
  try {
    const sql = deptId
      ? `SELECT OFFICER_ID, OFFICER_NAME FROM OFFICERS WHERE DEPT_ID = :dept_id ORDER BY OFFICER_ID`
      : `SELECT OFFICER_ID, OFFICER_NAME FROM OFFICERS ORDER BY OFFICER_ID`;
    const binds = deptId ? { dept_id: Number(deptId) } : {};
    const result = await query(sql, binds);
    res.json(result.rows || []);
  } catch (err) {
    console.error('Officers Error:', err.message);
    res.status(500).json({ message: 'Could not fetch officers.' });
  }
});


// ─── SUBMIT COMPLAINT ─────────────────────────────────────────────
app.post('/api/complaints', async (req, res) => {
  const { user_id, dept_id, title, description } = req.body || {};

  if (!user_id || !dept_id || !title)
    return res.status(400).json({ message: 'user_id, dept_id and title are required.' });

  try {
    const result = await query(
      `INSERT INTO COMPLAINTS (USER_ID, DEPT_ID, TITLE, DESCRIPTION, STATUS, DATE_FILED)
       VALUES (:user_id, :dept_id, :title, :description, 'Pending', SYSDATE)
       RETURNING COMPLAINT_ID INTO :id`,
      {
        user_id:     Number(user_id),
        dept_id:     Number(dept_id),
        title:       title.substring(0, 200),
        description: description
          ? { val: description, type: oracledb.CLOB }
          : null,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      },
      { autoCommit: true }
    );
    res.status(201).json({
      complaint_id: result.outBinds.id?.[0],
      message: 'Complaint submitted successfully.',
    });
  } catch (err) {
    console.error('Submit Complaint Error:', err.message);
    res.status(500).json({ message: 'Could not submit complaint.', details: err.message });
  }
});


// ─── GET COMPLAINTS FOR A USER ────────────────────────────────────
app.get('/api/complaints/user/:user_id', async (req, res) => {
  const userId = Number(req.params.user_id);
  if (!userId) return res.status(400).json({ message: 'Invalid user ID.' });

  try {
    const result = await query(
      `SELECT
         C.COMPLAINT_ID,
         TO_CHAR(C.COMPLAINT_ID, 'FM00000') AS DISPLAY_ID,
         D.DEPT_NAME        AS DEPARTMENT,
         TO_CHAR(C.DATE_FILED, 'DD-Mon-YYYY') AS DATE_FILED,
         C.STATUS,
         NVL(O.OFFICER_NAME, 'Not Assigned') AS OFFICER,
         C.TITLE
       FROM COMPLAINTS C
       JOIN DEPARTMENTS D  ON C.DEPT_ID    = D.DEPT_ID
       LEFT JOIN OFFICERS O ON C.OFFICER_ID = O.OFFICER_ID
       WHERE C.USER_ID = :user_id
       ORDER BY C.DATE_FILED DESC`,
      { user_id: userId }
    );
    res.json(result.rows || []);
  } catch (err) {
    console.error('Get Complaints Error:', err.message);
    res.status(500).json({ message: 'Could not fetch complaints.' });
  }
});


// ─── GET SINGLE COMPLAINT (for View Details) ──────────────────────
app.get('/api/complaints/:id', async (req, res) => {
  const complaintId = Number(req.params.id);
  if (!complaintId) return res.status(400).json({ message: 'Invalid complaint ID.' });

  try {
    const result = await query(
      `SELECT
         C.COMPLAINT_ID,
         C.TITLE,
         C.STATUS,
         D.DEPT_NAME                           AS DEPARTMENT,
         NVL(O.OFFICER_NAME, 'Not Assigned')   AS OFFICER,
         TO_CHAR(C.DATE_FILED,    'DD-Mon-YYYY') AS DATE_FILED,
         TO_CHAR(C.DATE_RESOLVED, 'DD-Mon-YYYY') AS DATE_RESOLVED,
         C.DESCRIPTION
       FROM COMPLAINTS C
       JOIN DEPARTMENTS D  ON C.DEPT_ID    = D.DEPT_ID
       LEFT JOIN OFFICERS O ON C.OFFICER_ID = O.OFFICER_ID
       WHERE C.COMPLAINT_ID = :complaint_id`,
      { complaint_id: complaintId }
    );

    if (!result.rows.length)
      return res.status(404).json({ message: 'Complaint not found.' });

    const row = result.rows[0];

    // CLOB → string for description
    let description = '';
    if (row.DESCRIPTION) {
      description = typeof row.DESCRIPTION === 'string'
        ? row.DESCRIPTION
        : (await row.DESCRIPTION.getData?.() || '');
    }

    res.json({ ...row, DESCRIPTION: description });
  } catch (err) {
    console.error('Get Complaint Error:', err.message);
    res.status(500).json({ message: 'Could not fetch complaint.' });
  }
});


// ─── UPLOAD DOCUMENT TO COMPLAINT ────────────────────────────────
app.post('/api/complaints/:id/documents', async (req, res) => {
  const complaintId = Number(req.params.id);
  const { file_name, file_data } = req.body || {};

  if (!complaintId || !file_data)
    return res.status(400).json({ message: 'complaint_id and file_data required.' });

  try {
    await query(
      `INSERT INTO COMPLAINT_DOCUMENTS (COMPLAINT_ID, FILE_NAME, FILE_DATA)
       VALUES (:complaint_id, :file_name, :file_data)`,
      {
        complaint_id: complaintId,
        file_name:    file_name || 'document',
        file_data:    { val: file_data, type: oracledb.CLOB },
      },
      { autoCommit: true }
    );
    res.status(201).json({ message: 'Document uploaded.' });
  } catch (err) {
    console.error('Upload Doc Error:', err.message);
    res.status(500).json({ message: 'Could not upload document.', details: err.message });
  }
});


// ─── ADMIN: UPDATE COMPLAINT STATUS / ASSIGN OFFICER ─────────────
app.put('/api/complaints/:id', async (req, res) => {
  const complaintId = Number(req.params.id);
  const { status, officer_id } = req.body || {};

  if (!complaintId) return res.status(400).json({ message: 'Invalid complaint ID.' });

  try {
    await query(
      `UPDATE COMPLAINTS SET
         STATUS      = NVL(:status, STATUS),
         OFFICER_ID  = NVL(:officer_id, OFFICER_ID),
         DATE_RESOLVED = CASE WHEN :status2 = 'Resolved' THEN SYSDATE ELSE DATE_RESOLVED END
       WHERE COMPLAINT_ID = :complaint_id`,
      {
        status:       status      || null,
        officer_id:   officer_id  ? Number(officer_id) : null,
        status2:      status      || null,
        complaint_id: complaintId,
      },
      { autoCommit: true }
    );
    res.json({ message: 'Complaint updated.' });
  } catch (err) {
    console.error('Update Complaint Error:', err.message);
    res.status(500).json({ message: 'Could not update complaint.', details: err.message });
  }
});





// ─── DASHBOARD DATA FOR A USER ────────────────────────────────────
app.get('/api/dashboard/:user_id', async (req, res) => {
  const userId = Number(req.params.user_id);
  if (!userId) return res.status(400).json({ message: 'Invalid user ID.' });

  try {
    const statsResult = await query(
      `SELECT
         COUNT(*) AS TOTAL_COMPLAINTS,
         SUM(CASE WHEN STATUS = 'Pending' THEN 1 ELSE 0 END) AS PENDING_COMPLAINTS,
         SUM(CASE WHEN STATUS = 'In Progress' THEN 1 ELSE 0 END) AS IN_PROGRESS_COMPLAINTS,
         SUM(CASE WHEN STATUS = 'Resolved' THEN 1 ELSE 0 END) AS RESOLVED_COMPLAINTS
       FROM COMPLAINTS
       WHERE USER_ID = :user_id`,
      { user_id: userId }
    );

    const recentResult = await query(
      `SELECT
         C.COMPLAINT_ID,
         C.TITLE,
         D.DEPT_NAME AS DEPARTMENT,
         C.STATUS,
         TO_CHAR(C.DATE_FILED, 'DD-Mon-YYYY') AS DATE_FILED
       FROM COMPLAINTS C
       JOIN DEPARTMENTS D ON C.DEPT_ID = D.DEPT_ID
       WHERE C.USER_ID = :user_id
       ORDER BY C.DATE_FILED DESC
       FETCH FIRST 5 ROWS ONLY`,
      { user_id: userId }
    );

    const statsRow = statsResult.rows?.[0] || {};
    res.json({
      stats: {
        total: Number(statsRow.TOTAL_COMPLAINTS || 0),
        pending: Number(statsRow.PENDING_COMPLAINTS || 0),
        inProgress: Number(statsRow.IN_PROGRESS_COMPLAINTS || 0),
        resolved: Number(statsRow.RESOLVED_COMPLAINTS || 0),
      },
      recentComplaints: (recentResult.rows || []).map((row) => ({
        id: row.COMPLAINT_ID,
        title: row.TITLE || '',
        dept: row.DEPARTMENT || '',
        status: row.STATUS || 'Pending',
        date: row.DATE_FILED || '',
      })),
    });
  } catch (err) {
    console.error('Dashboard Error:', err.message);
    res.status(500).json({ message: 'Could not fetch dashboard data.', details: err.message });
  }
});
