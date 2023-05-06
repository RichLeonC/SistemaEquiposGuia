-- CREATE PROCEDURE
CREATE PROCEDURE sp_CreatePersonal
    @cedulaPersonal int,
    @idSede int,
    @telOficina int = NULL,
    @foto varchar(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        INSERT INTO [dbo].[personal] ([cedulaPersonal], [idSede], [telOficina], [foto])
        VALUES (@cedulaPersonal, @idSede, @telOficina, @foto);
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH
END
GO

-- READ PROCEDURE
CREATE PROCEDURE sp_ReadPersonal
    @cedulaPersonal int
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        SELECT *
        FROM [dbo].[personal]
        WHERE [cedulaPersonal] = @cedulaPersonal;
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH
END
GO

-- UPDATE PROCEDURE
CREATE PROCEDURE sp_UpdatePersonal
    @cedulaPersonal int = NULL,
    @idSede int = NULL,
    @telOficina int = NULL,
    @foto varchar(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        UPDATE [dbo].[personal]
        SET [idSede] = COALESCE(@idSede, [idSede]),
            [telOficina] = COALESCE(@telOficina, [telOficina]),
            [foto] = COALESCE(@foto, [foto])
        WHERE [cedulaPersonal] = COALESCE(@cedulaPersonal, [cedulaPersonal]);
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH
END
GO

-- DELETE PROCEDURE
CREATE PROCEDURE sp_DeletePersonal
    @cedulaPersonal int
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        DELETE FROM [dbo].[personal]
        WHERE [cedulaPersonal] = @cedulaPersonal;
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH
END
GO
