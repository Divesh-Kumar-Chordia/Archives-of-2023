CREATE DATABASE todo_db;

USE todo_db;

CREATE TABLE todos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task VARCHAR(255) NOT NULL
);
