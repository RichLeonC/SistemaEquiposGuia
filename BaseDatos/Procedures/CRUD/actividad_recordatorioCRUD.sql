-- Create
CREATE PROCEDURE sp_actividad_recordatorio_create
    @idActividad int,
    @fecha date = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        INSERT INTO actividad_recordatorio (idActividad, fecha)
        VALUES (@idActividad, @fecha)
    END TRY
    BEGIN CATCH
        PRINT 'An error occurred: ' + ERROR_MESSAGE()
    END CATCH
END
GO

-- Read
CREATE PROCEDURE sp_actividad_recordatorio_read
    @idActividad int
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT *
        FROM actividad_recordatorio
        WHERE idActividad = @idActividad
    END TRY
    BEGIN CATCH
        PRINT 'An error occurred: ' + ERROR_MESSAGE()
    END CATCH
END
GO

-- Update
CREATE PROCEDURE sp_actividad_recordatorio_update
    @idActividad int,
    @fecha date = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        UPDATE actividad_recordatorio
        SET fecha = COALESCE(@fecha, fecha)
        WHERE idActividad = @idActividad
    END TRY
    BEGIN CATCH
        PRINT 'An error occurred: ' + ERROR_MESSAGE()
    END CATCH
END
GO

-- Delete
CREATE PROCEDURE sp_actividad_recordatorio_delete
    @idActividad int
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        DELETE FROM actividad_recordatorio
        WHERE idActividad = @idActividad
    END TRY
    BEGIN CATCH
        PRINT 'An error occurred: ' + ERROR_MESSAGE()
    END CATCH
END
GO
