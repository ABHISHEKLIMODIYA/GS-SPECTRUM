// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const path = require('path');
// Initialize Express app
const app = express();
const PORT = 3000;
// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static file serving
app.use(express.static("CSS"));
app.use(express.static("JS"));
app.use(express.static("images"));
// MongoDB Connection
mongoose
mongoose
.connect('mongodb://0.0.0.0/COLLAGE_CLUB_PLATFORM_APP')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));
// Define Mongoose Schemas and Models
// Student Schema and Model
const studentSchema = new mongoose.Schema({
username: { type: String, required: true },
password: { type: String, required: true },
});
const Student = mongoose.model('Student', studentSchema);
// ClubAdmin Schema and Model
const ClubAdminSchema = new mongoose.Schema({
username: { type: String, required: true },
password: { type: String, required: true },
});
const ClubAdmin = mongoose.model('ClubAdmin', ClubAdminSchema);
// Other User Schema and Model
const otherSchema = new mongoose.Schema({
username: { type: String, required: true },
password: { type: String, required: true },
});
// Routes
// Serve Signup Page
app.get('/signup', (req, res) => {
res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});
// Handle Signup Requests
app.post('/signup', async (req, res) => {
try {
const { userType, username, password } = req.body;
// Validate input
if (!username || !password || !userType) {
return res.status(400).json({ error: 'All fields are required.' });
}
let UserModel;
// Determine user type
if (userType === "Student") UserModel = Student;
else if (userType === "ClubAdmin") UserModel = ClubAdmin;
else return res.status(400).json({ error: 'Invalid user type.' });
// Check if user already exists
const existingUser = await UserModel.findOne({ username });
if (existingUser) {
return res.status(400).json({ error: 'Username already exists.' });
}
// Hash the password
const hashedPassword = await bcryptjs.hash(password, 10);
// Save user to the database
const newUser = new UserModel({ username, password: hashedPassword });
await newUser.save();
res.status(201).json({ message: 'User signed up successfully.' });
} catch (err) {
console.error('Error during signup:', err);
res.status(500).json({ error: 'Internal server error.' });
}
});
// Serve Login Page
app.get('/login', (req, res) => {
res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
// Handle Login Requests
app.post('/login', async (req, res) => {
try {
const { userType, username, password } = req.body;
// Validate input
if (!username || !password || !userType) {
return res.status(400).json({ error: 'All fields are required.' });
}
let UserModel;
// Determine user type
if (userType === "Student") UserModel = Student;
else if (userType === "ClubAdmin") UserModel = ClubAdmin;
else return res.status(400).json({ error: 'Invalid user type.' });
// Find user in the database
const user = await UserModel.findOne({ username });
if (!user) {
return res.status(400).json({ error: 'Invalid username or password.' });
}
// Compare passwords
const isMatch = await bcryptjs.compare(password, user.password);
if (!isMatch) {
return res.status(400).json({ error: 'Invalid username or password.' });
}
res.status(200).json({ message: 'Login successful.' });
} catch (err) {
console.error('Error during login:', err);
res.status(500).json({ error: 'Internal server error.' });
}
});
// Additional Routes for Static Pages
app.get('/club-admin-dashboard', (req, res) => {
res.sendFile(path.join(__dirname, 'views', 'club-admin-dashboard.html'));
});
app.get('/student-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'student-dashboard.html'));
    });
    
// Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});   