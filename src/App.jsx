import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import AudioPlayer from "./components/AudioPlayer";
import Carousel from "./components/Carousel";
import Layout from "./components/Layout";
import ShowDetails from "./components/ShowDetails";
import { useNavigate } from "react-router-dom";

// HOME


function Home() {
  const navigate = useNavigate();
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app")
      .then((res) => res.json())
      .then((data) => {
        setShows(data);
      });
  }, []);

  return (
    <div>
      <h2 className="section-title">Recommended Shows</h2>

      <Carousel />

      <div className="grid">
        {shows.map((show) => (
          <div
            className="card"
            key={show.id}
            onClick={() => navigate(`/show/${show.id}`)}
          >
            <img
              src={show.image}
              alt={show.title}
              style={{ width: "100%", borderRadius: "10px" }}
            />

            <h3>{show.title}</h3>
            <p>🎧 {show.seasons} seasons</p>

            <div>
              {show.genres.slice(0, 2).map((g, i) => (
                <span key={i} className="tag">
                  {g}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// FAVOURITES
function Favourites() {
  const [favs, setFavs] = useState([]);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavs(stored);
  }, []);

  // SORTING
  const sortedFavs = [...favs].sort((a, b) => {
    if (sort === "newest") return new Date(b.addedAt) - new Date(a.addedAt);
    if (sort === "oldest") return new Date(a.addedAt) - new Date(b.addedAt);
    if (sort === "A-Z") return a.title.localeCompare(b.title);
    if (sort === "Z-A") return b.title.localeCompare(a.title);
  });

  // GROUP BY SHOW
  const grouped = sortedFavs.reduce((acc, item) => {
    if (!acc[item.show]) acc[item.show] = [];
    acc[item.show].push(item);
    return acc;
  }, {});

  const removeFav = (id) => {
    const updated = favs.filter((item) => item.id !== id);
    localStorage.setItem("favourites", JSON.stringify(updated));
    setFavs(updated);
  };

  return (
    <div>
      <h2>❤️ Favourite Episodes</h2>

      <div className="filters">
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>

      {Object.keys(grouped).map((show) => (
        <div key={show}>
          <h3>{show}</h3>

          {grouped[show].map((item) => (
            <div className="card" key={item.id}>
              <h4>{item.title}</h4>

              <p>{item.season}</p>

              <p style={{ color: "gray" }}>
                Added: {new Date(item.addedAt).toDateString()}
              </p>

              <button onClick={() => removeFav(item.id)}>
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
// MAIN APP
function App() {
  const [theme, setTheme] = useState("light");
  const [currentAudio, setCurrentAudio] = useState(null);

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
    <div className={theme}>
      <Layout toggleTheme={toggleTheme} theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route
            path="/show/:id"
            element={<ShowDetails setCurrentAudio={setCurrentAudio} />}
          />
        </Routes>
      </Layout>

      <AudioPlayer currentAudio={currentAudio} />
    </div>
  );
}

export default App;