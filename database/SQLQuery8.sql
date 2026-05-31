select e.firstname,e.employeeid,e.lastname,d.departmentname
from employee e  inner join departments d  on e.departmentid=d.departementid



select d.departmentname,count(e.employeeid)as employeecount,avg(e.salary) as avgsalary 
from employee e inner join departments  d on e.departmentid=d.departementid
group by (d.departmentname)