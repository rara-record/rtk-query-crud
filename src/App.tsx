import Home from "./pages/Home";
import UserInfo from "./pages/UserInfo";
import AddEditUser from "./pages/AddEditUser";

import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEditUser />} />
        <Route path="/update/:id" element={<AddEditUser />} />
        <Route path="/view/:id" element={<UserInfo />} />
      </Routes>
    </div>
  );
}

export default App;
