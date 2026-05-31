create view vw_employeebasicview as 
select employeeid,firstname,lastname,email,salary from employee where isactive=1


select * from vw_employeebasicview

EXEC sp_helptext 'vw_employeebasicview';