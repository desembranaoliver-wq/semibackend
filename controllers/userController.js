const connection = require('../config/db');

// Get all students
exports.getAllUsers = (req, res) => {
    connection.query('SELECT * FROM studentdata', (err, rows, fields) => {
        if (err) throw err;
        res.json(rows);
    });
};

// Search a student by ID
exports.getUsersById = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM studentdata WHERE student_id=?', [id], (err, rows, fields) => {
        if (err) throw err;
        if (rows.length > 0)
            res.json(rows);
        else
            res.status(404).json({ message: 'Student not found' });
    });
};

// Create a new student
exports.createUser = (req, res) => {
    const { student_id, name, department, year_level, email, status } = req.body;
    connection.query(
        'INSERT INTO studentdata (student_id, name, department, year_level, email, status) VALUES (?,?,?,?,?,?)',
        [student_id, name, department, year_level, email, status],
        (err, result) => {
            if (err) throw err;
            res.json({ message: 'Student Created Successfully', studentId: student_id });
        }
    );
};

// Update a student
exports.updateUser = (req, res) => {
    const { student_id, name, department, year_level, email, status } = req.body;
    connection.query(
        'UPDATE studentdata SET name=?, department=?, year_level=?, email=?, status=? WHERE student_id=?',
        [name, department, year_level, email, status, student_id],
        (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                res.json({ message: 'Student Updated Successfully' });
            } else {
                res.status(404).json({ message: 'Student Not Found' });
            }
        }
    );
};

// Delete a student
exports.deleteUser = (req, res) => {
    const student_id = req.body.student_id;
    connection.query('DELETE FROM studentdata WHERE student_id=?', [student_id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.json({ message: 'Student Deleted Successfully' });
        } else {
            res.status(404).json({ message: 'Student Not Found' });
        }
    });
};