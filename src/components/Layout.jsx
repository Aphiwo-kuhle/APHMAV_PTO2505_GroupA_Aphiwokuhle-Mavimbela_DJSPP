import { Link } from "react-router-dom";

function Layout({ children, toggleTheme, theme }) {
  return (
    <div>
      <nav className="navbar">
        <h2>🎧 PodcastApp</h2>

        <div style={{ display: "flex", gap: "15px" }}>
          <Link to="/">Home</Link>
          <Link to="/favourites">Favourites</Link>

          <button onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>

      <div>{children}</div>
    </div>
  );
}

export default Layout;