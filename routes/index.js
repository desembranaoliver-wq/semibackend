const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
 
// Route to get all students
router.get('/students', userController.getAllUsers);
 
// Route to search student by ID
router.get('/students/:id', userController.getUsersById);
 
// Route to create a student
router.post("/students", userController.createUser);
 
// Route to update a student
router.put("/students", userController.updateUser);
 
// Route to delete a student
router.delete("/students", userController.deleteUser);
 
module.exports = router;