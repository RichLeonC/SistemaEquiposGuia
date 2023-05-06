-- Create (INSERT) stored procedure
CREATE PROCEDURE [dbo].[InsertActividadComentarioRespuesta]
(
    @idActividad int,
    @idComentario int,
    @mensaje varchar(250),
    @fecha date,
    @hora varchar(10) = NULL
)
AS
BEGIN
    BEGIN TRY
        INSERT INTO actividad_comentario_respuesta (idActividad, idComentario, mensaje, fecha, hora)
        VALUES (@idActividad, @idComentario, @mensaje, @fecha, @hora);
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH;
END
GO

-- Read (SELECT) stored procedure
CREATE PROCEDURE [dbo].[GetActividadComentarioRespuesta]
(
    @idActividad int = NULL,
    @idComentarioRespuesta int = NULL,
    @idComentario int = NULL
)
AS
BEGIN
    BEGIN TRY
        SELECT * FROM actividad_comentario_respuesta
        WHERE (@idActividad IS NULL OR idActividad = @idActividad)
        AND (@idComentarioRespuesta IS NULL OR idComentarioRespuesta = @idComentarioRespuesta)
        AND (@idComentario IS NULL OR idComentario = @idComentario);
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH;
END
GO

-- Update (UPDATE) stored procedure
CREATE PROCEDURE [dbo].[UpdateActividadComentarioRespuesta]
(
    @idActividad int = NULL,
    @idComentarioRespuesta int = NULL,
    @idComentario int = NULL,
    @mensaje varchar(250) = NULL,
    @fecha date = NULL,
    @hora varchar(10) = NULL
)
AS
BEGIN
    BEGIN TRY
        UPDATE actividad_comentario_respuesta
        SET
            idActividad = ISNULL(@idActividad, idActividad),
            idComentario = ISNULL(@idComentario, idComentario),
            mensaje = ISNULL(@mensaje, mensaje),
            fecha = ISNULL(@fecha, fecha),
            hora = ISNULL(@hora, hora)
        WHERE idComentarioRespuesta = @idComentarioRespuesta;
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH;
END
GO

-- Delete (DELETE) stored procedure
CREATE PROCEDURE [dbo].[DeleteActividadComentarioRespuesta]
(
    @idComentarioRespuesta int
)
AS
BEGIN
    BEGIN TRY
        DELETE FROM actividad_comentario_respuesta
        WHERE idComentarioRespuesta = @idComentarioRespuesta;
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH;
END
GO
