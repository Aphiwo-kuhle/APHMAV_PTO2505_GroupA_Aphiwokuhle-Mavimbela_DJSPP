import { useEffect, useState } from "react";

function Home({ setCurrentAudio, favorites, toggleFavorite }) {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app")
      .then((res) => res.json())
      .then((data) => setShows(data));
  }, []);

  return (
    <div><h2 style={{ padding: "20px", fontSize: "24px" }}>
  🎧 Spotify Style Podcast App
</h2>

      <div className="grid">
        {shows.map((show) => (
          <div key={show.id} className="card">
            <img src={show.image} alt={show.title} />

            <h3>{show.title}</h3>
            <p>{show.genres?.join(", ")}</p>

            <div className="actions">
              <button
                onClick={() =>
                  setCurrentAudio({
                    title: show.title,
                    url: show.seasons[0]?.episodes[0]?.file
                  })
                }
              >
                ▶
              </button>

              <button
                onClick={() =>
                  toggleFavorite({
                    id: show.id,
                    title: show.title
                  })
                }
              >
                {favorites.find((f) => f.id === show.id) ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;