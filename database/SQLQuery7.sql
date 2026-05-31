-- sql funstion 

--string function 

select 'hello world' as originalstring,
len('hello world') as stringlength,
upper('hello world') as uppercase,
lower('Hello World') as lowercase,
Ltrim('    hello')as lefttrim,
rtrim('hello   ') as righttrim,
trim('    hello   ')as trimboth


select firstname,SUBSTRING(firstname,1,3) as first3char,substring(firstname,2,2) as middle2char
from employee

select email, CHARINDEX('@',Email) as atsignposition , 
CHARINDEX('company',Email) as companypostion,
CHARINDEX('a',Email) as firstaposition
from Employee where Email is not null



select Email,REPLACE(Email,'@company.com','@newcompany.com') as newemail from Employee


select FirstName,LastName,REVERSE(FirstName)as reversed,REVERSE(email) as reversedemail from Employee 