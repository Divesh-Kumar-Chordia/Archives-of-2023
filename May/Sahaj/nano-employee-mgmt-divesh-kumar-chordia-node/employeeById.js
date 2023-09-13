const fs = require('fs');

const dataFilePath = '/home/data/employees.json';

const fetchEmployeeById = (req, res) => {
  const { id } = req.params;

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

    const employee = employees.find((emp) => emp.employeeId === id);

    if (!employee) {
      res.status(404).json({ message: `Employee with ID ${id} was not found` });
    } else {
      res.status(200).json(employee);
    }
  });
};

module.exports = {
  fetchEmployeeById,
};
