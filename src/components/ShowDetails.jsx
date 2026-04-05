import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ShowDetails({ setCurrentAudio }) {
  const { id } = useParams();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setIsFav(stored.some((item) => item.id === id));
  }, [id]);

  const toggleFavourite = () => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];

    let updated;

    if (isFav) {
      updated = stored.filter((item) => item.id !== id);
    } else {
updated = [
  ...stored,
  {
    id: id,
    title: "Episode 1",
    show: "Podcast " + id,
    season: "Season 1",
    addedAt: new Date().toISOString()
  }
];
    }

    localStorage.setItem("favourites", JSON.stringify(updated));
    setIsFav(!isFav);
  };

  return (
    <div>
      <h2>🎧 Podcast {id}</h2>

      <div className="card">
        <h3>Episode 1</h3>

        <button onClick={toggleFavourite}>
          {isFav ? "💔 Remove Favourite" : "❤️ Add Favourite"}
        </button>

        <button
          onClick={() =>
            setCurrentAudio({
              title: "Episode 1",
              url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            })
          }
        >
          ▶ Play
        </button>
      </div>
    </div>
  );
}

export default ShowDetails;