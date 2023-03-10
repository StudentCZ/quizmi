CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Quizzes (
  quiz_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES Users(user_id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(255) NOT NULL,
  is_admin_created BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE Questions (
  question_id SERIAL PRIMARY KEY,
  quiz_id INT NOT NULL REFERENCES Quizzes(quiz_id),
  subject VARCHAR(255) NOT NULL,
  question_text TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE Answers (
  answer_id SERIAL PRIMARY KEY,
  question_id INT NOT NULL REFERENCES Questions(question_id),
  answer_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Scores (
  score_id SERIAL PRIMARY KEY,
  quiz_id INT NOT NULL REFERENCES Quizzes(quiz_id),
  user_id INT NOT NULL REFERENCES Users(user_id),
  score INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Leaderboard (
  leaderboard_id SERIAL PRIMARY KEY,
  quiz_id INT NOT NULL REFERENCES Quizzes(quiz_id),
  user_id INT NOT NULL REFERENCES Users(user_id),
  score INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
