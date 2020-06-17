import { Home } from "./pages/Home/Home";
import { Profile } from "./pages/Profile/Profile";
import { routeType } from "./utils/routeType";
import { About } from "./pages/About/About";
import { Contact } from "./pages/Contact/Contact";
import { Account } from "./pages/Account/Account";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
export const routes: Array<routeType> = [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: Home,
    icon: "fas fa-home",
    auth: false,
  },
  {
    name: "Profile",
    path: "/profile",
    exact: true,
    component: Profile,
    icon: "fas fa-user-circle",
    auth: true,
  },
  {
    name: "Account",
    path: "/account",
    exact: true,
    component: Account,
    icon: "fas fa-user-cog",
    auth: true,
  },
  {
    name: "About",
    path: "/about",
    exact: true,
    component: About,
    icon: null,
    auth: false,
  },
  {
    name: "Contact",
    path: "/contact",
    exact: true,
    component: Contact,
    icon: null,
    auth: false,
  },
  {
    name: "Forgot Password",
    path: "/forgot-password",
    exact: true,
    component: ForgotPassword,
    icon: null,
    auth: false,
  },
];
