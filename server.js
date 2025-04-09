// LIBRARIES NEEDED
const express = require('express'); // web framework for node.js
const app = express(); // actual express application
const mysql = require('mysql2');
const mongoose = require('mongoose'); // library to help interact with mongodb easily

// SQL CONNECTION
// TODO: connect to mysql with the host, database, user, and password. 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pleasanton0305!',
    database: 'company_db_2'
})

// MySQL Connection Verification
function verifyMySQLConnection() {
    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting to MySQL: ' + err.stack);
            return;
        }
        console.log('MySQL connected as id ' + connection.threadId);
    });
}

// MONGOOSE CONNECTION
// TODO: connect to your local host on the companyDB collection
mongoose.connect(
    "mongodb+srv://isabeldong:12345@cluster0.wcycysh.mongodb.net"
);

// TODO: Mongoose Schema and Model
const ProjectSchema = new mongoose.Schema({
    name: String,
    budget: Number,
}
);

const ProjectModel = mongoose.model("projects", ProjectSchema)

// MongoDB Connection Verification 
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// ENDPOINTS
// Endpoint to get all projects from MongoDB when you enter: http://localhost:3000/projects
app.get('/projects', async (req, res) => {
    try {
        const projects = await ProjectModel.find({});
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Endpoint to get all employees from MySQL when you enter: http://localhost:3000/employees
app.get('/employees', function (req, res) {
    connection.query('SELECT * FROM employees_2', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

// RUNNING THE SERVER
app.listen(3000, function () {
    console.log('Server is running on port 3000!');
    verifyMySQLConnection();
});