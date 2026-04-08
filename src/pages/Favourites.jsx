function Favourites({ favorites }) {
  if (favorites.length === 0) {
    return <p style={{ padding: "20px" }}>No favourites yet</p>;
  }

  // SORT newest first
  const sorted = [...favorites].sort(
    (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>❤️ Favourite Episodes</h2>

      {sorted.map((ep) => (
        <div className="card" key={ep.id} style={{ marginBottom: "15px" }}>
          <h3>{ep.title}</h3>

          <p>
            Season {ep.season} • Episode {ep.episode}
          </p>

          <p style={{ color: "gray" }}>
            Added: {new Date(ep.addedAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Favourites;