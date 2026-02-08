"use client";

import { PokemonSearch } from "@/components/PokemonSearch";
import { PokemonResult } from "@/components/PokemonResult";

export default function Home() {

  return (
    <div>
      <main className="min-h-screen flex flex-col items-center justify-center m-2">
        <PokemonSearch/>
        <br></br>
        <PokemonResult/>
      </main>
    </div>
  );
}
