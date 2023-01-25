-- Database notas-app

-- create database
CREATE DATABASE notas_app;

\c notas_app;

-- create table user
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL CHECK (length(password) >= 8)
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title_task TEXT NOT NULL,
  description TEXT NOT NULL,
  image_task TEXT,
  date TIMESTAMP NOT NULL,
  status_task BOOLEAN NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

