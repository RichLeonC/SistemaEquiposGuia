-- Create procedure
CREATE PROCEDURE [dbo].[estudiante_Create]
    @cedulaEstudiante int,
    @carne int,
    @codigoCarrera varchar(20),
    @idSede int,
    @generacion int = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        INSERT INTO [dbo].[estudiante] (cedulaEstudiante, carne, codigoCarrera, idSede, generacion)
        VALUES (@cedulaEstudiante, @carne, @codigoCarrera, @idSede, @generacion);
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred: ' + ERROR_MESSAGE();
    END CATCH
END;
GO

-- Read procedure
CREATE PROCEDURE [dbo].[estudiante_Read]
    @cedulaEstudiante int = NULL,
    @carne int = NULL,
    @codigoCarrera varchar(20) = NULL,
    @idSede int = NULL,
    @generacion int = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT * FROM [dbo].[estudiante]
        WHERE 
            (@cedulaEstudiante IS NULL OR cedulaEstudiante = @cedulaEstudiante) AND
            (@carne IS NULL OR carne = @carne) AND
            (@codigoCarrera IS NULL OR codigoCarrera = @codigoCarrera) AND
            (@idSede IS NULL OR idSede = @idSede) AND
            (@generacion IS NULL OR generacion = @generacion);
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred: ' + ERROR_MESSAGE();
    END CATCH
END;
GO

-- Update procedure
CREATE PROCEDURE [dbo].[estudiante_Update]
    @cedulaEstudiante int = NULL,
    @carne int = NULL,
    @codigoCarrera varchar(20) = NULL,
    @idSede int = NULL,
    @generacion int = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        UPDATE [dbo].[estudiante]
        SET 
            codigoCarrera = COALESCE(@codigoCarrera, codigoCarrera),
            idSede = COALESCE(@idSede, idSede),
            generacion = COALESCE(@generacion, generacion)
        WHERE 
            cedulaEstudiante = COALESCE(@cedulaEstudiante, cedulaEstudiante) AND
            carne = COALESCE(@carne, carne);
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred: ' + ERROR_MESSAGE();
    END CATCH
END;
GO

-- Delete procedure
CREATE PROCEDURE [dbo].[estudiante_Delete]
    @cedulaEstudiante int,
    @carne int
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        DELETE FROM [dbo].[estudiante]
        WHERE cedulaEstudiante = @cedulaEstudiante AND carne = @carne;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred: ' + ERROR_MESSAGE();
    END CATCH
END;
GO
