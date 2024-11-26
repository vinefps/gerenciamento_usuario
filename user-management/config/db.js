// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/seuBancoDeDados', {
      // suas opções aqui
    });

    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
