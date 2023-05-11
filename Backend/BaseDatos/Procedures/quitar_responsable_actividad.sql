CREATE OR ALTER PROCEDURE quitar_responsable_actividad
	@idActividad int
	,@idProfesor varchar(10)

AS
BEGIN
	
	DECLARE @count INT;
	SELECT @count = COUNT(*)
					FROM [dbo].[actividad_responsables]
					WHERE @idActividad = idActividad
					AND @idProfesor = idProfesor;

	IF @count > 1
	BEGIN
		BEGIN TRY

		DELETE FROM [dbo].[actividad_responsables]
		WHERE @idActividad = idActividad
			AND @idProfesor = idProfesor;

		END TRY

		BEGIN CATCH
			PRINT ERROR_MESSAGE();
		END CATCH;
	END

	ELSE
	BEGIN
		PRINT 'No se pueden quitar responsables de la tabla pues solo queda 1 \n De quitarlo la actividad quedaria sin responsables \n Agrega otro responsable antes de eliminar este'
	END

END
GO


