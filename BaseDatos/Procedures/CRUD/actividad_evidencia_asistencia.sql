-- Create
CREATE PROCEDURE [dbo].[actividad_evidencia_asistencia_create]
    @idActividad INT,
    @idImagen VARCHAR(100) = NULL,
    @imgAsistencia VARCHAR(200) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        INSERT INTO [dbo].[actividad_evidencia_asistencia] ([idActividad], [idImagen], [imgAsistencia])
        VALUES (@idActividad, @idImagen, @imgAsistencia)
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE()
    END CATCH
END
GO

-- Read
CREATE PROCEDURE [dbo].[actividad_evidencia_asistencia_read]
    @idActividad INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT [idActividad], [idImagen], [imgAsistencia]
        FROM [dbo].[actividad_evidencia_asistencia]
        WHERE [idActividad] = @idActividad
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE()
    END CATCH
END
GO

-- Update
CREATE PROCEDURE [dbo].[actividad_evidencia_asistencia_update]
    @idActividad INT = NULL,
    @idImagen VARCHAR(100) = NULL,
    @imgAsistencia VARCHAR(200) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        UPDATE [dbo].[actividad_evidencia_asistencia]
        SET [idImagen] = ISNULL(@idImagen, [idImagen]),
            [imgAsistencia] = ISNULL(@imgAsistencia, [imgAsistencia])
        WHERE [idActividad] = ISNULL(@idActividad, [idActividad])
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE()
    END CATCH
END
GO

-- Delete
CREATE PROCEDURE [dbo].[actividad_evidencia_asistencia_delete]
    @idActividad INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        DELETE FROM [dbo].[actividad_evidencia_asistencia]
        WHERE [idActividad] = @idActividad
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE()
    END CATCH
END
GO