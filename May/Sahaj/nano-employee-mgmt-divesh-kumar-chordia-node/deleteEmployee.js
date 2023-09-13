const fs = require('fs');

const dataFilePath = '/home/data/employees.json';

const deleteEmployee = (req, res) => {
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

    const employeeIndex = employees.findIndex((emp) => emp.employeeId === id);

    if (employeeIndex === -1) {
      res.status(404).json({ message: `Employee with ID ${id} was not found` });
      return;
    }

    const deletedEmployee = employees.splice(employeeIndex, 1)[0];

    fs.writeFile(dataFilePath, JSON.stringify(employees), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Failed to write employees file:', writeErr);
        res.sendStatus(500);
        return;
      }

      res.status(200).json(deletedEmployee);
    });
  });
};

module.exports = {
  deleteEmployee,
};
