alter table employee add managerid int null

update employee set managerid=1 where employeeid in (3,5)

update employee set managerid=2 where employeeid=4
select * from employee


select e.firstname+' '+e.lastname as employeename,
       m.firstname+ ' '+m.lastname as managername 
from employee e inner join employee m on e.managerid=m.employeeid

select d.departmentname,e.firstname,e.employeeid from departments d left outer join employee e on d.departementid=e.departmentid


select d.departmentname,count(e.employeeid)as employeecount 
from departments d left outer join employee e on d.departementid=e.departmentid
group by d.departmentname having count(e.employeeid)=0




select e.firstname,e.lastname,d.departmentname,p.projectname from employee e 
left join departments d on e.departmentid=d.departementid
left join projects p on e.employeeid=p.managerid


--categorized employyee based on salary and department

select e.firstname,e.lastname,d.departmentname,e.salary,
case 
when e.salary>75000 and d.departmentname='IT' then 'senior IT staff'
when e.salary>70000 then 'senior staff'  
else 'junior staff'
end as catogory
from employee e inner join departments  d on e.employeeid=d.departementid
order by e.salary desc



with deptstat as (
select departmentid,avg(salary) as avgsalary,count(*) employeecount 
from employee group by departmentid
)
select e.firstname,
e.lastname,
d.departmentname,
e.salary,
ds.avgsalary,
e.salary-ds.avgsalary as diffsalaray,
ds.employeecount
from employee e 
inner join departments d on e.employeeid=d.departementid
inner join deptstat ds on e.departmentid=ds.departmentid
