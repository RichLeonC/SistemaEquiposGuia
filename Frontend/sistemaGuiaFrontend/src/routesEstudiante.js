import Icon from "@mui/material/Icon";
import Perfil from "layouts/Perfil";
import Calendar from 'components/Calendar';
import ChatApp from "components/ChatApp";
import Notificaciones from "components/Notificaciones";
const routesEstudiante=[

    {
        type: "collapse",
        name: "Perfil",
        key: "profile",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/perfil",
        component: <Perfil />,
      },

      {
        type: "collapse",
        name: "Actividades",
        key: "actividades",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/actividades",
        component: <Calendar/>,
      },
      {
        type: "collapse",
        name: "Gestion Mensajeria",
        key: "mensajeria",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/chat",
        component: <ChatApp/>,
      },
      {
        type: "collapse",
        name: "Notificaciones",
        key: "notificaciones",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/notificaciones",
        component: <Notificaciones/>,
      },

];

export default routesEstudiante;