import { useState, useEffect } from "react";
import Flag from "./flag";

export default function Flags() {
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    fetch("/api/flags/getFlags")
      .then((res) => res.json())
      .then((json) => setFlags(json));
  }, []);

  if (flags.length === 0) {
    return <p className="text-2xl p-1 text-center">Loading...</p>;
  }

  return (
    <>
      {flags.map((flag: any) => (
        <Flag key={flag.id} id={flag.id} img={flag.image_url} />
      ))}
    </>
  );
}
