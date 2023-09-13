function populateEmployeeList(employees) {
    const list = document.getElementById('employeeList');
    list.innerHTML = '';
  
    employees.forEach(function(employee) {
      const li = document.createElement('li');
      li.textContent = employee.name;
      list.appendChild(li);
    });
  }
  
  function createEmployee() {
    const name = prompt('Enter employee name:');
    const id = Date.now().toString();
  
    const employee = {
      id,
      name
    };
  
    fetch('http://localhost:3000/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    })
      .then(response => {
        if (response.ok) {
          alert('Employee created successfully!');
          fetchAllEmployees();
        } else {
          alert('Failed to create employee.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while creating the employee.');
      });
  }
  
  
  function fetchAllEmployees() {
    fetch('/employees')
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch employees');
      }
    })
    .then(function(employees) {
      populateEmployeeList(employees);
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
  }
  
  function fetchEmployee() {
    const employeeId = prompt('Enter employee ID:');
  
    fetch(`/employees/${employeeId}`)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch employee');
      }
    })
    .then(function(employee) {
      const list = document.getElementById('employeeList');
      list.innerHTML = '';
  
      const li = document.createElement('li');
      li.textContent = employee.name;
      list.appendChild(li);
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
  }
  
  function fetchDeletedEmployee() {
    fetch('/employees/deleted')
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch deleted employees');
      }
    })
    .then(function(deletedEmployees) {
      populateEmployeeList(deletedEmployees);
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
  }
  
  function updateEmployee() {
    const employeeId = prompt('Enter employee ID:');
    const newName = prompt('Enter new name:');
  
    fetch(`/employees/${employeeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newName })
    })
    .then(function(response) {
      if (response.ok) {
        alert('Employee updated successfully');
      } else {
        alert('Failed to update employee');
      }
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
  }
  
  function deleteEmployee() {
    const employeeId = prompt('Enter employee ID:');
  
    fetch(`/employees/${employeeId}`, {
      method: 'DELETE'
    })
    .then(function(response) {
      if (response.ok) {
        alert('Employee deleted successfully');
      } else {
        alert('Failed to delete employee');
      }
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
  }
  