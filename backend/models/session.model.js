/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const shortid = require('shortid');

const sessionSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      default: () => shortid.generate().slice(0, 4), // Génère un code aléatoire de 4 caractères
    },
    is_used: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('session', sessionSchema);
