DROP DATABASE IF EXISTS employee_roster;
CREATE DATABASE employee_roster; -- create database

USE employee_roster; -- target datebase before creating tables

CREATE TABLE department ( -- create department table
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, -- PK -- auto increments only positive integers
  name VARCHAR(30) UNIQUE NOT NULL -- department name 30 char limit
);

CREATE TABLE role ( -- create role table
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, -- PK
  title VARCHAR(30) UNIQUE NOT NULL, -- role title 30 char limit
  salary DECIMAL UNSIGNED NOT NULL, -- salary positive decimal
  department_id INT UNSIGNED NOT NULL, -- PK of related department
  INDEX dept_index (department_id), -- non-unique index of department's department_id
  CONSTRAINT dept_fkey FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE -- join department and role data with department_id as a foreign key
);-- !! deleting department will delete all relevant roles !! 

CREATE TABLE employee ( -- create employee table
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, -- PK
  first_name VARCHAR(30) NOT NULL, -- first name 30 char limit
  last_name VARCHAR(30) NOT NULL, -- last name 30 char limit
  role_id INT UNSIGNED NOT NULL, -- PK of role
  INDEX role_index (role_id), -- non-unique index of role's role_id
  CONSTRAINT role_fkey FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE, -- join role and employee data with role_id as a foreign key
  manager_id INT UNSIGNED, -- PK of employee's manager
  INDEX manager_index (manager_id), -- non-unique index of manager_id
  CONSTRAINT manager_fkey FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL -- join manager and employee data with id
);
