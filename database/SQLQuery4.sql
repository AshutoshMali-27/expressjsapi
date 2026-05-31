create table Eventlog(
EventID int ,
eventdate date ,
eventtime time(3),
occouredat datetime2(3),
createdat datetimeoffset(3)
)



insert into Eventlog(EventID,eventdate,eventtime,occouredat,createdat)
values(1,cast(GETDATE() as date), cast(GETDATE() as time),GETDATE(),SYSDATETIMEOFFSET())


select * from Eventlog

select DATEDIFF(day,'2025-01-01' ,'2026-05-16') as daydifference,
DateADD (month,6,GETDATE())as DateAfter6month,
EOMONTH(GETDATE()) as endofcurrentmonth,
year(GETDATE())as currentyear,
month(GETDATE())as currentdate,
Day(GETDATE()) as currentdate from Eventlog