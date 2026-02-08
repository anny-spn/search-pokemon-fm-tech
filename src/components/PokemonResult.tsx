"use client";

import { useQuery } from "@apollo/client/react";
import { useSearchParams } from "next/navigation";
import { GET_POKEMON_BY_NAME } from "@/graphql/queries/pokemon";
import type { GetPokemonByNameData, GetPokemonByNameVars } from "@/types/pokemon";

export function PokemonResult(){
    const searchParams = useSearchParams();
    const name = searchParams.get("name") ?? "";

    const { data, loading, error } = useQuery<
        GetPokemonByNameData,
        GetPokemonByNameVars
    >(GET_POKEMON_BY_NAME, {
        variables: { name },
        skip: !name
    });

    if (!name) return <p>Search Pokémon</p>
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data?.pokemon) return <p>Not Found</p>;

    const pokemon = data.pokemon;

    return(
        <div>
            <p>{pokemon.name}</p>
            <p>Types: {pokemon.types.join(', ')}</p>
        </div>
    );
}