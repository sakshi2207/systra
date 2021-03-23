CREATE DATABASE emp;

CREATE TABLE emp(
    emp_id SERIAL PRIMARY KEY,
    username varchar(255) NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255),
    designation varchar(255),
    department varchar(255),
    business varchar(255),
    email varchar(255)  UNIQUE,
    bank_name varchar(255),
    bank_branch varchar(255),
    bank_ifsc varchar(255),
    ac_no BigInt(16) UNIQUE,
    password varchar(255)
    
    
);
