USE [master]
GO
/****** Object:  Database [SistemaProfesores]    Script Date: 3/5/2023 15:27:47 ******/
CREATE DATABASE [SistemaProfesores]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SistemaProfesores', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\SistemaProfesores.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SistemaProfesores_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\SistemaProfesores_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [SistemaProfesores] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SistemaProfesores].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SistemaProfesores] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SistemaProfesores] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SistemaProfesores] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SistemaProfesores] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SistemaProfesores] SET ARITHABORT OFF 
GO
ALTER DATABASE [SistemaProfesores] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SistemaProfesores] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SistemaProfesores] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SistemaProfesores] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SistemaProfesores] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SistemaProfesores] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SistemaProfesores] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SistemaProfesores] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SistemaProfesores] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SistemaProfesores] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SistemaProfesores] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SistemaProfesores] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SistemaProfesores] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SistemaProfesores] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SistemaProfesores] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SistemaProfesores] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SistemaProfesores] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SistemaProfesores] SET RECOVERY FULL 
GO
ALTER DATABASE [SistemaProfesores] SET  MULTI_USER 
GO
ALTER DATABASE [SistemaProfesores] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SistemaProfesores] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SistemaProfesores] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SistemaProfesores] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SistemaProfesores] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SistemaProfesores] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'SistemaProfesores', N'ON'
GO
ALTER DATABASE [SistemaProfesores] SET QUERY_STORE = OFF
GO
USE [SistemaProfesores]
GO
/****** Object:  PartitionFunction [pf_ParticionPorAnno]    Script Date: 3/5/2023 15:27:47 ******/
CREATE PARTITION FUNCTION [pf_ParticionPorAnno](datetime) AS RANGE RIGHT FOR VALUES (N'2021-01-01T00:00:00.000', N'2022-01-01T00:00:00.000', N'2023-01-01T00:00:00.000')
GO
/****** Object:  PartitionScheme [ps_ParticionPorAnno]    Script Date: 3/5/2023 15:27:47 ******/
CREATE PARTITION SCHEME [ps_ParticionPorAnno] AS PARTITION [pf_ParticionPorAnno] TO ([PRIMARY], [PRIMARY], [PRIMARY], [PRIMARY], [PRIMARY])
GO
/****** Object:  Table [dbo].[actividad]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[actividad](
	[codigoActividad] [int] NOT NULL,
	[tipoActividad] [int] NOT NULL,
	[nombreActividad] [varchar](100) NOT NULL,
	[semena] [int] NOT NULL,
	[fechaInicio] [date] NULL,
	[horaInicio] [date] NULL,
	[fechaCreacion] [date] NULL,
	[modalidad] [int] NOT NULL,
	[enlaceReunion] [varchar](255) NULL,
	[estadoActiviad] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[codigoActividad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[actividad_afiche]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[actividad_afiche](
	[idActividad] [int] NOT NULL,
	[idAfiche] [int] NOT NULL,
	[descripcion] [varchar](400) NULL,
	[enlace] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[idActividad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[idAfiche] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[actividad_cancelada]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[actividad_cancelada](
	[idActividad] [int] NOT NULL,
	[observacion] [varchar](500) NULL,
	[fecha] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[idActividad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[actividad_comentario_respuesta]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[actividad_comentario_respuesta](
	[idActividad] [int] NOT NULL,
	[idComentarioRespuesta] [int] NOT NULL,
	[idComentario] [int] NOT NULL,
	[mensaje] [varchar](250) NOT NULL,
	[fecha] [date] NOT NULL,
	[hora] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[idComentarioRespuesta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[idActividad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[idComentario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[actividad_comentarios]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[actividad_comentarios](
	[idActividad] [int] NOT NULL,
	[idComentario] [int] NOT NULL,
	[idProfesor] [varchar](10) NOT NULL,
	[mensaje] [varchar](250) NOT NULL,
	[fecha] [date] NOT NULL,
	[hora] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[idComentario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[idActividad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[idProfesor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[actividad_evidencia_asistencia]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[actividad_evidencia_asistencia](
	[idActividad] [int] NOT NULL,
	[idImagen] [varchar](100) NULL,
	[imgAsistencia] [varchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[idActividad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[idImagen] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[actividad_evidencia_participante]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[actividad_evidencia_participante](
	[idActividad] [int] NOT NULL,
	[idImagen] [varchar](100) NULL,
	[imgParticipantes] [varchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[idActividad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[idImagen] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[actividad_recordatorio]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[actividad_recordatorio](
	[idActividad] [int] NOT NULL,
	[fecha] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[idActividad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[actividad_responsables]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[actividad_responsables](
	[idActividad] [int] NOT NULL,
	[generacion] [int] NOT NULL,
	[idProfesor] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idActividad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[idProfesor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[generacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[carrera]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[carrera](
	[codigoCarrera] [varchar](20) NOT NULL,
	[idSede] [int] NOT NULL,
	[nombreCarrera] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[codigoCarrera] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[idSede] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[equipoGuia]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[equipoGuia](
	[generacion] [int] NOT NULL,
	[idCoordinador] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[generacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[estudiante]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[estudiante](
	[cedulaEstudiante] [int] NOT NULL,
	[carne] [int] NOT NULL,
	[codigoCarrera] [varchar](20) NOT NULL,
	[idSede] [int] NOT NULL,
	[generacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[carne] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[cedulaEstudiante] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[listaEstudiantes]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[listaEstudiantes](
	[idArchivo] [int] NOT NULL,
	[cedulaPersonal] [int] NOT NULL,
	[excel] [varchar](255) NULL,
	[fecha] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[idArchivo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[cedulaPersonal] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[personal]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[personal](
	[cedulaPersonal] [int] NOT NULL,
	[idSede] [int] NOT NULL,
	[telOficina] [int] NULL,
	[foto] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[cedulaPersonal] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[profesor]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[profesor](
	[cedulaProfesor] [int] NOT NULL,
	[codigo] [varchar](10) NOT NULL,
	[esCordinador] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[cedulaProfesor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[profesor_equipoGuia]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[profesor_equipoGuia](
	[generacion] [int] NOT NULL,
	[idProfesor] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[generacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[idProfesor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sede]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sede](
	[idSede] [int] NOT NULL,
	[nombreSede] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idSede] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuario]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuario](
	[cedulaUsuario] [int] NOT NULL,
	[nombre] [varchar](25) NOT NULL,
	[segundonombre] [varchar](25) NULL,
	[apellido1] [varchar](25) NOT NULL,
	[apellido2] [varchar](25) NULL,
	[correo] [varchar](100) NOT NULL,
	[clave] [varchar](100) NOT NULL,
	[celular] [int] NOT NULL,
	[rol] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[cedulaUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[actividad_afiche]  WITH CHECK ADD FOREIGN KEY([idActividad])
REFERENCES [dbo].[actividad] ([codigoActividad])
GO
ALTER TABLE [dbo].[actividad_cancelada]  WITH CHECK ADD FOREIGN KEY([idActividad])
REFERENCES [dbo].[actividad] ([codigoActividad])
GO
ALTER TABLE [dbo].[actividad_comentario_respuesta]  WITH CHECK ADD FOREIGN KEY([idActividad])
REFERENCES [dbo].[actividad] ([codigoActividad])
GO
ALTER TABLE [dbo].[actividad_comentario_respuesta]  WITH CHECK ADD FOREIGN KEY([idComentario])
REFERENCES [dbo].[actividad_comentarios] ([idComentario])
GO
ALTER TABLE [dbo].[actividad_comentarios]  WITH CHECK ADD FOREIGN KEY([idActividad])
REFERENCES [dbo].[actividad] ([codigoActividad])
GO
ALTER TABLE [dbo].[actividad_comentarios]  WITH CHECK ADD FOREIGN KEY([idProfesor])
REFERENCES [dbo].[profesor] ([codigo])
GO
ALTER TABLE [dbo].[actividad_evidencia_asistencia]  WITH CHECK ADD FOREIGN KEY([idActividad])
REFERENCES [dbo].[actividad] ([codigoActividad])
GO
ALTER TABLE [dbo].[actividad_evidencia_participante]  WITH CHECK ADD FOREIGN KEY([idActividad])
REFERENCES [dbo].[actividad] ([codigoActividad])
GO
ALTER TABLE [dbo].[actividad_recordatorio]  WITH CHECK ADD FOREIGN KEY([idActividad])
REFERENCES [dbo].[actividad] ([codigoActividad])
GO
ALTER TABLE [dbo].[actividad_responsables]  WITH CHECK ADD FOREIGN KEY([generacion])
REFERENCES [dbo].[profesor_equipoGuia] ([generacion])
GO
ALTER TABLE [dbo].[actividad_responsables]  WITH CHECK ADD FOREIGN KEY([idProfesor])
REFERENCES [dbo].[profesor] ([codigo])
GO
ALTER TABLE [dbo].[carrera]  WITH CHECK ADD FOREIGN KEY([idSede])
REFERENCES [dbo].[sede] ([idSede])
GO
ALTER TABLE [dbo].[equipoGuia]  WITH CHECK ADD FOREIGN KEY([idCoordinador])
REFERENCES [dbo].[profesor] ([cedulaProfesor])
GO
ALTER TABLE [dbo].[estudiante]  WITH CHECK ADD FOREIGN KEY([cedulaEstudiante])
REFERENCES [dbo].[usuario] ([cedulaUsuario])
GO
ALTER TABLE [dbo].[estudiante]  WITH CHECK ADD FOREIGN KEY([codigoCarrera])
REFERENCES [dbo].[carrera] ([codigoCarrera])
GO
ALTER TABLE [dbo].[estudiante]  WITH CHECK ADD FOREIGN KEY([idSede])
REFERENCES [dbo].[carrera] ([idSede])
GO
ALTER TABLE [dbo].[listaEstudiantes]  WITH CHECK ADD FOREIGN KEY([cedulaPersonal])
REFERENCES [dbo].[personal] ([cedulaPersonal])
GO
ALTER TABLE [dbo].[personal]  WITH CHECK ADD FOREIGN KEY([cedulaPersonal])
REFERENCES [dbo].[usuario] ([cedulaUsuario])
GO
ALTER TABLE [dbo].[personal]  WITH CHECK ADD FOREIGN KEY([idSede])
REFERENCES [dbo].[sede] ([idSede])
GO
ALTER TABLE [dbo].[profesor]  WITH CHECK ADD FOREIGN KEY([cedulaProfesor])
REFERENCES [dbo].[personal] ([cedulaPersonal])
GO
ALTER TABLE [dbo].[profesor_equipoGuia]  WITH CHECK ADD FOREIGN KEY([generacion])
REFERENCES [dbo].[equipoGuia] ([generacion])
GO
ALTER TABLE [dbo].[profesor_equipoGuia]  WITH CHECK ADD FOREIGN KEY([idProfesor])
REFERENCES [dbo].[profesor] ([codigo])
GO
/****** Object:  StoredProcedure [dbo].[insertar_profesor]    Script Date: 3/5/2023 15:27:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[insertar_profesor]
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
        PRINT 'Ocurrio un error: ' + ERROR_MESSAGE();
    END CATCH
END
GO
USE [master]
GO
ALTER DATABASE [SistemaProfesores] SET  READ_WRITE 
GO
