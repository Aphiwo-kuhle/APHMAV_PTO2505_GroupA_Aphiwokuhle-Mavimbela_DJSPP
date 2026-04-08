import { Link } from "react-router-dom";

function Layout({ children, toggleTheme, theme }) {
  return (
    <div>
      <nav className="navbar">
        <h2 className="logo">🎧 PodcastApp</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/favourites">Favourites</Link>

          <button className="theme-btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>

      <main className="content">{children}</main>
    </div>
  );
}

export default Layout;