const fs = require('fs');

const dataFilePath = '/home/data/employees.json';

const fetchAllEmployees = (req, res) => {
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

    res.status(200).json(employees);
  });
};

module.exports = {
  fetchAllEmployees,
};
