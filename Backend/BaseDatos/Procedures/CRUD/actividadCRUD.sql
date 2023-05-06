-- Create (INSERT) stored procedure
CREATE PROCEDURE [dbo].[InsertActividad]
(
	@tipoActividad int,
	@nombreActividad varchar(100),
	@semena int,
	@fechaInicio date,
	@horaInicio date,
	@fechaCreacion date,
	@modalidad int,
	@enlaceReunion varchar(255),
	@estadoActividad int
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO actividad
		(
			tipoActividad,
			nombreActividad,
			semena,
			fechaInicio,
			horaInicio,
			fechaCreacion,
			modalidad,
			enlaceReunion,
			estadoActiviad
		)
		VALUES
		(
			@tipoActividad,
			@nombreActividad,
			@semena,
			@fechaInicio,
			@horaInicio,
			@fechaCreacion,
			@modalidad,
			@enlaceReunion,
			@estadoActividad
		);
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH;
END
GO

-- Read (SELECT) stored procedure
CREATE PROCEDURE [dbo].[SelectActividad]
(
	@codigoActividad int
)
AS
BEGIN
	BEGIN TRY
		SELECT *
		FROM actividad
		WHERE codigoActividad = @codigoActividad;
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH;
END
GO

-- Update procedure
CREATE PROCEDURE [dbo].[UpdateActividad]
(
	@codigoActividad int,
	@tipoActividad int = NULL,
	@nombreActividad varchar(100) = NULL,
	@semena int = NULL,
	@fechaInicio date = NULL,
	@horaInicio date = NULL,
	@fechaCreacion date = NULL,
	@modalidad int = NULL,
	@enlaceReunion varchar(255) = NULL,
	@estadoActividad int = NULL
)
AS
BEGIN
	BEGIN TRY
		UPDATE actividad
		SET
			tipoActividad = ISNULL(@tipoActividad, tipoActividad),
			nombreActividad = ISNULL(@nombreActividad, nombreActividad),
			semena = ISNULL(@semena, semena),
			fechaInicio = ISNULL(@fechaInicio, fechaInicio),
			horaInicio = ISNULL(@horaInicio, horaInicio),
			fechaCreacion = ISNULL(@fechaCreacion, fechaCreacion),
			modalidad = ISNULL(@modalidad, modalidad),
			enlaceReunion = ISNULL(@enlaceReunion, enlaceReunion),
			estadoActiviad = ISNULL(@estadoActividad, estadoActiviad)
		WHERE codigoActividad = @codigoActividad;
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH;
END
GO


-- Delete (DELETE) stored procedure
CREATE PROCEDURE [dbo].[DeleteActividad]
(
	@codigoActividad int
)
AS
BEGIN
	BEGIN TRY
		DELETE FROM actividad
		WHERE codigoActividad = @codigoActividad;
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH;
END
GO
