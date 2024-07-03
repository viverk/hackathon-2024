/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/token.controller');

// Routes pour les tokens
router.get('/', tokenController.getTokens);
router.post('/', tokenController.createToken);
router.put('/:id', tokenController.editToken);
router.delete('/:id', tokenController.deleteToken);
router.get('/:token', tokenController.getUserByToken);

module.exports = router;
