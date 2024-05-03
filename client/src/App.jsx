import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import { UserContextProvider } from "./userContext";
import RevealEmail from "./pages/RevealEmail";
import Success from "./pages/Success";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASEURL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider> {/* No need to pass user as a prop */}
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/revealemail/:id" element={<RevealEmail />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
