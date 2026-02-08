"use client";

import Image from "next/image";
import { useQuery } from "@apollo/client/react";
import { GET_POKEMON_BY_NAME } from "@/graphql/queries/pokemon";
import { GetPokemonByNameData } from "@/types/pokemon";

export default function Home() {
  const { data, loading, error } = useQuery<
    GetPokemonByNameData
  >(GET_POKEMON_BY_NAME, {
    variables: { name: "Charmander"},
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.pokemon) return <p>Not Found</p>;

  const pokemon = data.pokemon;

  return (
    <div>
      <main style={{ padding: 24 }}>
        <p>{pokemon.name}</p>
        <p>Types: {pokemon.types.join(', ')}</p>
      </main>
    </div>
  );
}
