/* eslint-disable prettier/prettier */
const TokenModel = require('../models/token.model');
const dotenv = require('dotenv');

dotenv.config();

module.exports.getTokens = async (req, res) => {
  try {
    const tokens = await TokenModel.find();
    res.status(200).json(tokens);
  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des tokens',
      error: err.message,
    });
  }
};

module.exports.createToken = async (req, res) => {
  const secretToken = process.env.TOKEN;
  try {
    const token = await TokenModel.create({
      user_id: req.body.user_id,
      token: secretToken,
    });
    res.status(200).json(token);
  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de la création du token',
      error: err.message,
    });
  }
};

module.exports.editToken = async (req, res) => {
  const token = await TokenModel.findById(req.params.id);

  if (!token) {
    return res.status(400).json({message: "Ce token n'existe pas"});
  }

  try {
    const updatedToken = await TokenModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    res.status(200).json(updatedToken);
  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de la mise à jour du token',
      error: err.message,
    });
  }
};

module.exports.deleteToken = async (req, res) => {
  const token = await TokenModel.findById(req.params.id);

  if (!token) {
    return res.status(400).json({message: "Ce token n'existe pas"});
  }

  try {
    await token.deleteOne({_id: req.params.id});
    res.status(200).json({message: 'Token supprimée avec succès'});
  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de la suppression du token',
      error: err.message,
    });
  }
};

module.exports.getUserByToken = async (req, res) => {
  try {
    const {token} = req.params;
    const tokenDoc = await TokenModel.findOne({token});

    if (!tokenDoc) {
      return res.status(404).json({message: 'Token non trouvé'});
    }

    // Récupérer le user_id associé
    const userId = tokenDoc.user_id;

    if (!userId) {
      return res
        .status(404)
        .json({message: 'Utilisateur non associé à ce token'});
    }

    // Envoyer le user_id en réponse
    res.status(200).json({user_id: userId});
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de l'utilisateur",
      error: error.message,
    });
  }
};
