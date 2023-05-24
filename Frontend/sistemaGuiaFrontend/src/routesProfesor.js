

import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import Calendar from 'components/Calendar';
import CommentSection from "components/ComentSection";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import ConsultarEstudiantes from "layouts/ProfesorPanel/ConsultarEstudiantes";
import Perfil from "layouts/Perfil";

const routesProfesor = [
  {
    type: "collapse",
    name: "Gestion Estudiantes",
    key: "estudiantes",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/estudiantes",
    component: <ConsultarEstudiantes/>,
  },
  {
    type: "collapse",
    name: "Gestion Actividades",
    key: "actividades",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/actividades",
    component: <Calendar/>,
  },
  // {
  //   type: "collapse",
  //   name: "Dashboard",
  //   key: "dashboard",
  //   icon: <Icon fontSize="small">dashboard</Icon>,
  //   route: "/dashboard",
  //   component: <Dashboard />,
  // },
  /*{
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },*/
  {
    type: "collapse",
    name: "Perfil",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/perfil",
    component: <Perfil />,
  },

];

export default routesProfesor;
