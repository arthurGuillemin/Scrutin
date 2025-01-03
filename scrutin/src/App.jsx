import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import CreateScrutin from "./pages/CreateScrutin.jsx";
import Login from "./pages/login.jsx";
import CreateAccount from "./pages/createAccount.jsx";
import HomePage from './pages/home';
import Results from "./pages/Results.jsx";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
      <Route path="/CreateScrutin" element={<CreateScrutin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
