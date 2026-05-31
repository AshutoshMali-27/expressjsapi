-- type conversion function 
--cast
select '12345' as stringnumber,
cast('12345' as int) as intnumber,
cast(123.456 as int) as truncatedecimal,
cast (salary as varchar) as salarytext,
cast('2025-05-17' as date) as datefromstring from employee

--convert

select employeeid,convert(varchar,employeeid),
convert(int,'500') as stringtoint ,
convert(decimal(10,2) ,'123.45')as stringtodecimal ,
convert (varchar,salary,1)as salaryformeted from employee


-- parse : parse string to specific type 

select parse('123' as int) as parseint,
parse('2025-05-17' as date using 'en-US') as parsedate,
parse('1,234.56' as decimal(10,2)) as parsedmoney
