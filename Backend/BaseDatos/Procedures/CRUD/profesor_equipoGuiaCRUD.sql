-- CREATE PROCEDURE for inserting a new record
CREATE PROCEDURE insertProfesorEquipoGuia 
    @generacion int,
    @idProfesor varchar(10)
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        INSERT INTO [dbo].[profesor_equipoGuia] ([generacion], [idProfesor])
        VALUES (@generacion, @idProfesor);
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred: ' + ERROR_MESSAGE();
    END CATCH
END
GO

-- CREATE PROCEDURE for selecting all records
CREATE PROCEDURE selectAllProfesorEquipoGuia
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        SELECT * FROM [dbo].[profesor_equipoGuia];
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred: ' + ERROR_MESSAGE();
    END CATCH
END
GO

-- CREATE PROCEDURE for selecting a single record by id
CREATE PROCEDURE selectProfesorEquipoGuiaById
    @generacion int,
    @idProfesor varchar(10)
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        SELECT * FROM [dbo].[profesor_equipoGuia]
        WHERE [generacion] = @generacion AND [idProfesor] = @idProfesor;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred: ' + ERROR_MESSAGE();
    END CATCH
END
GO

-- CREATE PROCEDURE for updating a record by id
CREATE PROCEDURE updateProfesorEquipoGuiaById
    @generacion int = NULL,
    @idProfesor varchar(10) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        UPDATE [dbo].[profesor_equipoGuia]
        SET [generacion] = COALESCE(@generacion, [generacion]),
            [idProfesor] = COALESCE(@idProfesor, [idProfesor]);
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred: ' + ERROR_MESSAGE();
    END CATCH
END
GO

-- CREATE PROCEDURE for deleting a record by id
CREATE PROCEDURE deleteProfesorEquipoGuiaById
    @generacion int,
    @idProfesor varchar(10)
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        DELETE FROM [dbo].[profesor_equipoGuia]
        WHERE [generacion] = @generacion AND [idProfesor] = @idProfesor;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred: ' + ERROR_MESSAGE();
    END CATCH
END
GO
