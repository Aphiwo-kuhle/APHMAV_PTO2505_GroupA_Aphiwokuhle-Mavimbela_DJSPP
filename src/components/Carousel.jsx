import { useRef } from "react";

function Carousel() {
  const scrollRef = useRef();

  const scroll = (dir) => {
    scrollRef.current.scrollLeft += dir === "left" ? -300 : 300;
  };

  const shows = [
    { id: 1, title: "Tech Talks", genre: "Tech" },
    { id: 2, title: "Daily News", genre: "News" },
    { id: 3, title: "Comedy Hour", genre: "Comedy" }
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
        <h2>Recommended Shows</h2>
        <div>
          <button onClick={() => scroll("left")}>⬅</button>
          <button onClick={() => scroll("right")}>➡</button>
        </div>
      </div>

      <div
        ref={scrollRef}
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "15px",
          padding: "20px"
        }}
      >
        {shows.map((show) => (
          <div key={show.id} className="card" style={{ minWidth: "200px" }}>
            <h3>{show.title}</h3>
            <span className="tag">{show.genre}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;