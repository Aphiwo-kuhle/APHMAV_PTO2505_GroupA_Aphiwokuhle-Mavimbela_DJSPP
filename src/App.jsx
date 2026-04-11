import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import ShowDetails from "./pages/ShowDetails";
import Layout from "./components/Layout";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const [currentAudio, setCurrentAudio] = useState(null);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  // ✅ SAVE FAVORITES
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ✅ THEME
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ❤️ FAVORITE
  const toggleFavorite = (episode) => {
    const exists = favorites.find((f) => f.id === episode.id);

    if (exists) {
      setFavorites(favorites.filter((f) => f.id !== episode.id));
    } else {
      setFavorites([...favorites, { ...episode, addedAt: new Date() }]);
    }
  };

  // 🌗 THEME TOGGLE
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <Layout toggleTheme={toggleTheme} theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setCurrentAudio={setCurrentAudio}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />

          <Route
            path="/favourites"
            element={<Favourites favorites={favorites} />}
          />

          <Route
            path="/show/:id"
            element={<ShowDetails setCurrentAudio={setCurrentAudio} />}
          />
        </Routes>
      </Layout>

      <AudioPlayer currentAudio={currentAudio} />
    </>
  );
}

export default App;