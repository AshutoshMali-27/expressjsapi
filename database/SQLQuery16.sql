create procedure usp_getallemployee
as
begin 

select * from employee where isactive =1 order by firstname
end;


create procedure usp_getemployyeondeptid
@departmentid int
as 
begin 
select * from employee where departmentid=@departmentid and isactive=1 order by firstname
end

exec usp_getemployyeondeptid  @departmentid=1

create procedure use_getemployeeondeptandsalary
@departmentid int,
@salary decimal(10,2)
as
begin
select * from employee where departmentid=@departmentid and salary>=@salary and
isactive=1 order by salary desc
end
exec usp_getallemployee
exec use_getemployeeondeptandsalary @departmentid=1 , @salary=70000

create procedure usp_getemployeecount
@departmentid int,
@employeecount int output
as 
begin
select @employeecount=count(*) from employee where departmentid=@departmentid
end

declare @count int
exec usp_getemployeecount @departmentid=1 ,@employeecount=@count output
print 'department has count '+ cast	(@count as varchar) +' employees'






































