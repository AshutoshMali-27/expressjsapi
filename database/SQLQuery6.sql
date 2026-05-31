create table employees(
employeeid int primary key,
email varchar(100) unique,
ssn varchar(100) unique
);

create table employeeskills(
employeeid int,
skillid int,
profiencylevel int,
primary key (employeeid,skillid) --composite primary key

)