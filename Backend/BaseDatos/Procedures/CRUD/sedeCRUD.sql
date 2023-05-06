-- CREATE
CREATE PROCEDURE dbo.sede_create
    @idSede INT,
    @nombreSede VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        INSERT INTO dbo.sede (idSede, nombreSede)
        VALUES (@idSede, @nombreSede);
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- READ ALL
CREATE PROCEDURE dbo.sede_readAll
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT idSede, nombreSede
        FROM dbo.sede;
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- READ ONE
CREATE PROCEDURE dbo.sede_readOne
    @idSede INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT idSede, nombreSede
        FROM dbo.sede
        WHERE idSede = @idSede;
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- UPDATE
CREATE PROCEDURE dbo.sede_update
    @idSede INT = NULL,
    @nombreSede VARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        UPDATE dbo.sede
        SET nombreSede = ISNULL(@nombreSede, nombreSede)
        WHERE idSede = ISNULL(@idSede, idSede);
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- DELETE
CREATE PROCEDURE dbo.sede_delete
    @idSede INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        DELETE FROM dbo.sede
        WHERE idSede = @idSede;
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO