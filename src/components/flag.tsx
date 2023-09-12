import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import type { Dispatch, SetStateAction } from "react";

/* eslint-disable @next/next/no-img-element */
type FlagProps = {
  id: number;
  img: string;
  scores: Map<number, number>;
  setScores: Dispatch<SetStateAction<Map<number, number>>>;
  canVote: boolean;
};

export default function Flag(props: FlagProps) {
  const { status } = useSession();
  const [score, setScore] = useState(props.scores.get(props.id) || 1);

  useEffect(() => {
    if (status === "authenticated") {
      props.setScores((scores) => {
        scores.set(props.id, score);
        return scores;
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, status]);

  return (
    <div className="m-3 rounded-xl w-full md:w-2/5 border-4 border-emerald-500 bg-emerald-400 p-3 [box-shadow:5px_5px_4px_0px_rgba(0,207,146,0.75)]">
      <img src={props.img} alt="Flag" className="my-2" />
      {status === "authenticated" && props.canVote && (
        <div className="p-3 bg-emerald-500 rounded-md flex flex-row justify-evenly items-center gap-2">
          <input
            className="flex-shrink w-14 rounded-md p-1 text-black"
            type="number"
            min={1}
            max={10}
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
          />
          <div className="w-full flex-grow">
            <input
              type="range"
              className="w-full"
              min={1}
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
      )}
    </div>
  );
}
