const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const db = new sqlite3.Database('./attendance.db', (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database table
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      status TEXT DEFAULT 'unknown',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Table creation error:', err);
    } else {
      console.log('Students table initialized');
    }
  });
}

// GET all students
app.get('/api/students', (req, res) => {
  db.all('SELECT * FROM students ORDER BY created_at ASC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// POST add new student
app.post('/api/students', (req, res) => {
  const { name } = req.body;
  
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: '学生姓名不能为空' });
  }

  db.run(
    'INSERT INTO students (name, status) VALUES (?, ?)',
    [name.trim(), 'unknown'],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          res.status(400).json({ error: '该学生已存在' });
        } else {
          res.status(500).json({ error: err.message });
        }
      } else {
        res.json({
          id: this.lastID,
          name: name.trim(),
          status: 'unknown'
        });
      }
    }
  );
});

// PUT update student status
app.put('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['present', 'absent', 'unknown'].includes(status)) {
    return res.status(400).json({ error: '无效的状态' });
  }

  db.run(
    'UPDATE students SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [status, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id, status, message: '状态已更新' });
      }
    }
  );
});

// DELETE student
app.delete('/api/students/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM students WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: '学生已删除' });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎓 学生出席管理系统运行在 http://localhost:${PORT}`);
  console.log('按 Ctrl+C 停止服务器');
});
