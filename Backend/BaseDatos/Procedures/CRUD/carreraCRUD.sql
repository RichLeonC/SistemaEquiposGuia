--CREATE
CREATE PROCEDURE [dbo].[carrera_create]
    @codigoCarrera varchar(20),
    @idSede int,
    @nombreCarrera varchar(100)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        INSERT INTO [dbo].[carrera] (codigoCarrera, idSede, nombreCarrera)
        VALUES (@codigoCarrera, @idSede, @nombreCarrera);
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH
END
GO

--READ
CREATE PROCEDURE [dbo].[carrera_read]
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT * FROM [dbo].[carrera];
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH
END
GO

--UPDATE
CREATE PROCEDURE [dbo].[carrera_update]
    @codigoCarrera varchar(20) = NULL,
    @idSede int = NULL,
    @nombreCarrera varchar(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        UPDATE [dbo].[carrera]
        SET
            codigoCarrera = COALESCE(@codigoCarrera, codigoCarrera),
            idSede = COALESCE(@idSede, idSede),
            nombreCarrera = COALESCE(@nombreCarrera, nombreCarrera);
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH
END
GO

--DELETE
CREATE PROCEDURE [dbo].[carrera_delete]
    @codigoCarrera varchar(20)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        DELETE FROM [dbo].[carrera]
        WHERE codigoCarrera = @codigoCarrera;
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH
END
GO
