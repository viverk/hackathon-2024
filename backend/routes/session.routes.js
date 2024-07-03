/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session.controller');

// Routes pour les sessions
router.get('/', sessionController.getSessions);
router.post('/', sessionController.createSession);
router.put('/:id', sessionController.editSession);
router.delete('/:id', sessionController.deleteSession);
router.put('/:id/mark-used', sessionController.markSessionAsUsed);

module.exports = router;
