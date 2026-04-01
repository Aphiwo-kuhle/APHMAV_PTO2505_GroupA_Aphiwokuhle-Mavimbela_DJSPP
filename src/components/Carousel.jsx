import { useNavigate } from "react-router-dom";

function Carousel() {
  const navigate = useNavigate();

  const shows = [
    { id: 1, title: "Tech Talks", genre: "Tech" },
    { id: 2, title: "Daily News", genre: "News" },
    { id: 3, title: "Comedy Hour", genre: "Comedy" }
  ];

  return (
    <div style={{ overflowX: "auto", display: "flex", gap: "10px" }}>
      {shows.map((show) => (
        <div
          key={show.id}
          style={{
            minWidth: "200px",
            padding: "10px",
            background: "#eee",
            cursor: "pointer"
          }}
          onClick={() => navigate(`/show/${show.id}`)}
        >
          <h3>{show.title}</h3>
          <p>{show.genre}</p>
        </div>
      ))}
    </div>
  );
}

export default Carousel;