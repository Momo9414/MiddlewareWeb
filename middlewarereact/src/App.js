import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Home from './components/Home/Home';
import Bibliotheque from './components/bibliothèque/bibliotheque';
import Livre from './components/Livre/Livre';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

function App() {
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const handleLogin = (newToken) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    setToken(savedToken);
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="navbar">
          <div className="navbar-container">
            <div className="navbar-brand">Bibliothèque en Ligne</div>
            <nav className="navbar-menu">
              <Link to="/">Accueil</Link>
              <Link to="/bibliotheque">Bibliothèque</Link>
              <Link to="/livre">Nouveau doc</Link>
              {
                !token ? (
                  <>
                    <Link to="/login">Connexion</Link>
                    <Link to="/signup">Inscription</Link>
                  </>
                ) : (
                  <Link to="/logout" onClick={handleLogout}>Déconnexion</Link>
                )
              }
            </nav>
            <button className="demo-btn">Book a Demo</button>
          </div>
        </header>

        <main className="main-content">
          <div className="hero-section">
            <h1>Optimisez votre gestion de documents</h1>
            <p>La Bibliothèque en Ligne vous permet de gérer vos documents en toute simplicité.</p>
            <form className="search-form">
              <input type="text" placeholder="Quel document cherchez-vous ?" />
              <input type="text" placeholder="Où le cherchez-vous ?" />
              <button type="submit">Rechercher</button>
            </form>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bibliotheque" element={<Bibliotheque />} />
            <Route path="/livre" element={<Livre />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout"/>
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2024 Bibliothèque en Ligne. Tous droits réservés.</p>
            <nav className="footer-menu">
              <Link to="/privacy">Politique de confidentialité</Link>
              <Link to="/terms">Conditions d'utilisation</Link>
            </nav>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
