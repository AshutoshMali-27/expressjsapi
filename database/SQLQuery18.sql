select employeeid,firstname,salary,
ROW_NUMBER() over(order by salary desc) as rankhighsalary, 
ROW_NUMBER() over (partition by departmentid order by salary desc) as rankindept
from employee


select
firstname, salary, rank() over (order by salary desc)as salaryrank,
DENSE_RANK() over(order by salary desc) as salarydenserank,
Row_number() over (order by salary desc) as rownumber from employee