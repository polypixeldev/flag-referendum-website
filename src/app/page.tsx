"use client";

import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

import Flag from "../components/flag";
import waves from "../../public/waves.svg";

export default function Home() {
  const { status } = useSession();

  console.log(status);

  return (
    <main className="bg-blue-400">
      <div className="px-10 py-5">
        <div className="rounded-2xl border-4 border-orange-600 bg-orange-400 p-5 [box-shadow:5px_5px_4px_rgba(234,99,0,0.75)]">
          <h1 className="flex flex-row flex-wrap items-center justify-center text-center font-jolly-lodger text-7xl">
            <span className="text-red-500 lg:mr-5">HACK CLUB NAVAL ARMADA</span>
            <span className="text-purple-600">FLAG REFERENDUM</span>
          </h1>
        </div>
        <div className="mx-5 my-5 rounded-2xl border-4 border-sky-800 bg-sky-600 p-3 px-5 text-center text-white [box-shadow:5px_5px_4px_rgba(0,75,139,0.75)] md:mx-10 md:px-16">
          <p className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Hack Club needs a navy. Navies need flags.
          </p>
          <p className="my-1 text-2xl font-bold md:text-3xl lg:text-4xl">
            This is the Hack Club Naval Armada Flag Referendum.
          </p>
          <p className="text-xl md:text-2xl lg:text-3xl">
            The winning flag will fly from the floating bouncy castle at Maker
            Faire, from the flagpole at HQ, and eventually from every vessel in
            our nascent global armada.
          </p>
          {status === "authenticated" ? (
            <p className="my-1 text-xl md:text-2xl lg:text-3xl">
              Vote for your favorite flag by giving each flag a score from 1 to
              10, using the slider.
            </p>
          ) : (
            <button
              className="my-1 text-xl underline md:text-2xl lg:text-3xl"
              onClick={() => {
                signIn("slack");
              }}
            >
              Sign in with Slack to vote.
            </button>
          )}
        </div>
        <div className="mx-7 flex flex-row flex-wrap items-center justify-evenly">
          {/* <!--TODO: fetch flags from backend --> */}
          <Flag img="https://assets.hackclub.com/banners/2023.svg" />
          <Flag img="https://assets.hackclub.com/banners/2023.svg" />
          <Flag img="https://assets.hackclub.com/banners/2023.svg" />
          <Flag img="https://assets.hackclub.com/banners/2023.svg" />
          <Flag img="https://assets.hackclub.com/banners/2023.svg" />
          <Flag img="https://assets.hackclub.com/banners/2023.svg" />
        </div>
      </div>
      <Image src={waves} alt="Waves" className="w-screen" />
    </main>
  );
}
