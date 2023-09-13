import { useState, useEffect } from "react";
import Flag from "./flag";

type FlagsProps = {
  canVote: boolean;
};

export default function Flags(props: FlagsProps) {
  const [flags, setFlags] = useState([]);
  const [scores, setScores] = useState<Map<number, number>>(new Map());
  const [statuses, setStatuses] = useState<number[]>([]);

  useEffect(() => {
    fetch("/api/flags/getFlags")
      .then((res) => res.json())
      .then((json) => {
        const randomFlags = json.sort(() => Math.random() - 0.5);
        setFlags(randomFlags);
      });
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
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="bg-blue-500 w-min text-center sm:text-xl md:text-2xl lg:text-3xl border-4 border-blue-600 p-4 m-3 rounded-xl">
          Loading...
        </p>
      </div>
    );
  }

  async function castVotes() {
    const promises = [...scores.entries()].map(([flagId, score]) => {
      return fetch("/api/flags/castVote", {
        method: "POST",
        body: JSON.stringify({
          score,
          flag_id: flagId,
        }),
      });
    });

    const fetches = await Promise.allSettled(promises);

    const statuses = fetches.map((fetch) => {
      if (fetch.status === "fulfilled") {
        return fetch.value.status;
      }

      return 0;
    });

    setStatuses(statuses);
  }

  return (
    <div className="flex flex-col justify-start items-center">
      <div className="md:mx-7 flex flex-row flex-wrap items-center justify-evenly">
        {flags.map((flag: any) => (
          <Flag
            key={flag.id}
            id={flag.id}
            img={flag.image_url}
            scores={scores}
            setScores={setScores}
            canVote={props.canVote}
          />
        ))}
      </div>
      {statuses.length > 0 ? (
        statuses.every((status) => status === 200) ? (
          <p className="bg-green-500 sm:text-xl md:text-2xl lg:text-3xl border-4 border-green-600 p-4 m-3 rounded-xl">
            Your votes have been cast!
          </p>
        ) : statuses.some((status) => status === 403) ? (
          <p className="bg-red-500 sm:text-xl md:text-2xl lg:text-3xl border-4 border-red-600 p-4 m-3 rounded-xl">
            You&apos;ve already voted!
          </p>
        ) : (
          <p className="bg-red-500 sm:text-xl md:text-2xl lg:text-3xl border-4 border-red-600 p-4 m-3 rounded-xl">
            Something went wrong!
          </p>
        )
      ) : null}
      {props.canVote && (
        <button
          onClick={castVotes}
          className="bg-emerald-500 sm:text-2xl md:text-3xl lg:text-4xl border-4 border-emerald-400 p-4 my-3 rounded-xl"
        >
          SUBMIT
        </button>
      )}
    </div>
  );
}
