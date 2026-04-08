import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ShowDetails({ setCurrentAudio }) {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((res) => res.json())
      .then((data) => setShow(data));
  }, [id]);

  if (!show) return <p>Loading...</p>;

  return (
    <div>
      <h2>{show.title}</h2>

      {show.seasons.map((season) => (
        <div key={season.season} className="card">
          <h3>Season {season.season}</h3>

          {season.episodes.map((ep) => (
            <div key={ep.episode}>
              <p>{ep.title}</p>

              <button
                onClick={() =>
                  setCurrentAudio({
                    title: ep.title,
                    url: ep.file
                  })
                }
              >
                ▶ Play
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ShowDetails;