CREATE OR ALTER PROCEDURE cancelar_actividad
	@idActividad int
	,@observacion varchar(500) 
	,@fecha date
AS
BEGIN
	BEGIN TRY
		-- The activity is stored as canceled in the table actividad_cancelada
		INSERT INTO [dbo].[actividad_cancelada]
				   ([idActividad]
				   ,[observacion]
				   ,[fecha])
			 VALUES
				   (@idActividad 
				   ,@observacion
				   ,@fecha);

		-- The activity is not deleted to keep history, instead it is modified with a flag 
		UPDATE [dbo].[actividad]
		   SET [estadoActiviad] = 0
		 WHERE @idActividad = codigoActividad;

		-- All the things related to the activity that do not make self with the activity are deleted
		DELETE FROM [dbo].[actividad_afiche] 
		WHERE @idActividad = idActividad;

		DELETE FROM [dbo].[actividad_recordatorio] 
		WHERE @idActividad = idActividad;

		-- It may be necessary a register of the responsibles to ask what happened, or the commentaries may be needed to check the conversation. So are not deleted
		-- Evidence does not exist by this point, if it is canceled, it never occured

	END TRY

	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH;

END
GO


