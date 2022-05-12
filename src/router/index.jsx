import App from "../App";
import Edit from "../views/Edit/Edit";
import Login from "../views/Login/Login";
import Register from "../views/Register/Register";
import Material from "../views/Material/Material";
import PaperList from "../views/PaperList/PaperList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const BaseRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/list" element={<PaperList></PaperList>}></Route>
        <Route path="/edit" element={<Edit></Edit>}></Route>
        <Route path="/material" element={<Material></Material>}></Route>
      </Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
    </Routes>
  </Router>
);
