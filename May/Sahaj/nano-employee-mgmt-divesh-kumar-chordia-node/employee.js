const fs = require('fs');

const dataFilePath = '/home/data/employees.json';

const createEmployee = (req, res) => {
  const { name, city } = req.body;
  const employeeId = Date.now().toString();

  const newEmployee = {
    employeeId,
    name,
    city,
  };

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read employees file:', err);
      res.sendStatus(500);
      return;
    }

    let employees = [];

    try {
      employees = JSON.parse(data);
    } catch (parseError) {
      console.error('Failed to parse employees data:', parseError);
      res.sendStatus(500);
      return;
    }

    employees.push(newEmployee);

    fs.writeFile(dataFilePath, JSON.stringify(employees), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Failed to write employees file:', writeErr);
        res.sendStatus(500);
        return;
      }

      res.status(201).json({ employeeId });
    });
  });
};

module.exports = {
  createEmployee,
};
