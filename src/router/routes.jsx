import App from "../App";
import Edit from "../views/Edit/Edit";
import Login from "../views/Login/Login";
import Register from "../views/Register/Register";
import Material from "../views/Material/Material";
import PaperList from "../views/PaperList/PaperList";
const routes = [
  { path: "/", name: "", component: App, auth: true },
  { path: "/list", name: "list", component: PaperList, auth: true },
  { path: "/edit", name: "edit", component: Edit, auth: true },
  { path: "/register", name: "register", component: Register, auth: false },
  { path: "/login", name: "login", component: Login, auth: false },
  { path: "/material", name: "material", component: Material, auth: true },
];

export default routes;
