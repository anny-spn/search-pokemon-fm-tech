import { Suspense } from "react";
import { PokemonSearch } from "@/components/PokemonSearch";
import { PokemonResult } from "@/components/PokemonResult";

export default function Home() {

  return (
    <div>
      <main className="min-h-screen flex flex-col items-center justify-center m-2">
        <Suspense fallback={<h1 className="text-2xl font-bold capitalize">Loading...</h1>}>
          <PokemonSearch/>
          <br></br>
          <PokemonResult/>
        </Suspense>
      </main>
    </div>
  );
}
