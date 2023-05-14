CREATE OR ALTER PROCEDURE crearEstudiante
	@cedulaUsuario int
	, @nombre varchar(25)
	, @segundonombre varchar(25)
	, @apellido1 varchar(25)
	, @apellido2 varchar(25)
	, @correo varchar(100)
	, @clave varchar(100)
	, @celular int
	, @rol varchar(20)

	, @carne int
	, @codigoCarrera varchar(20)
	, @idSede int
	, @generacion int

AS
BEGIN
	

	BEGIN TRY
		
		EXEC  [dbo].[InsertUsuario] 
		   @cedulaUsuario
		  ,@nombre
		  ,@segundonombre
		  ,@apellido1
		  ,@apellido2
		  ,@correo
		  ,@clave
		  ,@celular
		  ,@rol
		GO

		EXEC [dbo].[InsertEstudiante] 
	       @cedulaUsuario
		  ,@carne
		  ,@codigoCarrera
		  ,@idSede
		  ,@generacion
	    GO

	END TRY

	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH;


END
GO


