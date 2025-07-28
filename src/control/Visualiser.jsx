import React from "react";
import "./Visualiser.css";

export default function Visualiser({ array, currentStep, animations }) {
  // Determine highlight indices
  const anim = animations[currentStep] || null;
  let hi = null, hj = null;
  if (Array.isArray(anim)) {
    [hi, hj] = anim;
  } else if (anim && anim.type === 'compare') {
    hi = anim.i; hj = anim.j;
  }

  return (
    <div className="visualiser">
      {array.map((val, idx) => {
        let cls = "block";
        if (idx === hi || idx === hj) cls += " highlight";
        if (currentStep >= animations.length) cls += " sorted";
        return (
          <div
            key={idx}
            className={cls}
            id="bar"
            style={{ height: `${val}px`, width: `${1000/array.length}px` }}
          >{val}</div>
        );
      })}
    </div>
  );
}