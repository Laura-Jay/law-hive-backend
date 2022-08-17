Story 1: 

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    title varchar(50) NOT NULL,
    description varchar(255) NOT NULL,
    state varchar(10) NOT NULL,
    creationDate TIMESTAMP DEFAULT current_timestamp,
    CONSTRAINT check_state CHECK (state IN ('Started', 'Paid'))
);

INSERT INTO posts (title, description, state)
VALUES 
('Legal', 'description 1 test', 'Started'),
('Property', 'description 2 test', 'Started');

Story 2: 

CREATE TABLE posts (
    id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    title varchar(50) NOT NULL,
    description varchar(255) NOT NULL,
    feeStructure varchar(15) NOT NULL,
    feeAmount int,
    feePercentage int,
    state varchar(10) NOT NULL,
    creationDate TIMESTAMP DEFAULT current_timestamp,
    CONSTRAINT check_state CHECK (state IN ('Started', 'Paid'))
);