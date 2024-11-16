const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('Succesfully connected to DB');
  } catch (error) {
    logger.error('Error connecting to DB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;