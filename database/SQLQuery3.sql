Create table UserProfiles(
userID int,
Firstname varchar(50),
lastname varchar(50),
bio nvarchar(max),
countrycode char(2),
middlename varchar(50)
)


select CONCAT(Firstname, ' ', lastname) as fullname
,len(bio) as Biolenght,UPPER(Firstname) as uppername,SUBSTRING(Firstname,1,3) as FirstThreename from UserProfiles