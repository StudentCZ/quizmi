CREATE DATABASE quizmi;

CREATE TABLE Users(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email EMAIL NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
)
