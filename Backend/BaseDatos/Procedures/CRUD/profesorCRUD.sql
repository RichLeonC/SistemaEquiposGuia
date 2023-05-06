-- CREATE
CREATE PROCEDURE [dbo].[sp_profesor_create]
    @cedulaProfesor INT,
    @codigo VARCHAR(10),
    @esCordinador INT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        INSERT INTO [dbo].[profesor] ([cedulaProfesor], [codigo], [esCordinador])
        VALUES (@cedulaProfesor, @codigo, @esCordinador)
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE()
    END CATCH
END
GO

-- READ
CREATE PROCEDURE [dbo].[sp_profesor_read]
    @codigo VARCHAR(10) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        SELECT [cedulaProfesor], [codigo], [esCordinador]
        FROM [dbo].[profesor]
        WHERE [codigo] = ISNULL(@codigo, [codigo])
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE()
    END CATCH
END
GO

-- UPDATE
CREATE PROCEDURE [dbo].[sp_profesor_update]
    @cedulaProfesor INT = NULL,
    @codigo VARCHAR(10) = NULL,
    @esCordinador INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        UPDATE [dbo].[profesor]
        SET [cedulaProfesor] = ISNULL(@cedulaProfesor, [cedulaProfesor]),
            [esCordinador] = ISNULL(@esCordinador, [esCordinador])
        WHERE [codigo] = ISNULL(@codigo, [codigo])
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE()
    END CATCH
END
GO

-- DELETE
CREATE PROCEDURE [dbo].[sp_profesor_delete]
    @codigo VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        DELETE FROM [dbo].[profesor]
        WHERE [codigo] = @codigo
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE()
    END CATCH
END
GO
