-- Create (INSERT) stored procedure
CREATE PROCEDURE [dbo].[InsertActividadCancelada]
(
	@idActividad int,
	@observacion varchar(500) = NULL,
	@fecha date = NULL
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO actividad_cancelada (idActividad, observacion, fecha)
		VALUES (@idActividad, @observacion, @fecha);
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH;
END
GO

-- Read (SELECT) stored procedure
CREATE PROCEDURE [dbo].[SelectActividadCancelada]
(
	@idActividad int
)
AS
BEGIN
	BEGIN TRY
		SELECT idActividad, observacion, fecha
		FROM actividad_cancelada
		WHERE idActividad = @idActividad;
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH;
END
GO

-- Update (UPDATE) stored procedure
CREATE PROCEDURE [dbo].[UpdateActividadCancelada]
(
	@idActividad int,
	@observacion varchar(500) = NULL,
	@fecha date = NULL
)
AS
BEGIN
	BEGIN TRY
		UPDATE actividad_cancelada
		SET observacion = COALESCE(@observacion, observacion),
			fecha = COALESCE(@fecha, fecha)
		WHERE idActividad = @idActividad;
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH;
END
GO

-- Delete (DELETE) stored procedure
CREATE PROCEDURE [dbo].[DeleteActividadCancelada]
(
	@idActividad int
)
AS
BEGIN
	BEGIN TRY
		DELETE FROM actividad_cancelada
		WHERE idActividad = @idActividad;
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH;
END
GO



