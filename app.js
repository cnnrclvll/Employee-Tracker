const { prompt } = require("inquirer"); // require prompt from inquirer
const title = require("asciiart-logo"); // require for CLI logo
const db = require("./db"); // require the db folder (all the exports)

init(); // initiate the application

function init() {

// ------------//
// ** TITLE ** //
// ------------//

// configure and log title
  const appTitle = title({ name: "EMPLOYEE DATABASE" }).render();
  console.log(appTitle);

// run main menu prompts
  mainMenu();
}

// ------------------------------------------------- //
// --------------  *** MAIN MENU *** --------------- //
// ------------------------------------------------- //
function mainMenu() {
// ------------------------- //
// ----- ** PROMPTS ** ----- //
// ------------------------- //
// -- ** display & ref ** -- //
// ------------------------- //
// name = what appears in CLI
// value = reference for attaching function
  prompt([
    {
      type: "list",
      name: "choice",
      message: "Select a task.",
      choices: [
        {
          name: "Show All Employees",
          value: "FIND_ALL_EMPLOYEE"
        },
        {
          name: "Show Employees by Department",
          value: "FIND_EMPLOYEES_BY_DEPARTMENT"
        },
        {
          name: "Show Employees By Manager",
          value: "FIND_EMPLOYEES_BY_MANAGER"
        },
        {
          name: "New Employee",
          value: "CREATE_EMPLOYEE"
        },
        {
          name: "Remove an Employee",
          value: "DELETE_EMPLOYEE"
        },
        {
          name: "Change an Employee's Role",
          value: "EMPLOYEE_ROLE_CHANGE"
        },
        {
          name: "Change an Employee's Manager",
          value: "EMPLOYEE_MANAGER_CHANGE"
        },
        {
          name: "Show All Roles",
          value: "FIND_ALL_ROLE"
        },
        {
          name: "Create a Role",
          value: "CREATE_ROLE"
        },
        {
          name: "Delete a Role",
          value: "DELETE_ROLE"
        },
        {
          name: "Show All Departments",
          value: "FIND_ALL_DEPARTMENT"
        },
        {
          name: "Create a Department",
          value: "CREATE_DEPARTMENT"
        },
        {
          name: "Delete Department",
          value: "DELETE_DEPARTMENT"
        },
        {
          name: "Show Budget for All Departments",
          value: "BUDGET_ALL_DEPARTMENT"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ])

// ------------------------- //
// ----- ** PROMPTS ** ----- //
// ------------------------- //
// -- ** attach functn ** -- //
// ------------------------- //
// case = reference from prompt
// case.function = functions listed below
  .then(res => {
    let choice = res.choice;
    switch (choice) {
      case "FIND_ALL_EMPLOYEE":
        findAllEmployee();
        break;
      case "FIND_EMPLOYEES_BY_MANAGER":
        byManagerEmployee();
        break;
      case "FIND_EMPLOYEES_BY_DEPARTMENT":
        byDeptEmployee();
        break;
      case "CREATE_EMPLOYEE":
        createEmployee();
        break;
      case "DELETE_EMPLOYEE":
        deleteEmployee();
        break;
      case "EMPLOYEE_ROLE_CHANGE":
        roleEmployee();
        break;
      case "EMPLOYEE_MANAGER_CHANGE":
        managerEmployee();
        break;
      case "FIND_ALL_ROLE":
        findAllRole();
        break;
      case "CREATE_ROLE":
        createRole();
        break;
      case "DELETE_ROLE":
        deleteRole();
        break;
      case "FIND_ALL_DEPARTMENT":
        findAllDepartment();
        break;
      case "CREATE_DEPARTMENT":
        createDepartment();
        break;
      case "DELETE_DEPARTMENT":
        deleteDepartment();
        break;
      case "BUDGET_ALL_DEPARTMENT":
        budgetAllDepartment();
        break;
      default:
        quit();
    }
  }
  )
}
// ------------------------- //
// ----- ** PROMPTS ** ----- //
// ------------------------- //
// -- ** attach functn ** -- //
// ------------------------- //
// calling database functions
// promisary chains
// follow-up prompts
// responding with data tables
// return user to main menu

// ------------------------ //
// ** FIND ALL EMPLOYEES ** //
// ------------------------ //
function findAllEmployee() {
  db.employeeFindAll()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => mainMenu());
}

// -------------------------------- //
// ** FIND ALL EMPLOYEES BY DEPT ** //
// -------------------------------- //
// map through departments and deconstruct for choices
// send choices to secondary prompt
// pass user choice by res.departmentId to db function
// return a table of database function results (employees)
// return user to main menu
function byDeptEmployee() {
  db.departmentFindAll()
    .then(([rows]) => {
      let departments = rows;
      const choices = departments.map(({ id, name }) => (
        {
          value: id,
          name: name
        }
      ));
      prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Select a department to view its employee's.",
          choices: choices
        }
      ])
        .then(res => db.employeeByDept(res.departmentId))
        .then(([rows]) => {
          let employees = rows;
          console.log("\n");
          console.table(employees);
        })
        .then(() => mainMenu())
    });
}

