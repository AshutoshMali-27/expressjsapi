-- indexing 
--- cluster index = determine physical order of rows
-- non-cluster index = seprate strecture pointing of rows
-- unique index =ensure no duplicate value,
--  composite index = index on multiple column 
-- full text index =for text searching 


select * from sys.indexes where object_id=OBJECT_ID('employee')


create table product (
productid int primary key,
productname varchar(200),
price decimal(10,2)
)

select * from sys.indexes where object_id=OBJECT_ID('customers')


create nonclustered index ixc_customer_city
on customers(city)



