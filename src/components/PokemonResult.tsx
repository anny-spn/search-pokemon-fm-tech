"use client";

import { useQuery } from "@apollo/client/react";
import { useSearchParams, useRouter } from "next/navigation";
import { GET_POKEMON_BY_NAME } from "@/graphql/queries/pokemon";
import type { GetPokemonByNameData, GetPokemonByNameVars } from "@/types/pokemon";

export function PokemonResult(){
    const router = useRouter();
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
            <h1>{pokemon.name}</h1>
            <p>Types: {pokemon.types.join(', ')}</p>
            <h2>Attacks</h2>
            <h3>Fast</h3>
            <ul>
            {pokemon.attacks.fast.map((atk: any) => (
                <li key={atk.name}>
                    {atk.name} ({atk.type}): {atk.damage}
                </li>
            ))}
            </ul>

            <h3>Special</h3>
            <ul>
            {pokemon.attacks.special.map((atk: any) => (
                <li key={atk.name}>
                    {atk.name} ({atk.type}): {atk.damage}
                </li>
            ))}
            </ul>

            <h2>Evolutions</h2>
            {pokemon.evolutions ? (
                <ul>
                    {pokemon.evolutions.map((evo: any) => (
                        <li key={evo.id}>
                            <button
                                type="button"
                                onClick={() => router.push(`/?name=${evo.name}`)}
                            >
                                {evo.name}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No evolutions</p>
            )}
        </div>
    );
}