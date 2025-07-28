import React, { useState } from "react";
import "./Control.css";

export default function Control({
  algo, setAlgo,
  speed, setSpeed,
  isPlaying,
  handlePlay, handlePause, handleStep, handleReset,
  handlePreset
}) {
  const [custom, setCustom] = useState("");

  return (
    <div className="controls">
      <div className="presets">
        <button onClick={()=>handlePreset('random')} disabled={isPlaying}>Random</button>
        <button onClick={()=>handlePreset('sorted')} disabled={isPlaying}>Sorted</button>
        <button onClick={()=>handlePreset('reversed')} disabled={isPlaying}>Reversed</button>
        <button onClick={()=>handlePreset('nearly')} disabled={isPlaying}>Nearly</button>
      </div>
      <div className="custom">
        <input
          placeholder="5,3,8,1"
          value={custom}
          onChange={e=>setCustom(e.target.value)}
          disabled={isPlaying}
        />
        <button onClick={()=>handlePreset('custom', custom)} disabled={isPlaying}>Apply</button>
      </div>
      <div className="algo">
        <select value={algo} onChange={e=>setAlgo(e.target.value)} disabled={isPlaying}>
          <option value="">Select Algorithm</option>
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="merge">Merge Sort</option>
        </select>
      </div>
      <div className="playback">
        {!isPlaying
          ? <button onClick={handlePlay} disabled={!algo}>► Play</button>
          : <button onClick={handlePause}>❚❚ Pause</button>
        }
        <button onClick={handleStep} disabled={isPlaying || !algo}>↷ Step</button>
        <button onClick={handleReset}>⟲ Reset</button>
      </div>
      <div className="speed">
        <label>
          Speed:
          <input
            type="range"
            min="10"
            max="500"
            value={speed}
            onChange={e=>setSpeed(+e.target.value)}
          />
          {speed}ms
        </label>
      </div>
    </div>
  );
}