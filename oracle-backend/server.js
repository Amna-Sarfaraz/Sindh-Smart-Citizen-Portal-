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