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

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(e.target.value);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(percent || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  useEffect(() => {
    if (currentAudio && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentAudio]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isPlaying) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPlaying]);

  return (
   <div className="player">
  <p>{currentAudio?.title || "No audio selected"}</p>

  <div>
    <button onClick={togglePlay}>
      {isPlaying ? "Pause" : "Play"}
    </button>

    <input type="range" value={progress} onChange={handleSeek} />
  </div>

  <audio ref={audioRef} src={currentAudio?.url}></audio>
</div>
  );
}

export default AudioPlayer;