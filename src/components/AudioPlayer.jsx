import { useRef, useState, useEffect } from "react";

function AudioPlayer({ currentAudio }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // PLAY / PAUSE
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  // AUTO PLAY WHEN NEW AUDIO SELECTED ✅
  useEffect(() => {
    if (currentAudio && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentAudio]);

  // PROGRESS BAR
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

  // CONFIRM BEFORE LEAVING
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
      <p>{currentAudio ? currentAudio.title : "No audio selected"}</p>

      <audio ref={audioRef} src={currentAudio?.url}></audio>

      <button onClick={togglePlay}>
        {isPlaying ? "Pause" : "Play"}
      </button>

      <input
        type="range"
        value={progress}
        onChange={(e) => {
          const audio = audioRef.current;
          const newTime = (e.target.value / 100) * audio.duration;
          audio.currentTime = newTime;
          setProgress(e.target.value);
        }}
      />
    </div>
  );
}

export default AudioPlayer;