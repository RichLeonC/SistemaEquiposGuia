-- Create (INSERT) stored procedure
CREATE PROCEDURE [dbo].[InsertActividadAfiche]
(
	@idActividad int,
	@idAfiche int,
	@descripcion varchar(400) = NULL,
	@enlace varchar(50) = NULL
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO actividad_afiche (idActividad, idAfiche, descripcion, enlace)
		VALUES (@idActividad, @idAfiche, @descripcion, @enlace);
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH;
END
GO

-- Read (SELECT) stored procedure
CREATE PROCEDURE [dbo].[SelectActividadAfiche]
(
	@idActividad int
)
AS
BEGIN
	BEGIN TRY
		SELECT idActividad, idAfiche, descripcion, enlace
		FROM actividad_afiche
		WHERE idActividad = @idActividad;
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH;
END
GO

-- Update (UPDATE) stored procedure
CREATE PROCEDURE [dbo].[UpdateActividadAfiche]
(
	@idActividad int,
	@idAfiche int,
	@descripcion varchar(400) = NULL,
	@enlace varchar(50) = NULL
)
AS
BEGIN
	BEGIN TRY
		UPDATE actividad_afiche
		SET descripcion = ISNULL(@descripcion, descripcion),
			enlace = ISNULL(@enlace, enlace)
		WHERE idActividad = @idActividad AND idAfiche = @idAfiche;
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH;
END
GO

-- Delete (DELETE) stored procedure
CREATE PROCEDURE [dbo].[DeleteActividadAfiche]
(
	@idActividad int,
	@idAfiche int
)
AS
BEGIN
	BEGIN TRY
		DELETE FROM actividad_afiche
		WHERE idActividad = @idActividad AND idAfiche = @idAfiche;
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH;
END
GO
