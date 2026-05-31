create table department(
departmentid int primary key Identity(1,1),
departmentname varchar(100) not null,
budget decimal(15,2) not null,
managerid int
)

create table users(
userid int primary key identity(1,1),
email varchar(100) not null unique,
Username varchar(50) unique,
password nvarchar(max) not null
)

create table customers(
customerId int primary key,
customername varchar(100),
email varchar(100)
)


create table orders(
orderid int primary key identity(1,1),
orderdate date not null,
customerid int not null,
employeeid int not null,
Foreign key (customerid) REFERENCES customers(customerId),
)

create table transactions (
transactionID int primary key identity(1,1),
amount decimal (10,2),
transactiondate datetime2(3) default getdate(),
status varchar(20) default 'pending',
createddate datetime2(3) default getdate()
)

create table products(
productid int primary key identity(1,1),
productname varchar(100) not null,
price decimal(10,2) check(price >0),
quantity int check (quantity >=0),
discount decimal(5,2) check (discount between 0 and 100)
)