// ----------------------------------- //
// ** FIND ALL EMPLOYEES BY MANAGER ** //
// ----------------------------------- //
// run db function
// map employees and deconstruct for choices
// secondary prompt
// pass user choice by res.managerId to db function
// send a table of filtered employees
// send user main menu
function byManagerEmployee() {
  db.employeeFindAll()
    .then(([rows]) => {
      let employees = rows;
      const choices = employees.map(({ id, first_name, last_name }) => (
        {
          value: id,
          name: `${last_name}, ${first_name}`
        }
      ));
      prompt([
        {
          type: "list",
          name: "managerId",
          message: "Select a manager from the list of employees.",
          choices: choices
        }
      ])
        .then(res => db.employeeByManager(res.managerId))
        .then(([rows]) => {
          let employeesFilt = rows;
          console.log("\n");
          if (employeesFilt.length === 0) {
            console.log("It seems the employee you selected may not be a manager. No subsequent employees found.");
          } else {
            console.table(employeesFilt);
          }
        })
        .then(() => mainMenu())
    });
}

// ---------------------- //
// ** DETLETE EMPLOYEE ** //
// ---------------------- //
// run db function
// map and deconstruct employees for choices
// secondary prompt
// pass user choice by employeeId to db function
// log confirmation and return user to main menu
function deleteEmployee() {
  db.employeeFindAll()
    .then(([rows]) => {
      let employees = rows;
      const choices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select an employee record to delete.",
          choices: choices
        }
      ])
        .then(res => db.employeeDelete(res.employeeId))
        .then(() => console.log("Successfully deleted record!"))
        .then(() => mainMenu())
    })
}

// -------------------------- //
// ** UPDATE EMPLOYEE ROLE ** //
// -------------------------- //
// run db function
// map and deconstruct employees for choices
// collect user input as employeeId
// map and deconstruct roles for choices
// send user input as roleId and employeeId to db func
// log confirmation and return user to main menu
function roleEmployee() {
  db.employeeFindAll()
    .then(([rows]) => {
      let employees = rows;
      const choicesEmp = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select an employee to change their role?",
          choices: choicesEmp
        }
      ])
        .then(res => {
          let employeeId = res.employeeId;
          db.roleFindAll()
            .then(([rows]) => {
              let roles = rows;
              const choicesRole = roles.map(({ id, title }) => ({
                name: title,
                value: id
              }));
              prompt([
                {
                  type: "list",
                  name: "roleId",
                  message: "Select a role to be assigned.",
                  choices: choicesRole
                }
              ])
                .then(res => db.employeeRole(employeeId, res.roleId))
                .then(() => console.log("Successfully updated record!"))
                .then(() => mainMenu())
            });
        });
    })
}

// ---------------------------- //
// ** UPDATE EMPLOYEE MANAGER * //
// ---------------------------- //
// run db function
// map and deconstruct employees for choices
// pass user selection as employeeId to db function
// map and deconstruct potential managers for choices
// pass user selection as employeeId and managerId to db function
// log confirmation and send user to main menu
function managerEmployee() {
  db.employeeFindAll()
    .then(([rows]) => {
      let employees = rows;
      const choicesEmp = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select an employee to update their manager.",
          choices: choicesEmp
        }
      ])
        .then(res => {
          let employeeId = res.employeeId
          db.managerFindPossible(employeeId)
            .then(([rows]) => {
              let managers = rows;
              const choicesMngr = managers.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
              }));
              prompt([
                {
                  type: "list",
                  name: "managerId",
                  message: "Select a manager to be assigned.",
                  choices: choicesMngr
                }
              ])
                .then(res => db.employeeManager(employeeId, res.managerId))
                .then(() => console.log("Successfully updated record!"))
                .then(() => mainMenu())
            })
        })
    })
}

// -------------------- //
// ** FIND ALL ROLES ** //
// -------------------- //
// run db function
// send results as a table in console
// return user to main menu
function findAllRole() {
  db.roleFindAll()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => mainMenu());
}

