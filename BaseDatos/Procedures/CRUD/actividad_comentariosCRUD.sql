-- Create procedure for inserting into actividad_comentarios
CREATE PROCEDURE spInsertActividadComentario
    @idActividad int,
    @idComentario int,
    @idProfesor varchar(10),
    @mensaje varchar(250),
    @fecha date,
    @hora varchar(10) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        INSERT INTO actividad_comentarios(idActividad, idComentario, idProfesor, mensaje, fecha, hora)
        VALUES(@idActividad, @idComentario, @idProfesor, @mensaje, @fecha, @hora);
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH
END
GO

-- Create procedure for selecting from actividad_comentarios
CREATE PROCEDURE spSelectActividadComentario
    @idComentario int = NULL,
    @idActividad int = NULL,
    @idProfesor varchar(10) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT *
        FROM actividad_comentarios
        WHERE
            (@idComentario IS NULL OR idComentario = @idComentario)
            AND (@idActividad IS NULL OR idActividad = @idActividad)
            AND (@idProfesor IS NULL OR idProfesor = @idProfesor);
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH
END
GO

-- Create procedure for updating actividad_comentarios
CREATE PROCEDURE spUpdateActividadComentario
    @idActividad int = NULL,
    @idComentario int = NULL,
    @idProfesor varchar(10) = NULL,
    @mensaje varchar(250) = NULL,
    @fecha date = NULL,
    @hora varchar(10) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        UPDATE actividad_comentarios
        SET
            mensaje = COALESCE(@mensaje, mensaje),
            fecha = COALESCE(@fecha, fecha),
            hora = COALESCE(@hora, hora)
        WHERE
            idActividad = COALESCE(@idActividad, idActividad)
            AND idComentario = COALESCE(@idComentario, idComentario)
            AND idProfesor = COALESCE(@idProfesor, idProfesor);
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH
END
GO

-- Create procedure for deleting from actividad_comentarios
CREATE PROCEDURE spDeleteActividadComentario
    @idComentario int
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        DELETE FROM actividad_comentarios
        WHERE idComentario = @idComentario;
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH
END
GO
