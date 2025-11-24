use JOB_DB
go

CREATE PROCEDURE SP_GetAllJobCategories AS
SELECT * FROM JobCategories;
go
CREATE PROCEDURE SP_GetJobCategoryById @Id UNIQUEIDENTIFIER AS
SELECT * FROM JobCategories WHERE id = @Id;
go
CREATE PROCEDURE SP_InsertJobCategory @Name NVARCHAR(200) AS
INSERT INTO JobCategories (id, Name, created_at,updated_at) VALUES (NEWID(), @Name, SYSDATETIMEOFFSET(),null);
go
CREATE PROCEDURE SP_UpdateJobCategory @Id UNIQUEIDENTIFIER, @Name NVARCHAR(200) AS
UPDATE JobCategories SET Name = @Name, updated_at = GETDATE() WHERE id = @Id;
go
CREATE PROCEDURE SP_DeleteJobCategory @Id UNIQUEIDENTIFIER AS
DELETE FROM JobCategories WHERE id = @Id;