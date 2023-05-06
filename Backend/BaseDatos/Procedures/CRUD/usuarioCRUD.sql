-- Create
CREATE PROCEDURE usp_CreateUsuario
	@cedulaUsuario int,
	@nombre varchar(25),
	@segundonombre varchar(25) = NULL,
	@apellido1 varchar(25),
	@apellido2 varchar(25) = NULL,
	@correo varchar(100),
	@clave varchar(100),
	@celular int,
	@rol varchar(20)
AS
BEGIN
	BEGIN TRY
		INSERT INTO dbo.usuario (cedulaUsuario, nombre, segundonombre, apellido1, apellido2, correo, clave, celular, rol)
		VALUES (@cedulaUsuario, @nombre, @segundonombre, @apellido1, @apellido2, @correo, @clave, @celular, @rol)
	END TRY
	BEGIN CATCH
		PRINT 'Error occurred: ' + ERROR_MESSAGE()
	END CATCH
END
GO

-- Read
CREATE PROCEDURE usp_GetUsuario
	@cedulaUsuario int
AS
BEGIN
	BEGIN TRY
		SELECT * FROM dbo.usuario WHERE cedulaUsuario = @cedulaUsuario
	END TRY
	BEGIN CATCH
		PRINT 'Error occurred: ' + ERROR_MESSAGE()
	END CATCH
END
GO

-- Update
CREATE PROCEDURE usp_UpdateUsuario
	@cedulaUsuario int = NULL,
	@nombre varchar(25) = NULL,
	@segundonombre varchar(25) = NULL,
	@apellido1 varchar(25) = NULL,
	@apellido2 varchar(25) = NULL,
	@correo varchar(100) = NULL,
	@clave varchar(100) = NULL,
	@celular int = NULL,
	@rol varchar(20) = NULL
AS
BEGIN
	BEGIN TRY
		UPDATE dbo.usuario
		SET
			nombre = ISNULL(@nombre, nombre),
			segundonombre = @segundonombre,
			apellido1 = ISNULL(@apellido1, apellido1),
			apellido2 = @apellido2,
			correo = ISNULL(@correo, correo),
			clave = ISNULL(@clave, clave),
			celular = ISNULL(@celular, celular),
			rol = ISNULL(@rol, rol)
		WHERE cedulaUsuario = @cedulaUsuario
	END TRY
	BEGIN CATCH
		PRINT 'Error occurred: ' + ERROR_MESSAGE()
	END CATCH
END
GO

-- Delete
CREATE PROCEDURE usp_DeleteUsuario
	@cedulaUsuario int
AS
BEGIN
	BEGIN TRY
		DELETE FROM dbo.usuario WHERE cedulaUsuario = @cedulaUsuario
	END TRY
	BEGIN CATCH
		PRINT 'Error occurred: ' + ERROR_MESSAGE()
	END CATCH
END
GO