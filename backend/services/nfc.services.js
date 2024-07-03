/* eslint-disable prettier/prettier */
const axios = require('axios');

const nfcApi = axios.create({
  baseURL: 'https://nfc-api.onrender.com',
});

const getNfcData = async () => {
  try {
    const response = await nfcApi.get('/users');
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API NFC:", error);
    throw error;
  }
};

const createNfcData = async data => {
  try {
    const response = await nfcApi.post('/users', data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de données NFC:', error);
    throw error;
  }
};

const updateNfcData = async (id, data) => {
  try {
    const response = await nfcApi.put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données NFC:', error);
    throw error;
  }
};

const deleteNfcData = async id => {
  try {
    const response = await nfcApi.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression des données NFC:', error);
    throw error;
  }
};

module.exports = {
  getNfcData,
  createNfcData,
  updateNfcData,
  deleteNfcData,
};
