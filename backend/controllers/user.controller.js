/* eslint-disable prettier/prettier */
const {
  getNfcData,
  createNfcData,
  updateNfcData,
  deleteNfcData,
} = require('../services/nfc.services');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await getNfcData(); // Appel à l'API NFC
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({message: 'Erreur lors de la récupération des utilisateurs'});
  }
};

module.exports.setUsers = async (req, res) => {
  if (!req.body.sub) {
    return res.status(400).json({message: "Merci d'ajouter le champ sub."});
  } else if (!req.body.name) {
    return res.status(400).json({message: "Merci d'ajouter le champ name."});
  } else if (!req.body.email) {
    return res.status(400).json({message: "Merci d'ajouter le champ email."});
  } else if (!req.body.iat) {
    return res.status(400).json({message: "Merci d'ajouter le champ iat."});
  } else if (!req.body.role) {
    return res.status(400).json({message: "Merci d'ajouter le champ role."});
  } else if (!req.body.exp) {
    return res.status(400).json({message: "Merci d'ajouter le champ exp."});
  }

  try {
    const user = await createNfcData(req.body); // Appel à l'API NFC
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({message: "Erreur lors de la création de l'utilisateur"});
  }
};

module.exports.editUser = async (req, res) => {
  try {
    const user = await updateNfcData(req.params.id, req.body); // Appel à l'API NFC
    if (!user) {
      return res.status(400).json({message: "Cet utilisateur n'existe pas"});
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({message: "Erreur lors de la mise à jour de l'utilisateur"});
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const user = await deleteNfcData(req.params.id); // Appel à l'API NFC
    if (!user) {
      return res.status(400).json({message: "Cet utilisateur n'existe pas"});
    }
    res.status(200).json({message: 'Message supprimé : ' + req.params.id});
  } catch (error) {
    res
      .status(500)
      .json({message: "Erreur lors de la suppression de l'utilisateur"});
  }
};
