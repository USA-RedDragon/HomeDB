// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People";
import Logout from "@material-ui/icons/ExitToApp";
import Settings from "@material-ui/icons/Settings";
import Bank from "@material-ui/icons/AccountBalance"
import Money from "@material-ui/icons/AttachMoney";

// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import LogoutPage from "views/Auth/Logout.jsx";
import ViewTransactionPage from "views/Transactions/ViewTransaction.jsx";
import ViewAccountPage from "views/Accounts/ViewAccount.jsx";
import TransactionsPage from "views/Transactions/Transactions.jsx";
import UsersPage from "views/Users/Users.jsx";
import EditUserPage from "views/EditUser/EditUser.jsx";
import SettingsPage from "views/Settings/Settings.jsx";
import AccountsPage from "../views/Accounts/Accounts.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  { 
    path: "/transaction/:id?", 
    hideSidebar: true,
    sidebarName: "View Transaction",
    navbarName: "View Transaction",
    component: ViewTransactionPage
  },
  { 
    path: "/account/:id?", 
    hideSidebar: true,
    sidebarName: "View Accounts",
    navbarName: "View Accounts",
    component: ViewAccountPage
  },
  {
    path: "/accounts",
    sidebarName: "Bank Accounts",
    navbarName: "Bank Accounts",
    icon: Bank,
    component: AccountsPage
  },
  {
    path: "/transactions",
    sidebarName: "Transactions",
    navbarName: "Transactions",
    icon: Money,
    component: TransactionsPage
  },
  {
    adminOnly: true,
    path: "/users",
    sidebarName: "Users",
    navbarName: "Users",
    icon: People,
    component: UsersPage
  },
  {
    path: "/user/:id?",
    hideSidebar: true,
    sidebarName: "Edit User",
    navbarName: "Edit User",
    component: EditUserPage
  },
  {
    path: "/profile",
    sidebarName: "My Account",
    navbarName: "My Account",
    icon: Person,
    component: UserProfile
  },
  {
    path: "/settings",
    sidebarName: "Settings",
    navbarName: "Settings",
    icon: Settings,
    component: SettingsPage
  },
  {
    path: "/logout",
    sidebarName: "Logout",
    navbarName: "Logout",
    icon: Logout,
    component: LogoutPage
  },
  { redirect: true, path: "/", to: "/login", navbarName: "Redirect" }
];

export default dashboardRoutes;
