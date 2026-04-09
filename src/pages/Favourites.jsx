import { useState } from "react";

function Favourites({ favorites }) {
  const [sort, setSort] = useState("newest");

  // 🧠 SORT
  const sorted = [...favorites].sort((a, b) => {
    if (sort === "newest") {
      return new Date(b.addedAt) - new Date(a.addedAt);
    } else if (sort === "oldest") {
      return new Date(a.addedAt) - new Date(b.addedAt);
    } else if (sort === "az") {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  // 🧠 GROUP BY SHOW
  const grouped = sorted.reduce((acc, ep) => {
    if (!acc[ep.show]) {
      acc[ep.show] = [];
    }
    acc[ep.show].push(ep);
    return acc;
  }, {});

  return (
    <div style={{ padding: "20px" }}>
      <h1>❤️ Your Favourites</h1>

      {/* 🔽 SORT OPTIONS */}
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>

      {/* 🧠 GROUP DISPLAY */}
      {Object.keys(grouped).map((show) => (
        <div key={show}>
          <h2>{show}</h2>

          {grouped[show].map((ep) => (
            <div className="row-card" key={ep.id}>
              <div>
                <h4>{ep.title}</h4>
                <p>
                  Season {ep.season} • Episode {ep.episode}
                </p>
                <small>
                  Added: {new Date(ep.addedAt).toLocaleString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      ))}

      {favorites.length === 0 && <p>No favourites yet</p>}
    </div>
  );
}

export default Favourites;