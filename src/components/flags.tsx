import { useState, useEffect } from "react";
import Flag from "./flag";

export default function Flags() {
  const [flags, setFlags] = useState([]);
  const [scores, setScores] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    fetch("/api/flags/getFlags")
      .then((res) => res.json())
      .then((json) => setFlags(json));
  }, []);

  useEffect(() => {
    setScores((scores) => {
      flags.forEach((flag: any) => {
        scores.set(flag.id, 1);
      });
      return scores;
    });
  }, [flags]);

  if (flags.length === 0) {
    return <p className="text-2xl p-1 text-center">Loading...</p>;
  }

  function castVotes() {
    scores.forEach((score, flagId) => {
      fetch("/api/flags/castVote", {
        method: "POST",
        body: JSON.stringify({
          score,
          flag_id: flagId,
        }),
      });
    });
  }

  return (
    <div className="flex flex-col justify-start items-center">
      <div className="mx-7 flex flex-row flex-wrap items-center justify-evenly">
        {flags.map((flag: any) => (
          <Flag
            key={flag.id}
            id={flag.id}
            img={flag.image_url}
            scores={scores}
            setScores={setScores}
          />
        ))}
      </div>
      <button
        onClick={castVotes}
        className="bg-emerald-500 sm:text-2xl md:text-3xl lg:text-4xl border-4 border-emerald-400 p-4 my-3 rounded-xl"
      >
        SUBMIT
      </button>
    </div>
  );
}
