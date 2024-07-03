/* eslint-disable prettier/prettier */
const SessionModel = require('../models/session.model');

module.exports.getSessions = async (req, res) => {
  try {
    const sessions = await SessionModel.find();
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des sessions',
      error: err.message,
    });
  }
};

module.exports.createSession = async (req, res) => {
  if (!req.body.user_id) {
    return res.status(400).json({message: "Merci d'ajouter l'utilisateur"});
  } else if (!req.body.is_used) {
    return res
      .status(400)
      .json({message: 'Merci de préciser si cette session est utilisée'});
  }

  try {
    const session = await SessionModel.create({
      user_id: req.body.user_id,
      is_used: req.body.is_used,
    });
    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de la création de la session',
      error: err.message,
    });
  }
};

module.exports.editSession = async (req, res) => {
  const session = await SessionModel.findById(req.params.id);

  if (!session) {
    return res.status(400).json({message: "Cette session n'existe pas"});
  }

  try {
    const updatedSession = await SessionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    res.status(200).json(updatedSession);
  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de la mise à jour de la session',
      error: err.message,
    });
  }
};

module.exports.deleteSession = async (req, res) => {
  const session = await SessionModel.findById(req.params.id);

  if (!session) {
    return res.status(400).json({message: "Cette session n'existe pas"});
  }

  try {
    await session.deleteOne({_id: req.params.id});
    res.status(200).json({message: 'Session supprimée avec succès'});
  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de la suppression de la session',
      error: err.message,
    });
  }
};

module.exports.markSessionAsUsed = async (req, res) => {
  try {
    const session = await SessionModel.findByIdAndUpdate(
      req.params.id,
      {is_used: true},
      {new: true},
    );
    if (!session) {
      return res.status(400).json({message: "Cette session n'existe pas"});
    }
    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de la mise à jour de la session',
      error: err.message,
    });
  }
};