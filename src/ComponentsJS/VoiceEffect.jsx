import React from 'react';
import '../ComponentsCSS/VoiceEffect.css';

const VoiceEffect = () => {
  // קובצי MP3 שונים לכל מלבן
  const sounds = [
    { name: "תיבת טקסט 1", src: `${process.env.PUBLIC_URL}/Assets/voiceEffects/voice1.wav` },
    { name: "תיבת טקסט 2",  src: `${process.env.PUBLIC_URL}/Assets/voiceEffects/voice2.wav` },
    { name: "תיבת טקסט 3", src: "/path/to/sound3.mp3" }
  ];

  // פונקציה לניגון הצליל
  const playSound = (src) => {
    const audio = new Audio(src);
    audio.play();
  };

  return (
    <div className="voiceeffect-container">
      <div className="voiceeffect-rectangle-container">
        {/* המלבנים שמנגנים סאונד בלחיצה */}
        {sounds.map((sound, index) => (
          <div
            key={index}
            className={`voiceeffect-rectangle-${index + 1}`} // שימוש ב-class ספציפי לכל מלבן
            onClick={() => playSound(sound.src)} // מנגן את הצליל כשנלחץ
          >
            <span className="voiceeffect-text">{sound.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceEffect;
