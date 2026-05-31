--- CTE

with employeesalarystats as (
select departmentid,avg(salary) as avgsalary,
min(salary) as minsalary,
max(salary) as maxsalary,
count(*) as employeecount from employee
group by departmentid
)

select * from employeesalarystats where avgsalary>68000 order by avgsalary desc

with deptemployee as (
select e.firstname,e.email,e.employeeid,e.salary,d.departmentname
from employee e inner join  departments d on d.departementid=e.departmentid where isactive=1
)

select * from deptemployee where salary>75000 order by salary desc