// --------------------- //
// ** CREATE NEW ROLE ** //
// --------------------- //
// run db function
// map and deconstruct departments for choices
// collect user input for title and salary
// send user inputs and selection to db function
// log confirmation and return user to main menu
function createRole() {
  db.departmentFindAll()
    .then(([rows]) => {
      let departments = rows;
      const choices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));
      prompt([
        {
          name: "title",
          message: "What is the name of the role?"
        },
        {
          name: "salary",
          message: "What is the salary of the role?"
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does the role belong to?",
          choices: choices
        }
      ])
        .then(role => {
          db.roleCreate(role)
            .then(() => console.log("Successfully added record!"))
            .then(() => mainMenu())
        })
    })
}

// ----------------- //
// ** DELETE ROLE ** //
// ----------------- //
// run db function
// map and deconstruct roles for choices
// pass user selection as roleId to db function
// log confirmation message and return user to main menu
function deleteRole() {
  db.roleFindAll()
    .then(([rows]) => {
      let roles = rows;
      const choices = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }));

      prompt([
        {
          type: "list",
          name: "roleId",
          message: "Deleting a role will delete all employees who have this role. This action cannot be undone. Select a role you wish to delete.",
          choices: choices
        }
      ])
        .then(res => db.roleDelete(res.roleId))
        .then(() => console.log("Successfully deleted record!"))
        .then(() => mainMenu())
    })
}

// -------------------------- //
// ** FIND ALL DEPARTMENTS ** //
// -------------------------- //
// run db function
// return departments as a table in console
// send user to main menu
function findAllDepartment() {
  db.departmentFindAll()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => mainMenu());
}

// --------------------------- //
// ** CREATE NEW DEPARTMENT ** //
// --------------------------- //
// take user input for department name
// pass user input as name to db function
// log confirmation message and return user to main menu
function createDepartment() {
  prompt([
    {
      name: "name",
      message: "Provide a name for the new department."
    }
  ])
    .then(res => {
      let name = res;
      db.departmentCreate(name)
        .then(() => console.log("Successfully added record!"))
        .then(() => mainMenu())
    })
}

// ----------------------- //
// ** DELETE DEPARTMENT ** //
// ----------------------- //
// run db function
// map and deconstruct departments for choices
// pass user selection as departmentId to db function
// log confirmation and return user to main menu
function deleteDepartment() {
  db.departmentFindAll()
    .then(([rows]) => {
      let departments = rows;
      const choices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));
      prompt({
        type: "list",
        name: "departmentId",
        message: "Deleting a department will delete all role and employee records who belong to this department. This action cannot be undone. Select a department you wish to delete.",
        choices: choices
      })
        .then(res => db.departmentDelete(res.departmentId))
        .then(() => console.log("Successfully deleted record!"))
        .then(() => mainMenu())
    })
}

// --------------------------------- //
// ** FIND ALL DEPARTMENT BUDGETS ** //
// --------------------------------- //
// run db function
// return departments as a table in console
// send user to main menu
function budgetAllDepartment() {
  db.departmentBudgetAll()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => mainMenu());
}

// ------------------------- //
// ** CREATE NEW EMPLOYEE ** //
// ------------------------- //
// collect user input for first and last name
// run db function
// map and deconstruct roles for choices
// collect user selection for role
// run db function
// map and deconstruct employees (managers) for choices
// add 'N/A' as a choice
// draw an employee object using user selection/input
// pass employee object to db function
// log confirmation and return user to main menu
function createEmployee() {
  prompt([
    {
      name: "first_name",
      message: "Provide a first name."
    },
    {
      name: "last_name",
      message: "Provide a last name."
    }
  ])
    .then(res => {
      let firstName = res.first_name;
      let lastName = res.last_name;

      db.roleFindAll()
        .then(([rows]) => {
          let roles = rows;
          const choicesRole = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }));
          prompt({
            type: "list",
            name: "roleId",
            message: "Select a role.",
            choices: choicesRole
          })
            .then(res => {
              let roleId = res.roleId;

              db.employeeFindAll()
                .then(([rows]) => {
                  let managers = rows;
                  const choicesMngr = managers.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                  }));

                  choicesMngr.unshift({ name: "N/A", value: null });

                  prompt({
                    type: "list",
                    name: "managerId",
                    message: "Select a manager.",
                    choices: choicesMngr
                  })
                    .then(res => {
                      let employee = {
                        manager_id: res.managerId,
                        role_id: roleId,
                        first_name: firstName,
                        last_name: lastName
                      }

                      db.employeeCreate(employee);
                    })
                    .then(() => console.log("Successfully added record!"))
                    .then(() => mainMenu())
                })
            })
        })
    })
}

// ---------------------- //
// ** EXIT APPLICATION ** //
// ---------------------- //
function quit() {
  console.log("Application closed.");
  process.exit();
}
