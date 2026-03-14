require('dotenv').config();
const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT,
  // use Thin driver to avoid Instant Client issues
  // optional: enable autoCommit for inserts/updates
  // autoCommit: true
};
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS || 10);
const IS_PROD = process.env.NODE_ENV === 'production';

function buildErrorResponse(message, err) {
  if (IS_PROD) {
    return { message };
  }
  return { message, details: err?.message || String(err) };
}

async function testConnection() {
  try {
    const conn = await oracledb.getConnection(dbConfig);
    console.log('Connected to Oracle DB successfully!');
    await conn.close();
  } catch (err) {
    console.error('Oracle Connection Failed:', err);
  }
}

testConnection();

app.get('/api/data', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT USER_ID, FULL_NAME, EMAIL, CNIC, PHONE, ADDRESS, ROLE, CREATED_AT, USER_PROFILEPIC
       FROM USERS
       ORDER BY USER_ID`,
      {},
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);
  } catch (err) {
    console.error('DB Connection Error:', err);
    res.status(500).send('Database connection error');
  } finally {
    if (connection) await connection.close();
  }
});

app.post('/api/register', async (req, res) => {
  const {
    Full_Name,
    Email,
    Password,
    CNIC,
    Phone,
    Address,
    Role,
    User_ProfilePic
  } = req.body || {};

  if (!Full_Name || !Email || !Password) {
    return res.status(400).json({ message: 'Full_Name, Email, and Password are required.' });
  }

  let connection;
  try {
    const hashed = await bcrypt.hash(Password, SALT_ROUNDS);
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `INSERT INTO USERS
       (FULL_NAME, EMAIL, PASSWORD, CNIC, PHONE, ADDRESS, ROLE, USER_PROFILEPIC)
       VALUES (:Full_Name, :Email, :Password, :CNIC, :Phone, :Address, :Role, :User_ProfilePic)
       RETURNING USER_ID INTO :User_ID`,
      {
        Full_Name,
        Email,
        Password: hashed,
        CNIC: CNIC || null,
        Phone: Phone || null,
        Address: Address || null,
        Role: Role || 'User',
        User_ProfilePic: User_ProfilePic || null,
        User_ID: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      },
      { autoCommit: true }
    );

    const newId = result.outBinds.User_ID?.[0];
    return res.status(201).json({ user_id: newId, message: 'User registered.' });
  } catch (err) {
    if (err && err.errorNum === 1) {
      return res.status(409).json(buildErrorResponse('Email or CNIC already exists.', err));
    }
    console.error('Register Error:', err);
    return res.status(500).json(buildErrorResponse('Registration failed.', err));
  } finally {
    if (connection) await connection.close();
  }
});

app.post('/api/login', async (req, res) => {
  const { Email, Password } = req.body || {};
  if (!Email || !Password) {
    return res.status(400).json({ message: 'Email and Password are required.' });
  }

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT USER_ID, FULL_NAME, EMAIL, PASSWORD, ROLE
       FROM USERS
       WHERE EMAIL = :Email`,
      { Email },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (!result.rows || result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(Password, user.PASSWORD);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    return res.json({
      user_id: user.USER_ID,
      full_name: user.FULL_NAME,
      email: user.EMAIL,
      role: user.ROLE
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json(buildErrorResponse('Login failed.', err));
  } finally {
    if (connection) await connection.close();
  }
});

app.get('/api/users', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT USER_ID, FULL_NAME, EMAIL, CNIC, PHONE, ADDRESS, ROLE, CREATED_AT, USER_PROFILEPIC
       FROM USERS
       ORDER BY USER_ID`,
      {},
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows || []);
  } catch (err) {
    console.error('Users Fetch Error:', err);
    res.status(500).send('Database query error');
  } finally {
    if (connection) await connection.close();
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend running on port ${process.env.PORT || 5000}`);
});
