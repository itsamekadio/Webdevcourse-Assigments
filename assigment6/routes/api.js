const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('../utils/ratelimit');
const { auth, role } = require('../middleware/auth');

const router = express.Router();
const usersFile = './users.json';

function readUsers() {
  return JSON.parse(fs.readFileSync(usersFile));
}
function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

router.post('/register', rateLimit('register'), (req, res) => {
  const { username, email, password, role } = req.body;
  if (!email.match(/^\S+@\S+\.\S+$/))
    return res.status(400).json({ message: 'Invalid email' });
  if (!password.match(/^(?=.*[0-9])(?=.*[\W_]).{8,}$/))
    return res.status(400).json({ message: 'Weak password' });

  const users = readUsers();
  if (users.find(u => u.email === email))
    return res.status(409).json({ message: 'User exists' });

  const hashed = bcrypt.hashSync(password, 10);
  const newUser = { id: Date.now(), username, email, password: hashed, role: role || 'user' };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json({ message: 'User registered' });
});

router.post('/login', rateLimit('login'), (req, res) => {
  const { email, password } = req.body;
  const user = readUsers().find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

router.get('/public', (req, res) => res.json({ message: 'Public Content' }));
router.get('/protected', auth, (req, res) => res.json({ message: 'Protected Content' }));
router.get('/moderator', auth, role('moderator', 'admin'), (req, res) => res.json({ message: 'Moderator Content' }));
router.get('/admin', auth, role('admin'), (req, res) => res.json({ message: 'Admin Content' }));

router.get('/profile', auth, (req, res) => {
  const user = readUsers().find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ id: user.id, username: user.username, email: user.email, role: user.role });
});

router.put('/profile', auth, (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (req.body.email && req.body.email.match(/^\S+@\S+\.\S+$/)) user.email = req.body.email;
  if (req.body.password && req.body.password.match(/^(?=.*[0-9])(?=.*[\W_]).{8,}$/))
    user.password = bcrypt.hashSync(req.body.password, 10);

  writeUsers(users);
  res.json({ message: 'Profile updated' });
});

router.put('/users/:id/role', auth, role('admin'), (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.role = req.body.role;
  writeUsers(users);
  res.json({ message: 'User role updated' });
});

module.exports = router;
