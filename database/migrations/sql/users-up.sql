CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL
);
