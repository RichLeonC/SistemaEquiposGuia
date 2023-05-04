<<<<<<< refs/remotes/origin/main
<<<<<<< refs/remotes/origin/main
CREATE OR ALTER PROCEDURE crear_profesor
    @cedulaProfesor INT,
    @codigo VARCHAR(10),
    @esCordinador INT = 0,

	@nombre VARCHAR(25),
	@segundonombre VARCHAR(25) = NULL,
	@apellido1 VARCHAR(25),
	@apellido2 VARCHAR(25) = NULL,
	@correo VARCHAR(100),
	@clave VARCHAR(100),
	@celular INT,
	@rol VARCHAR(20) = 'Profesor',

	@idSede INT,
	@telOficina INT = NULL,
	@foto VARCHAR(255) = NULL
AS
BEGIN
    BEGIN TRY
		
		INSERT INTO [dbo].[usuario]([cedulaUsuario],[nombre],[segundonombre],
		[apellido1],[apellido2],[correo],[clave],[celular],[rol])
		VALUES (@cedulaProfesor,@nombre,@segundonombre,
		@apellido1,@apellido2,@correo,@clave,@celular,@rol)
		
		INSERT INTO [dbo].[personal]([cedulaPersonal], [idSede], [telOficina], [foto])
		VALUES(@cedulaProfesor, @idSede, @telOficina, @foto)

        INSERT INTO profesor (cedulaProfesor, codigo, esCordinador)
        VALUES (@cedulaProfesor, @codigo, @esCordinador)


    END TRY
    BEGIN CATCH
        PRINT 'Ocurrio un error: ' + ERROR_MESSAGE()
=======
CREATE PROCEDURE insertar_profesor
=======
CREATE OR ALTER PROCEDURE crear_profesor
>>>>>>> CRUD y Crear profesor
    @cedulaProfesor INT,
    @codigo VARCHAR(10),
    @esCordinador INT = 0,

	@nombre VARCHAR(25),
	@segundonombre VARCHAR(25) = NULL,
	@apellido1 VARCHAR(25),
	@apellido2 VARCHAR(25) = NULL,
	@correo VARCHAR(100),
	@clave VARCHAR(100),
	@celular INT,
	@rol VARCHAR(20) = 'Profesor',

	@idSede INT,
	@telOficina INT = NULL,
	@foto VARCHAR(255) = NULL
AS
BEGIN
    BEGIN TRY
		
		INSERT INTO [dbo].[usuario]([cedulaUsuario],[nombre],[segundonombre],
		[apellido1],[apellido2],[correo],[clave],[celular],[rol])
		VALUES (@cedulaProfesor,@nombre,@segundonombre,
		@apellido1,@apellido2,@correo,@clave,@celular,@rol)
		
		INSERT INTO [dbo].[personal]([cedulaPersonal], [idSede], [telOficina], [foto])
		VALUES(@cedulaProfesor, @idSede, @telOficina, @foto)

        INSERT INTO profesor (cedulaProfesor, codigo, esCordinador)
        VALUES (@cedulaProfesor, @codigo, @esCordinador)


    END TRY
    BEGIN CATCH
<<<<<<< refs/remotes/origin/main
        DECLARE @errMsg VARCHAR(200) = ERROR_MESSAGE();
		THROW 50001, @errMsg, 1;
>>>>>>> Procedure Crear Profesores
=======
        PRINT 'Ocurrio un error: ' + ERROR_MESSAGE()
>>>>>>> CRUD y Crear profesor
    END CATCH
END
GO