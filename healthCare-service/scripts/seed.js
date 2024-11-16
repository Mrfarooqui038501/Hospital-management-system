const mongoose = require('mongoose');
const Service = require('../models/Service');
require('dotenv').config();

const seedData = [
  {
    name: 'General OPD Consultation',
    description: 'Out-patient Department general consultation',
    price: 500,
    category: 'OPD',
    waitingTime: 30
  },
  {
    name: 'Dental Cleaning',
    description: 'Professional dental cleaning and check-up',
    price: 1000,
    category: 'DENTAL',
    waitingTime: 45
  },
  {
    name: 'Cardiology Consultation',
    description: 'Heart specialist consultation with ECG',
    price: 2000,
    category: 'CARDIOLOGY',
    waitingTime: 60
  },
  {
    name: 'Dermatology Check-up',
    description: 'Skin examination and consultation',
    price: 1500,
    category: 'DERMATOLOGY',
    waitingTime: 40
  },
  {
    name: 'Pediatric Consultation',
    description: 'Child healthcare check-up and consultation',
    price: 1200,
    category: 'PEDIATRICS',
    waitingTime: 35
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Service.deleteMany({});
    await Service.insertMany(seedData);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();