// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People";
import Logout from "@material-ui/icons/ExitToApp";
import Settings from "@material-ui/icons/Settings";
import Bank from "@material-ui/icons/AccountBalance"
import Money from "@material-ui/icons/AttachMoney";
import NoMoney from "@material-ui/icons/MoneyOff";
import Cart from "@material-ui/icons/ShoppingCart";

// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import LogoutPage from "views/Auth/Logout.jsx";

import ViewTransactionPage from "views/Transactions/ViewTransaction.jsx";
import ViewTransactionTypePage from "views/Transactions/ViewTransactionType.jsx";
import ViewAccountPage from "views/Accounts/ViewAccount.jsx";
import ViewDebtPage from "views/Debts/ViewDebt.jsx";
import ViewPaycheckPage from "views/Paychecks/ViewPaycheck.jsx";
import EditUserPage from "views/EditUser/EditUser.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";

import TransactionsPage from "views/Transactions/Transactions.jsx";
import DebtsPage from "views/Debts/Debts.jsx";
import PaychecksPage from "views/Paychecks/Paychecks.jsx";
import UsersPage from "views/Users/Users.jsx";
import SettingsPage from "views/Settings/Settings.jsx";
import AccountsPage from "views/Accounts/Accounts.jsx";
import GroceriesPage from "views/Groceries/GroceriesPage.jsx"

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
    path: "/transaction_type/:id?",
    hideSidebar: true,
    sidebarName: "New Transaction Type",
    navbarName: "New Transaction Type",
    component: ViewTransactionTypePage
  },
  { 
    path: "/debt/:id?", 
    hideSidebar: true,
    sidebarName: "View Debts",
    navbarName: "View Debts",
    component: ViewDebtPage
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
    path: "/debts",
    sidebarName: "Debts",
    navbarName: "Debts",
    icon: NoMoney,
    component: DebtsPage
  },
  {
    path: "/paychecks",
    sidebarName: "Paychecks",
    navbarName: "Paychecks",
    icon: Money,
    component: PaychecksPage
  },
  { 
    path: "/paycheck/:id?", 
    hideSidebar: true,
    sidebarName: "View Paychecks",
    navbarName: "View Paychecks",
    component: ViewPaycheckPage
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
    path: "/groceries",
    sidebarName: "Groceries",
    navbarName: "Groceries",
    icon: Cart,
    component: GroceriesPage
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
