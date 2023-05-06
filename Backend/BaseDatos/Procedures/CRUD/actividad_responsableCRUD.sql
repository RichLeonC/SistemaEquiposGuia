-- CREATE Procedure for inserting data into the table
CREATE PROCEDURE sp_actividad_responsables_insert
    @idActividad INT,
    @generacion INT,
    @idProfesor VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        INSERT INTO actividad_responsables (idActividad, generacion, idProfesor)
        VALUES (@idActividad, @generacion, @idProfesor)
    END TRY
    BEGIN CATCH
        PRINT 'An error occurred: ' + ERROR_MESSAGE();
    END CATCH
END
GO

-- CREATE Procedure for selecting data from the table
CREATE PROCEDURE sp_actividad_responsables_select
    @idActividad INT = NULL,
    @idProfesor VARCHAR(10) = NULL,
    @generacion INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        SELECT idActividad, generacion, idProfesor
        FROM actividad_responsables
        WHERE (@idActividad IS NULL OR idActividad = @idActividad)
        AND (@idProfesor IS NULL OR idProfesor = @idProfesor)
        AND (@generacion IS NULL OR generacion = @generacion)
    END TRY
    BEGIN CATCH
        PRINT 'An error occurred: ' + ERROR_MESSAGE();
    END CATCH
END
GO
-- CREATE Procedure for updating data in the table
CREATE PROCEDURE sp_actividad_responsables_update
    @idActividad INT = NULL,
    @generacion INT = NULL,
    @idProfesor VARCHAR(10) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        UPDATE actividad_responsables
        SET generacion = COALESCE(@generacion, generacion),
            idProfesor = COALESCE(@idProfesor, idProfesor)
        WHERE idActividad = @idActividad
    END TRY
    BEGIN CATCH
        PRINT 'An error occurred: ' + ERROR_MESSAGE();
    END CATCH
END
GO
-- CREATE Procedure for deleting data from the table
CREATE PROCEDURE sp_actividad_responsables_delete
    @idActividad INT,
    @idProfesor VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        DELETE FROM actividad_responsables
        WHERE idActividad = @idActividad AND idProfesor = @idProfesor
    END TRY
    BEGIN CATCH
        PRINT 'An error occurred: ' + ERROR_MESSAGE();
    END CATCH
END
