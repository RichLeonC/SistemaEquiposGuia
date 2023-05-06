-- Create procedure
CREATE PROCEDURE [dbo].[equipoGuia_Create]
    @generacion int,
    @idCoordinador int
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        INSERT INTO [dbo].[equipoGuia] ([generacion], [idCoordinador])
        VALUES (@generacion, @idCoordinador)
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH;
END
GO

-- Read procedure
CREATE PROCEDURE [dbo].[equipoGuia_Read]
    @generacion int = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT [generacion], [idCoordinador]
        FROM [dbo].[equipoGuia]
        WHERE (@generacion IS NULL OR [generacion] = @generacion)
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH;
END
GO

-- Update procedure
CREATE PROCEDURE [dbo].[equipoGuia_Update]
    @generacion int = NULL,
    @idCoordinador int = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        UPDATE [dbo].[equipoGuia]
        SET [idCoordinador] = COALESCE(@idCoordinador, [idCoordinador])
        WHERE (@generacion IS NULL OR [generacion] = @generacion)
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH;
END
GO

-- Delete procedure
CREATE PROCEDURE [dbo].[equipoGuia_Delete]
    @generacion int
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        DELETE FROM [dbo].[equipoGuia]
        WHERE [generacion] = @generacion
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH;
END
GO
