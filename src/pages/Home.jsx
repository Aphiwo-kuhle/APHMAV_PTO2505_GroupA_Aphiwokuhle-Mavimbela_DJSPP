import Carousel from "../components/Carousel";

function Home({ setCurrentAudio, favorites, toggleFavorite }) {
  const episodes = [
    {
      id: 1,
      title: "Future of AI",
      show: "Tech Talks",
      season: 3,
      episode: 12,
      genre: "Technology",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      id: 2,
      title: "Startup Success",
      show: "Business Daily",
      season: 2,
      episode: 8,
      genre: "Business",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      id: 3,
      title: "Morning News",
      show: "Daily News",
      season: 1,
      episode: 5,
      genre: "News",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
  ];

  // 🧠 GROUP BY GENRE
  const genres = {};
  episodes.forEach((ep) => {
    if (!genres[ep.genre]) {
      genres[ep.genre] = [];
    }
    genres[ep.genre].push(ep);
  });

  return (
    <div>
      {/* 🎠 CAROUSEL */}
      <Carousel />

      {/* 🔥 RECENTLY UPDATED */}
      <h2 className="section-title">Recently Updated</h2>
      <div className="row">
        {episodes.map((ep) => (
          <div key={ep.id} className="row-card">
            <img src={`https://picsum.photos/300?random=${ep.id}`} />

            <h3>{ep.title}</h3>
            <p>{ep.show}</p>

            <button onClick={() => setCurrentAudio(ep)}>▶ Play</button>

            <button onClick={() => toggleFavorite(ep)}>
              {favorites.find((f) => f.id === ep.id) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>

      {/* 🎧 GENRES */}
      {Object.keys(genres).map((genre) => (
        <div key={genre}>
          <h2 className="section-title">{genre}</h2>

          <div className="row">
            {genres[genre].map((ep) => (
              <div key={ep.id} className="row-card">
                <img src={`https://picsum.photos/300?random=${ep.id}`} />

                <h3>{ep.title}</h3>
                <p>{ep.show}</p>

                <button onClick={() => setCurrentAudio(ep)}>▶</button>

                <button onClick={() => toggleFavorite(ep)}>
                  {favorites.find((f) => f.id === ep.id)
                    ? "❤️"
                    : "🤍"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;