const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const employeesFile = 'employees.json';

let employees = [];

// Read employee data from the file
fs.readFile(employeesFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Failed to read employees file:', err);
  } else {
    try {
      employees = JSON.parse(data);
    } catch (parseError) {
      console.error('Failed to parse employees file:', parseError);
    }
  }
});

// Save employee data to the file
function saveEmployees() {
  fs.writeFile(employeesFile, JSON.stringify(employees), 'utf8', (err) => {
    if (err) {
      console.error('Failed to write employees file:', err);
    }
  });
}

app.post('/employees', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    const employee = req.body;
  employees.push(employee);
  saveEmployees();
  res.sendStatus(200);
});

app.get('/employees', (req, res) => {
  res.json(employees);
});

app.get('/employees/:id', (req, res) => {
  const employeeId = req.params.id;
  const employee = employees.find(emp => emp.id === employeeId);

  if (employee) {
    res.json(employee);
  } else {
    res.sendStatus(404);
  }
});

app.put('/employees/:id', (req, res) => {
  const employeeId = req.params.id;
  const { name } = req.body;

  const employee = employees.find(emp => emp.id === employeeId);

  if (employee) {
    employee.name = name;
    saveEmployees();
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/employees/:id', (req, res) => {
  const employeeId = req.params.id;

  const employeeIndex = employees.findIndex(emp => emp.id === employeeId);

  if (employeeIndex !== -1) {
    employees.splice(employeeIndex, 1);
    saveEmployees();
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
