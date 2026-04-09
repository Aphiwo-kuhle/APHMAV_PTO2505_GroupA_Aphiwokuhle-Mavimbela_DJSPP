import { useRef, useState, useEffect } from "react";

function AudioPlayer({ currentAudio }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // ▶ PLAY / PAUSE
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  // ⏱ UPDATE PROGRESS
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

  // 🔁 AUTO PLAY WHEN NEW AUDIO
  useEffect(() => {
    if (currentAudio && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentAudio]);

  // ⚠ LEAVE WARNING
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

  // 🎯 SEEK FUNCTION (ONLY ONE!)
  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(e.target.value);
  };

  return (
    <div className="player">
      <p>{currentAudio?.title || "No audio selected"}</p>

      <button onClick={togglePlay}>
        {isPlaying ? "⏸" : "▶"}
      </button>

      <input
        type="range"
        value={progress}
        onChange={handleSeek}
      />

      <audio ref={audioRef} src={currentAudio?.url}></audio>
    </div>
  );
}

export default AudioPlayer;