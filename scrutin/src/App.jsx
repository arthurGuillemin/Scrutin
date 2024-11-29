import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import CreateScrutin from "./components/CreateScrutin/CreateScrutin.jsx";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/creation" element={<CreateScrutin />} />
      </Routes>
    </Router>
  );
}

export default App;
