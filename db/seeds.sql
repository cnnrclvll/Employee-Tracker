-- Seed data for departments
INSERT INTO department (name) VALUES
    ('Exhibitions'),
    ('Collections'),
    ('Education'),
    ('Visitor Services');

-- Seed data for roles
INSERT INTO role (title, salary, department_id) VALUES
    ('Exhibit Designer', 55000, 1),
    ('Curator', 65000, 1),
    ('Collection Manager', 50000, 2),
    ('Conservator', 60000, 2),
    ('Education Specialist', 48000, 3),
    ('Tour Guide', 32000, 3),
    ('Visitor Services Manager', 45000, 4),
    ('Visitor Services Associate', 30000, 4),
    ('Graphic Designer', 52000, 1),
    ('Art Handler', 40000, 1),
    ('Registrar', 58000, 2),
    ('Security Guard', 28000, 4);

-- Seed data for employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Alice', 'Johnson', 3, NULL),
    ('Bob', 'Brown', 4, 3),
    ('Carol', 'Davis', 5, NULL),
    ('Dave', 'Wilson', 6, 5),
    ('Eve', 'Taylor', 7, NULL),
    ('Frank', 'Anderson', 8, 7),
    ('Grace', 'Thomas', 9, NULL),
    ('Hank', 'Moore', 10, 9),
    ('Ivy', 'Clark', 11, NULL),
    ('Jack', 'Rodriguez', 12, 11),
    ('Kathy', 'Lewis', 1, 1),
    ('Leo', 'Walker', 2, 1),
    ('Mia', 'Hall', 3, 3),
    ('Nina', 'Allen', 4, 3),
    ('Oscar', 'Young', 5, 5),
    ('Paul', 'Hernandez', 6, 5),
    ('Quinn', 'King', 7, 7),
    ('Rose', 'Wright', 8, 7),
    ('Sam', 'Lopez', 9, 9),
    ('Tina', 'Hill', 10, 9),
    ('Uma', 'Scott', 11, 11),
    ('Victor', 'Green', 12, 11),
    ('Wendy', 'Adams', 1, 1),
    ('Xander', 'Baker', 2, 1),
    ('Yara', 'Gonzalez', 3, 3),
    ('Zane', 'Nelson', 4, 3),
    ('Amy', 'Carter', 5, 5),
    ('Brian', 'Mitchell', 6, 5);