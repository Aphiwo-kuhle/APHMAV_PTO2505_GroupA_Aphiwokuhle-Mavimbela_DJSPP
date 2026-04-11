import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Carousel() {
  const scrollRef = useRef();
  const navigate = useNavigate();

  const shows = [
    { id: 1, title: "Tech Talks", genre: "Technology" },
    { id: 2, title: "Daily News", genre: "News" },
    { id: 3, title: "Comedy Hour", genre: "Comedy" },
    { id: 4, title: "Startup Life", genre: "Business" }
  ];

  const scroll = (dir) => {
    scrollRef.current.scrollLeft += dir === "left" ? -300 : 300;
  };

  return (
    <div className="carousel-wrapper">
      <h2 className="section-title">Recommended Shows</h2>

      <div className="carousel-buttons">
        <button onClick={() => scroll("left")}>⬅</button>
        <button onClick={() => scroll("right")}>➡</button>
      </div>

      <div className="carousel" ref={scrollRef}>
        {shows.map((show) => (
          <div
            key={show.id}
            className="carousel-card"
            onClick={() => navigate(`/show/${show.id}`)}
          >
            <img
              src={`https://picsum.photos/300?random=${show.id}`}
              alt={show.title}
            />
            <h3>{show.title}</h3>
            <p>{show.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;