import React from "react";

const DarthVader = () => {
  return (
    <div
      className="relative min-h-screen text-yellow-400 flex flex-col items-center justify-center p-8 font-tradegothic bg-cover bg-center"
      style={{ backgroundImage: "url('/starwars-bg.jpg')" }}
    >
      {/* Right and left black transparent panels */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-black bg-opacity-60 z-0" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-black bg-opacity-60 z-0" />

      <h1 className="text-6xl md:text-8xl font-bold uppercase mb-6 text-center text-yellow-400 drop-shadow-[2px_2px_0_black] z-10">
        Darth Vader
      </h1>

      <img
        src="/darth-vader-full.jpg"
        alt="Darth Vader Full"
        className="w-64 h-auto mb-6 rounded-lg border-4 border-yellow-500 shadow-2xl z-10"
      />

      <p className="max-w-3xl text-2xl text-center border-2 border-yellow-500 p-8 rounded-lg shadow-2xl bg-black bg-opacity-60 z-10">
        Darth Vader, once Anakin Skywalker, was a legendary Jedi Knight who turned to the dark side of the Force and became a Sith Lord.
        He served as the right hand of Emperor Palpatine and hunted down the Jedi during the Great Jedi Purge. Ultimately, he found
        redemption through his son, Luke Skywalker, by destroying the Emperor and bringing balance to the Force.
      </p>
    </div>
  );
};

export default DarthVader;
