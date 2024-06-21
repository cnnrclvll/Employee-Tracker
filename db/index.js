// Database class holds functions to Find, Create, Delete, and Update the following: Employees, Roles, and Departments //
// ** return this.connection.promise().query(``) ** //
// LEFT JOIN joins data to obtain values. NULL if there is no value
// use MySQL Typescript to find/create/delete/update data

const connection = require("./connection"); // mysql connection file

class Database {
    
  constructor(connection) {
    this.connection = connection; // referencing mysql connection for use in functions
  }

// ------------------------------------------------- //
// ----------- //  *** EMPLOYEES *** // ------------ //
// ------------------------------------------------- //

// ** FIND ALL EMPLOYEES ** //
// select all employees and all relevant information including role, department, and manager
// passing nothing
  employeeFindAll() {
    return this.connection.promise().query(
        `SELECT 
            employee.id, employee.first_name, employee.last_name, 
            role.title, role.salary, 
            department.name AS department, 
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
        FROM 
            employee 
        LEFT JOIN 
            role on employee.role_id = role.id 
        LEFT JOIN 
            department on role.department_id = department.id 
        LEFT JOIN 
            employee manager on manager.id = employee.manager_id;`
    );
  }

// ** FIND ONE EMPLOYEE ** //
// select one employee and all relevant information including role, department, and manager by id
// passing employeeId
  employeeFindOne(employeeId) {
    return this.connection.promise().query(
        `SELECT 
            employee.id, employee.first_name, employee.last_name, 
            role.title, role.salary, 
            department.name AS department, 
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
        FROM 
            employee 
        LEFT JOIN 
            role on employee.role_id = role.id 
        LEFT JOIN 
            department on role.department_id = department.id 
        LEFT JOIN 
            employee manager on manager.id = employee.manager_id
        WHERE 
            id = ?;`, [employeeId]
    );
  }

// ** FIND ALL POSSIBLE MANAGERS ** //
// select all employee's id except for the employee whose manager is being searched for
// passing an employeeId value
  managerFindPossible(employeeId) {
    return this.connection.promise().query(
        `SELECT 
            id, first_name, last_name 
        FROM 
            employee 
        WHERE 
            id != ?;`, [employeeId]
    );
  }

// ** FIND ALL EMPLOYEES BY MANAGER ** //
// select employee info including department and role where manager matches in the employee object
// passing managerId value
  employeeByManager(managerId) {
    return this.connection.promise().query(
        `SELECT 
            employee.id, employee.first_name, employee.last_name, 
            department.name AS department, 
            role.title 
        FROM 
            employee 
        LEFT JOIN 
            role on role.id = employee.role_id 
        LEFT JOIN 
            department ON department.id = role.department_id 
        WHERE 
            manager_id = ?;`, [managerId]
    );
  }

// ** FIND ALL EMPLOYEES BY DEPT ** //
// select employee info including role where department id matches in employee data object
// passing departmentId value
  employeeByDept(departmentId) {
    return this.connection.promise().query(
        `SELECT 
            employee.id, employee.first_name, employee.last_name, 
            role.title 
        FROM 
            employee 
        LEFT JOIN 
            role on employee.role_id = role.id 
        LEFT JOIN 
            department department on role.department_id = department.id 
        WHERE 
            department.id = ?;`, [departmentId]
    );
  }

// ** CREATE NEW EMPLOYEE ** //
// insert employee object into employee table
// passing an employee object
  employeeCreate(employee) {
    return this.connection.promise().query(
        `INSERT INTO employee SET ?;`, [employee]
    );
  }

// ** DETLETE EMPLOYEE ** //
// delete instance from employee table where id matches
// passing an employeeId value
  employeeDelete(employeeId) {
    return this.connection.promise().query(
      `DELETE FROM employee WHERE id = ?;`, [employeeId]
    );
  }

// ** UPDATE EMPLOYEE ROLE ** //
// update employee by setting the value of role_id where employeeId matches
// passing employeeId and new roleId
  employeeRole(employeeId, roleId) {
    return this.connection.promise().query(
        `UPDATE employee SET role_id = ? WHERE id = ?;`, [roleId, employeeId]
    );
  }

// ** UPDATE EMPLOYEE'S MANAGER * //
// update employee by setting the value of manager_id where employeeId matches
// passing employeeId and new managerId
  employeeManager(employeeId, managerId) {
    return this.connection.promise().query(
        `UPDATE employee SET manager_id = ? WHERE id = ?;`,
        [managerId, employeeId]
    );
  }

// -------------------------------------------- //
// ----------- //  *** ROLES *** // ----------- //
// -------------------------------------------- //

// ** FIND ALL ROLES ** //
// select all roles and all relevant information including department
// passing nothing
  roleFindAll() {
    return this.connection.promise().query(
        `SELECT 
            role.id, role.title, role.salary, department.name AS department 
        FROM 
            role 
        LEFT JOIN 
            department on role.department_id = department.id;`
    );
  }

// ** FIND ONE ROLE ** //
// select one role and all relevant information including department
// passing roleId
  roleFindOne(roleId) {
    return this.connection.promise().query(
        `SELECT 
            role.id, role.title, role.salary, department.name AS department 
        FROM 
            role 
        LEFT JOIN 
            department on role.department_id = department.id
        WHERE 
            id = ?;`, [roleId]
    );
  }

// ** CREATE NEW ROLE ** //
// insert role object into role table
// passing role
  roleCreate(role) {
    return this.connection.promise().query(
        `INSERT INTO role SET ?;`, [role]
    );
  }

// ** DELETE ROLE ** //
// delete role from role table where id matches
// passing roleId
  roleDelete(roleId) {
    return this.connection.promise().query(
        `DELETE FROM role WHERE id = ?;`, [roleId]
    );
  }

// ** UPDATE ROLE SALARY ** //
// update role salary where id matches
// passing salary decimal and roleId
  roleSalary(salary, roleId) {
    return this.connection.promise().query(
        `UPDATE role SET salary = ? WHERE id = ?;`, [salary, roleId]
    );
  }

// -------------------------------------------------- //
// ----------- //  *** DEPARTMENTS *** // ----------- //
// -------------------------------------------------- //

// ** FIND ALL DEPARTMENTS ** //
// select all departments from department table
// passing nothing
  departmentFindAll() {
    return this.connection.promise().query(
        `SELECT 
            department.id, department.name 
        FROM 
            department;`
    );
  }

// ** FIND ONE DEPARTMENT ** //
// select one department and all relevant information
// passing departmentId
  departmentFindOne(departmentId) {
    return this.connection.promise().query(
        `SELECT 
            department.id, department.name 
        FROM 
            department
        WHERE 
            id = ?;`, [departmentId]
    );
  }

// ** CREATE NEW DEPARTMENT ** //
// insert department object into department table
// passing department object
  departmentCreate(department) {
    return this.connection.promise().query(
        `INSERT INTO department SET ?;`, [department]
    );
  }

// ** DELETE DEPARTMENT ** //
// delete from department table where id matches
// passing departmentId
  departmentDelete(departmentId) {
    return this.connection.promise().query(
        `DELETE FROM department WHERE id = ?;`, [departmentId]
    );
  }

// ** FIND ALL DEPARTMENT BUDGETS ** //
// Find all departments, for each: join related employees and roles, take sum of dept employee's role salary
// passing nothing
  departmentBudgetAll() {
    return this.connection.promise().query(
        `SELECT 
            department.id, department.name, 
            SUM(role.salary) AS utilized_budget 
        FROM 
            employee 
        LEFT JOIN 
            role on employee.role_id = role.id 
        LEFT JOIN 
            department on role.department_id = department.id 
        GROUP BY 
            department.id, department.name;`
    );
  }

// ** FIND ONE DEPARTMENT BUDGET ** //
// Find department where id matches, join related employees and roles, take sum of dept employee's role salary (not in this order)
// passing nothing
  departmentBudgetOne(departmentId) {
    return this.connection.promise().query(
        `SELECT 
            department.id, department.name, 
            SUM(role.salary) AS utilized_budget 
        FROM 
            employee 
        LEFT JOIN 
            role on employee.role_id = role.id 
        LEFT JOIN 
            department on role.department_id = department.id 
        WHERE
            id = ?
        GROUP BY 
            department.id, department.name;`, 
        [departmentId]
    );
  }
}

module.exports = new Database(connection);
