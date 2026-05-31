--triggers 

--automatic code execution  on insert ,update ,delete 

--trigger type 
--dml triggers ==fire on insert ,update ,delete 
--ddl triggers == fire on create , alter ,drop 

-- Setup

CREATE TABLE EmployeeAudit (
    AuditID INT PRIMARY KEY IDENTITY(1, 1),
    Action VARCHAR(20),
    EmployeeID INT,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    OldSalary DECIMAL(10, 2),
    NewSalary DECIMAL(10, 2),
    ActionDate DATETIME DEFAULT GETDATE()
);


create trigger tr_employee_afterinsert
on employee after insert
as
begin
insert into EmployeeAudit(action,EmployeeID,FirstName,LastName,Email,NewSalary)
select 'insert',EmployeeID, FirstName, LastName, Email, Salary
    FROM inserted;
	  PRINT 'Employee inserted - trigger fired';
end


INSERT INTO employee (FirstName, LastName, Email, Salary, DepartmentID, HireDate)
VALUES ('New', 'Employee', 'new@company.com', 50000, 1, GETDATE());


select * from EmployeeAudit