-- transaction and CONCURRENCY


select * from employee where departmentid=1


begin transaction

update employee set salary=salary*1.10 where departmentid=1

if @@error<>0
begin
    rollback transaction
	print 'transaction roll back due to error'
	end
	else
	begin

	commit transaction
	print 'trasaction commit sucessfully'
	end
begin transaction updatesalaries;

update employee set salary=90000 where employeeid=1

if @@ROWCOUNT=0 
begin 
     rollback  transaction updatesalaries
	 print 'no employee updated'
end
else
begin
commit transaction updatesalaries
print 'salaries updated '
end



select * from employee














