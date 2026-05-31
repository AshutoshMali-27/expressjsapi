
use  HRMS
-- get current database 
select DB_NAME() as CurrentDatabase

exec sp_helpdb HRMS


select * from INFORMATION_SCHEMA.TABLES where TABLE_TYPE='BASE TABLE'



select name,physical_name from sys.database_files;