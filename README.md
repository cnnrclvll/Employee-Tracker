![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)

# MySQL Employee Tracker

## Table of Contents
- [Description](#description)
- [Installation/Usage](#installation/usage)
- [Contributing](#contributing)
- [Testing](#testing)
- [License](#license)
- [Questions](#questions)

## Description
The MySQL Employee Tracker is a command-line database manager.  Version 1.0.0 is programmed to handle employee, department, and role data instances. Employees will take first name, last name, role reference and manager reference. Roles will take title, salary, and department reference. Department will take a name. Follow a list of simple command prompts to begin building your database.

## Installation/Usage

[Tutorial Video](https://www.loom.com/share/f06dd29d73d94e3089ceb2697e1eb749?sid=cb41ed07-74a5-45d3-9132-8a51ca185781)

To use the MySQL Employee Tracker, copy the application directory locally from GitHub (https://github.com/cnnrclvll/Employee-Tracker). You will need to have MySQL installed on your computer and configured for login to use this application. In your prefered terminal, navigate to the application directory and run the command `npm install` to install Inquirer, MySql, and Asciiart packages. Next, configure your `connection.js` file.  Before initialzing the application, enter the MySQL command-line client using the command `mysql -u root -p` and enter your password. After successfully entering the MySQL client, use the command `SOURCE db/schema.sql;` to create the employee_roster database. Exit the MySQL client. Type the command `npm run start` or `node app.js` from the application directory to run the application. Follow the command prompts to begin creating data instances.

## Contributing
To contribute to the project, visit the GitHub repository and share your thoughts via email (see below).

## Testing
Testing has not been set up for this project.

## License
This project is licensed under the Unlicense. A public domain dedication intended to release software into the public domain, waiving all copyright and related rights.

## Questions
If you have any questions, feel free to reach out:

- GitHub: [cnnrclvll](https://github.com/cnnrclvll)
- Email: <a href="mailto:cnnrclvll@gmail.com">cnnrclvll@gmail.com</a>