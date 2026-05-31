declare @salary decimal(10,2)=75000;

if @salary>80000
print 'high salary';
else if @salary>70000
print 'medium salary'
else 
print 'low salary'


select * from employee

if exists (select 1 from employee where departmentid=1)
begin 
select count(*) as Itemployee from employee where departmentid=1
end
else
begin 
print 'no it employee found'
end

alter table employee add middlename varchar(50)

select firstname,lastname,middlename,isnull(middlename,'N/A')as middlenameorna,
isnull(managerid,0) as manageridorzero from employee


select firstname,middlename ,lastname,coalesce(middlename,lastname,'N/A') as fullname from employee



select firstname ,coalesce(nullif(middlename,''),nullif(lastname,''),firstname)
as prefferedname from employee















