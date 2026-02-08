"use client";

import { PokemonSearch } from "@/components/PokemonSearch";
import { PokemonResult } from "@/components/PokemonResult";

export default function Home() {

  return (
    <div>
      <main style={{ padding: 24 }}>
        <PokemonSearch/>
        <PokemonResult/>
      </main>
    </div>
  );
}
