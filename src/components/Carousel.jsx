import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function Carousel() {
  const navigate = useNavigate();
  const scrollRef = useRef();

  const shows = [
    { id: 1, title: "Tech Talks" },
    { id: 2, title: "Daily News" },
    { id: 3, title: "Comedy Hour" }
  ];

  return (
    <div>
      <button onClick={() => (scrollRef.current.scrollLeft -= 200)}>⬅</button>
      <button onClick={() => (scrollRef.current.scrollLeft += 200)}>➡</button>

      <div
        ref={scrollRef}
        style={{ display: "flex", overflowX: "auto", gap: "10px" }}
      >
        {shows.map((show) => (
          <div
            key={show.id}
            className="card"
            style={{ minWidth: "200px" }}
            onClick={() => navigate(`/show/${show.id}`)}
          >
            <h3>{show.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;