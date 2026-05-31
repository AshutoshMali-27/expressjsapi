-- Shared lock (read)
BEGIN TRANSACTION;
SELECT * FROM employee WITH (HOLDLOCK)  -- Holds shared lock
WHERE DepartmentID = 1;
WAITFOR DELAY '00:00:05';  -- Hold lock for 5 seconds
COMMIT;

BEGIN TRANSACTION;
UPDATE employee SET Salary = Salary * 1.10 WHERE EmployeeID = 1;
WAITFOR DELAY '00:00:05';  -- Hold exclusive lock
COMMIT;

BEGIN TRANSACTION;
SELECT * FROM employee WITH (TABLOCK);  -- Table lock
COMMIT;

BEGIN TRANSACTION;
SELECT * FROM employee WITH (ROWLOCK)
WHERE EmployeeID = 1;
COMMIT;