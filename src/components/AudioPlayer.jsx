import { useRef, useState, useEffect } from "react";

function AudioPlayer({ currentAudio }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  // UPDATE PROGRESS
  useEffect(() => {
    const audio = audioRef.current;

    const update = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio?.addEventListener("timeupdate", update);

    return () => audio?.removeEventListener("timeupdate", update);
  }, []);

  // AUTO PLAY
  useEffect(() => {
    if (currentAudio && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentAudio]);

  // SEEK FIX
  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    audio.currentTime = (e.target.value / 100) * audio.duration;
  };

  return (
    <div className="player">
      <p>{currentAudio?.title || "No audio selected"}</p>

      <button onClick={togglePlay}>
        {isPlaying ? "Pause" : "Play"}
      </button>

      <input
        type="range"
        value={progress}
        onChange={handleSeek}
      />

      <audio ref={audioRef} src={currentAudio?.url} />
    </div>
  );
}

export default AudioPlayer;