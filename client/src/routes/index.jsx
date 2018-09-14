import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Login from "views/Auth/Login.jsx";
import Logout from "views/Auth/Logout.jsx";

const indexRoutes = [
  { path: "/login", component: Login},
  { path: "/logout", component: Logout},
  { path: "/", component: Dashboard }
];

export default indexRoutes;
