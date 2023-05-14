CREATE OR ALTER PROCEDURE agregar_responsable_actividad
	@idActividad int
	,@generacion int
	,@idProfesor varchar(10)

AS
BEGIN
	BEGIN TRY
		INSERT INTO [dbo].[actividad_responsables]
			   ([idActividad]
			   ,[generacion]
			   ,[idProfesor])
		 VALUES
			   (@idActividad
			   ,@generacion
			   ,@idProfesor)

	END TRY

	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH;

END
GO


