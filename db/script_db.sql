-- Database notas-app

-- create database
CREATE DATABASE notas_app;

\c notas_app;

-- create table user
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  username VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL CHECK (length(password) >= 8)
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title_task VARCHAR(50) NOT NULL,
  description VARCHAR(200) NOT NULL,
  image_task VARCHAR(255),
  date TIMESTAMP NOT NULL,
  status_task BOOLEAN NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (first_name, last_name, email, username, password) VALUES ("piero", "venegas", "piero@gmail.com", "pipo", "12345678");