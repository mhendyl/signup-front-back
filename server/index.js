const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const cors = require('cors');

const app = express();
const port = 3030;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection setup using Mongoose
mongoose.connect('mongodb+srv://hendy:<J4ndaMUD4>@cluster0.awzs7ay.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define a Mongoose schema and model
const registrationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
});

const Registration = mongoose.model('Registration', registrationSchema);

// Define validation rules
const registerValidationRules = [
  check('firstName').notEmpty().withMessage('First Name is required'),
  check('lastName').notEmpty().withMessage('Last Name is required'),
  check('address').notEmpty().withMessage('Address is required'),
  check('email').isEmail().withMessage('Invalid email'),
  check('dateOfBirth').isISO8601().toDate().withMessage('Invalid date of birth'),
  check('phoneNumber').isNumeric().withMessage('Invalid phone number'),
];

// POST endpoint for registration
app.post('/register', registerValidationRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, dateOfBirth, phoneNumber, address } = req.body;

  // Create a new registration document
  const newRegistration = new Registration({
    firstName,
    lastName,
    email,
    dateOfBirth: new Date(dateOfBirth),
    phoneNumber,
    address,
  });

  // Save the registration data to the database
  newRegistration.save((err) => {
    if (err) {
      console.error('Error saving registration:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json({ message: 'Registration successful' });
  });
});

// Start the server
app.listen(port, () => {
  console.info(`Server is running on port ${port}`);
});
