"use client";

import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import Flags from "../components/flags";
import waves from "../../public/waves.svg";

export default function Home() {
  const { status } = useSession();
  const [hasVoted, setHasVoted] = useState<boolean | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/flags/hasVoted")
        .then((res) => res.json())
        .then((json) => setHasVoted(json.hasVoted));
    }
  }, [status]);

  return (
    <main className="bg-blue-400">
      <div className="px-5 md:px-10 py-5 min-h-screen">
        <div className="rounded-2xl border-4 border-orange-600 bg-hc-orange p-5 [box-shadow:5px_5px_4px_rgba(234,99,0,0.75)]">
          <h1 className="flex flex-row flex-wrap items-center justify-center text-center font-jolly-lodger text-5xl md:text-6xl lg:text-7xl">
            <span className="text-red-700 lg:mr-5 text-b">
              HACK CLUB NAVAL ARMADA
            </span>
            <span className="text-red-700 text-b">FLAG REFERENDUM</span>
          </h1>
        </div>
        <div className="md:mx-5 my-5 rounded-2xl border-4 border-sky-700 bg-hc-blue p-3 md:px-5 text-center text-white [box-shadow:5px_5px_4px_rgba(0,75,139,0.75)] lg:mx-10 lg:px-16">
          <div className="flex flex-row flex-wrap justify-center items-center my-2">
            <p className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Hack Club needs a navy.
            </p>
            <p className="text-3xl font-bold md:text-4xl lg:text-5xl">
              &nbsp;Navies need flags.
            </p>
          </div>
          <p className="my-1 text-2xl font-bold md:text-3xl lg:text-4xl">
            This is the Hack Club Naval Armada Flag Referendum.
          </p>
          <p className="text-xl md:text-2xl lg:text-3xl my-2">
            The winning flag will fly from the floating bouncy castle at Maker
            Faire, from the flagpole at HQ, and eventually from every vessel in
            our nascent global armada.
          </p>
          {status === "authenticated" ? (
            hasVoted === true ? (
              <p className="my-1 text-xl md:text-2xl lg:text-3xl">
                <strong>You have submitted your vote!</strong>
              </p>
            ) : (
              <p className="my-1 text-xl md:text-2xl lg:text-3xl">
                Use the slider next to each flag to score it from 1 to 10.{" "}
                <strong>
                  You will not be able to change your vote once you click the
                  submit button. Voting ends Friday!
                </strong>
              </p>
            )
          ) : (
            <button
              className="my-1 text-xl p-3 shadow-lg shadow-emerald-600/50 bg-emerald-500 border-emerald-600 border-2 rounded-md md:text-2xl lg:text-3xl"
              onClick={() => {
                signIn("slack");
              }}
            >
              Sign in with Slack to vote.
            </button>
          )}
        </div>
        <Flags canVote={hasVoted === null ? false : !hasVoted} />
      </div>
      <Image src={waves} alt="Waves" className="w-screen" />
    </main>
  );
}
