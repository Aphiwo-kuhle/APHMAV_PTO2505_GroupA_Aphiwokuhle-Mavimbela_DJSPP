import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import AudioPlayer from "./components/AudioPlayer";
import Carousel from "./components/Carousel";

// 🔥 HOME COMPONENT
function Home() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavs(stored);
  }, []);

  const toggleFavourite = () => {
    const existing = favs.find((item) => item.id === 1);

    let updated;

    if (existing) {
      updated = favs.filter((item) => item.id !== 1);
    } else {
      updated = [
        ...favs,
        {
          id: 1,
          title: "Sample Episode",
          show: "Sample Show",
          season: "Season 1",
          addedAt: new Date().toISOString()
        }
      ];
    }

    setFavs(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  const isFav = favs.some((item) => item.id === 1);

  return (
    <div>
      <h2>Home Page</h2>

      <Carousel />

      <button onClick={toggleFavourite}>
        {isFav ? "💔 Remove Favourite" : "❤️ Add Favourite"}
      </button>
    </div>
  );
}

// 🔥 FAVOURITES COMPONENT
function Favourites() {
  const [favs, setFavs] = useState([]);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavs(stored);
  }, []);

  const sortedFavs = [...favs].sort((a, b) => {
    if (sort === "az") return a.title.localeCompare(b.title);
    if (sort === "za") return b.title.localeCompare(a.title);
    if (sort === "newest") return new Date(b.addedAt) - new Date(a.addedAt);
    if (sort === "oldest") return new Date(a.addedAt) - new Date(b.addedAt);
  });

  return (
    <div>
      <h2>Favourites</h2>

      <select onChange={(e) => setSort(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="az">A–Z</option>
        <option value="za">Z–A</option>
      </select>

      {sortedFavs.map((item) => (
        <div key={item.id} style={{ margin: "10px 0" }}>
          <h3>{item.title}</h3>
          <p>{item.show} - {item.season}</p>
          <small>
            Added: {new Date(item.addedAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}

// 🔥 MAIN APP
function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
  <div className={theme} style={{ minHeight: "100vh", width: "100%" }}>
      <h1>🎧 Podcast App</h1>

      <button onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>

      <AudioPlayer />
    </div>
  );
}

export default App;