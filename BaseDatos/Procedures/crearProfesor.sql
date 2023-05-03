CREATE PROCEDURE insertar_profesor
    @cedulaProfesor INT,
    @codigo VARCHAR(10),
    @esCordinador INT,

	@cedulaUsuario INT,
	@nombre VARCHAR(25),
	@segundonombre VARCHAR(25),
	@apellido1 VARCHAR(25),
	@apellido2 VARCHAR(25),
	@correo VARCHAR(100),
	@clave VARCHAR(100),
	@celular INT,
	@rol VARCHAR(20),

	@cedulaPersonal INT,
	@idSede INT,
	@telOficina INT,
	@foto VARCHAR(255)
AS
BEGIN
    BEGIN TRY
        INSERT INTO profesor (cedulaProfesor, codigo, esCordinador)
        VALUES (@cedulaProfesor, @codigo, @esCordinador)

		INSERT INTO [dbo].[usuario]([cedulaUsuario],[nombre],[segundonombre],
		[apellido1],[apellido2],[correo],[clave],[celular],[rol])
		VALUES (@cedulaUsuario,@nombre,@segundonombre,
		@apellido1,@apellido2,@correo,@clave,@celular,@rol)

		INSERT INTO [dbo].[personal]([cedulaPersonal], [idSede], [telOficina], [foto])
		VALUES(@cedulaPersonal, @idSede, @telOficina, @foto)

    END TRY
    BEGIN CATCH
        DECLARE @errMsg VARCHAR(200) = ERROR_MESSAGE();
		THROW 50001, @errMsg, 1;
    END CATCH
END
GO