CREATE OR ALTER PROCEDURE crear_nueva_actividad
    @codigoActividad int
    ,@tipoActividad int
    ,@nombreActividad varchar(100)
    ,@semena int
    ,@fechaInicio date = NULL
    ,@horaInicio date = NULL
    ,@fechaCreacion date = NULL
    ,@modalidad int
    ,@enlaceReunion varchar(255) = NULL
    ,@estadoActiviad int = 1
AS
BEGIN
	BEGIN TRY
		IF @fechaCreacion = NULL
		BEGIN
			SET @fechaCreacion = CAST(GETDATE() AS DATE)
		END

		INSERT INTO [dbo].[actividad]
			   ([codigoActividad]
			   ,[tipoActividad]
			   ,[nombreActividad]
			   ,[semena]
			   ,[fechaInicio]
			   ,[horaInicio]
			   ,[fechaCreacion]
			   ,[modalidad]
			   ,[enlaceReunion]
			   ,[estadoActiviad])
		 VALUES
			   (@codigoActividad
			   ,@tipoActividad
			   ,@nombreActividad
			   ,@semena
			   ,@fechaInicio
			   ,@horaInicio
			   ,@fechaCreacion
			   ,@modalidad
			   ,@enlaceReunion
			   ,@estadoActiviad)
	END TRY

	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH;

END
GO



