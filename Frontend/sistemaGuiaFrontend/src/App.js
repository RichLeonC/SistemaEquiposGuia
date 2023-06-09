

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation,useNavigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";

// Material Dashboard 2 React routes
import routesProfesor from "routesProfesor";
import routesAsistente from "routesAsistente";
import routesEstudiante from "routesEstudiante";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ResetP from "layouts/authentication/reset-password/cover";

export default function App(props) {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  const { pathname } = useLocation();

  const [rol,setRol] = useState(null);

  const navigate = useNavigate();

  const handleLogin=(rol)=>{
    setRol(rol);
  }

  const handleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("correo");
    localStorage.removeItem("rol");

    setRol(null);
    navigate("/");
  }

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>{
    if(!allRoutes) return null;
    return allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });
  }

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

    const mensajeRol = {
      "PROFESOR_GUIA":"PANEL PROFESORES GUIA",
      "ASISTENTE":"PANEL ASISTENTES",
      "ESTUDIANTE":"PANEL ESTUDIANTES"
    }
    const rutasRol={
      "PROFESOR_GUIA":routesProfesor,
      "ASISTENTE":routesAsistente,
      "ESTUDIANTE":routesEstudiante
    }

  return (
    <ThemeProvider theme={whiteSidenav ? themeDark : theme}>
    <CssBaseline />
    {rol ? (
    <>
    {layout === "dashboard" && (
      <>
        <Sidenav
          color={sidenavColor}
          brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
          brandName={mensajeRol[rol]}
          routes={(rutasRol[rol])}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onLogout={handleLogout}
        />
        <Configurator />
        {configsButton}
      </>
    )}
    {layout === "vr" && <Configurator />}
    <Routes>
      
     {getRoutes(rutasRol[rol]) }
      <Route path="/" element={<Navigate to="/perfil" />} />
      
    </Routes>
    </>
    ):(
      <>
      
      <Routes>
        <Route path="/" element={<SignIn onLogin={handleLogin}></SignIn>}></Route>
        <Route path="/recuperar" element={<SignUp></SignUp>} />
        <Route path="/verificacion" element={<ResetP></ResetP>} />
        
      </Routes>
      </>
    )}
  </ThemeProvider>
  );
}
