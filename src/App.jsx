import React, { useState, useEffect, useRef } from "react";
import Control from "./control/Control";
import Visualiser from "./control/Visualiser";
import { bubbleSort } from "./algorithm/BubbleSort";
import { MergeSort } from "./algorithm/MergeSort";
import { selectionSort } from "./algorithm/SelectionSort";
import "./App.css";

function App() {
  const [baseArray, setBaseArray] = useState([]);
  const [array, setArray] = useState([]);
  const [algo, setAlgo] = useState("");
  const [animations, setAnimations] = useState([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(100);

  const timerRef = useRef(null);

  // Reset when baseArray changes
  useEffect(() => {
    setArray([...baseArray]);
    setAnimations([]);
    setStepIdx(0);
    setIsPlaying(false);
    clearTimeout(timerRef.current);
  }, [baseArray]);

  // Advance one step
  const doStep = () => {
    if (stepIdx >= animations.length) {
      setIsPlaying(false);
      return;
    }
    const anim = animations[stepIdx];

    // Apply the animation
    if (Array.isArray(anim)) {
      // [i, j, swapFlag]
      const [i, j, swapFlag] = anim;
      if (swapFlag) {
        setArray(arr => {
          const a = [...arr];
          [a[i], a[j]] = [a[j], a[i]];
          return a;
        });
      }
    } else {
      // MergeSort object: { type, ... }
      if (anim.type === 'overwrite') {
        setArray(arr => {
          const a = [...arr];
          a[anim.index] = anim.value;
          return a;
        });
      }
    }

    setStepIdx(s => s + 1);
  };

  // Auto-play effect
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(doStep, speed);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, stepIdx, speed]);

  // Prepare animations
  const prepare = () => {
    if (!algo || baseArray.length === 0) return;
    let anims = [];
    if (algo === 'bubble') anims = bubbleSort(baseArray);
    if (algo === 'selection') anims = selectionSort(baseArray);
    if (algo === 'merge') anims = MergeSort(baseArray);
    setAnimations(anims);
    setArray([...baseArray]);
    setStepIdx(0);
  };

  // Controls
  const handlePlay = () => {
    if (!animations.length) prepare();
    setIsPlaying(true);
  };
  const handlePause = () => setIsPlaying(false);
  const handleStep = () => {
    handlePause();
    if (!animations.length) prepare();
    doStep();
  };
  const handleReset = () => {
    handlePause();
    setArray([...baseArray]);
    setStepIdx(0);
  };

  // Preset generators
  const genRandom = () => Array.from({ length: 30 }, () => Math.floor(Math.random() * 200) + 20);
  const genSorted = () => [...genRandom()].sort((a,b) => a-b);
  const genReversed = () => [...genSorted()].reverse();
  const genNearly = () => {
    const arr = genSorted();
    for (let k=0; k<10; k++) {
      const i = Math.floor(Math.random()*arr.length);
      const j = Math.floor(Math.random()*arr.length);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const handlePreset = (type, custom = "") => {
    let arr = [];
    if (type === 'random') arr = genRandom();
    else if (type === 'sorted') arr = genSorted();
    else if (type === 'reversed') arr = genReversed();
    else if (type === 'nearly') arr = genNearly();
    else if (type === 'custom') {
      arr = custom.split(",").map(x=>parseInt(x,10))
        .filter(n=>!isNaN(n)&&n>=0&&n<=500);
    }
    setBaseArray(arr);
  };

  return (
    <div className="App">
      <h1>Sorting Visualiser</h1>
      <Control
        algo={algo}
        setAlgo={setAlgo}
        speed={speed}
        setSpeed={setSpeed}
        isPlaying={isPlaying}
        handlePlay={handlePlay}
        handlePause={handlePause}
        handleStep={handleStep}
        handleReset={handleReset}
        handlePreset={handlePreset}
      />
      <Visualiser
        array={array}
        currentStep={stepIdx}
        animations={animations}
      />
    </div>
  );
}

export default App;