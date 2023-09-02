import { useState, useEffect } from "react";

/* eslint-disable @next/next/no-img-element */
type FlagProps = {
  img: string;
};

export default function Flag(props: FlagProps) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Cast vote to api
  }, [score]);

  return (
    <div className="m-3 rounded-xl border-4 border-emerald-500 bg-emerald-400 p-3 [box-shadow:5px_5px_4px_0px_rgba(0,207,146,0.75)]">
      <img src={props.img} alt="Flag" className="my-2" />
      <div className="p-3 bg-emerald-500 rounded-md">
        <input
          type="range"
          className="w-full"
          min={0}
          max={10}
          step={1}
          value={score}
          list="markers"
          onChange={(e) => setScore(Number(e.target.value))}
        />
        <datalist id="markers">
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option value="4"></option>
          <option value="5"></option>
          <option value="6"></option>
          <option value="7"></option>
          <option value="8"></option>
          <option value="9"></option>
          <option value="10"></option>
        </datalist>
      </div>
    </div>
  );
}
