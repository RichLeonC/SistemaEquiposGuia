-- CREATE
CREATE PROCEDURE [dbo].[InsertListaEstudiantes]
	@idArchivo INT,
	@cedulaPersonal INT,
	@excel VARCHAR(255),
	@fecha DATE
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		INSERT INTO [dbo].[listaEstudiantes] ([idArchivo], [cedulaPersonal], [excel], [fecha])
		VALUES (@idArchivo, @cedulaPersonal, @excel, @fecha);
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH
END
GO

-- READ
CREATE PROCEDURE [dbo].[GetListaEstudiantes]
	@cedulaPersonal INT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		SELECT [idArchivo], [cedulaPersonal], [excel], [fecha]
		FROM [dbo].[listaEstudiantes]
		WHERE [cedulaPersonal] = @cedulaPersonal;
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH
END
GO

-- UPDATE
CREATE PROCEDURE [dbo].[UpdateListaEstudiantes]
	@idArchivo INT = NULL,
	@cedulaPersonal INT = NULL,
	@excel VARCHAR(255) = NULL,
	@fecha DATE = NULL
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		UPDATE [dbo].[listaEstudiantes]
		SET [idArchivo] = ISNULL(@idArchivo, [idArchivo]),
			[excel] = ISNULL(@excel, [excel]),
			[fecha] = ISNULL(@fecha, [fecha])
		WHERE [cedulaPersonal] = ISNULL(@cedulaPersonal, [cedulaPersonal]);
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH
END
GO

-- DELETE
CREATE PROCEDURE [dbo].[DeleteListaEstudiantes]
	@cedulaPersonal INT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		DELETE FROM [dbo].[listaEstudiantes]
		WHERE [cedulaPersonal] = @cedulaPersonal;
	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE();
	END CATCH
END
GO