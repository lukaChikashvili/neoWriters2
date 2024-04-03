const express = require('express');
const router = express.Router();
const actions = require('../controllers/actions');
const {authenticateUser} = require('../middleware/auth');


// all routes

router.post('/register', actions.registerUsers);
router.post('/login', actions.loginUsers);
router.post('/create', authenticateUser, actions.createBook );
router.get('/books', actions.getAllBooks);
router.get('/books/:id',actions.getOneBook);
router.delete('/books/del/:id', actions.removeBook);
router.put('/books/:id/update',  authenticateUser, actions.updateBook);
router.post('/books/:id/comment', authenticateUser, actions.createComment);
router.get('/books/:id/comment/all', authenticateUser, actions.getAllComment);
router.get('/users', actions.getUserInfo);
module.exports = router;