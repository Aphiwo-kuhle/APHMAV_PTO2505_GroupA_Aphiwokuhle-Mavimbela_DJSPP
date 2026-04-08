import Carousel from "../components/Carousel";

function Home({ setCurrentAudio, favorites, toggleFavorite }) {
  const episodes = [
    {
      id: 1,
      title: "Episode 12: The Future of AI",
      show: "Tech Talks",
      season: 3,
      episode: 12,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      id: 2,
      title: "Episode 8: Startup Success Stories",
      show: "Business Daily",
      season: 2,
      episode: 8,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    }
  ];

  return (
    <div>
      {/* 🔥 CAROUSEL */}
      <Carousel />

      {/* 🎧 EPISODES GRID */}
      <div className="grid">
        {episodes.map((ep) => (
          <div key={ep.id} className="card">
            <img
              src="https://picsum.photos/300/200"
              alt="podcast"
              style={{ width: "100%", borderRadius: "10px" }}
            />

            <h3>{ep.title}</h3>
            <p>{ep.show}</p>
            <p>Season {ep.season} • Episode {ep.episode}</p>

            <div className="actions">
              <button onClick={() => setCurrentAudio(ep)}>
                ▶ Play
              </button>

              <button onClick={() => toggleFavorite(ep)}>
                {favorites.find((f) => f.id === ep.id) ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;