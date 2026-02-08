"use client";

import Image from "next/image";
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

    if (!name) return <h1 className="text-2xl font-bold capitalize">Search Pokémon</h1>
    if (loading) return <h1 className="text-2xl font-bold capitalize">Loading...</h1>;
    if (!data?.pokemon) return <h1 className="text-2xl font-bold capitalize">Pokémon Not Found</h1>;
    if (error) return <p>Error: {error.message}</p>;

    const pokemon = data.pokemon;

    return(
        <div>
            {/* Name and Type */}
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
                <p className="text-xl">({pokemon.types.join(', ')})</p>
            </div>

            {/* Image */}
            <div className="flex flex-col items-center m-2">
                {pokemon.image && (
                    <div className="relative w-48 h-48">
                        <Image
                            src={pokemon.image}
                            alt={pokemon.name}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                )}
            </div>
            
            <div className="m-6 space-y-6 max-w-xl mx-auto">
                {/* Attacks */}
                <section>
                    <h2 className="text-xl font-semibold mb-3">Attacks</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Fast Attacks */}
                        <div className="rounded-lg border p-4">
                            <h3 className="font-medium mb-2">⚡ Fast</h3>
                            <ul className="space-y-1 text-sm">
                                {pokemon.attacks.fast.map((atk) => (
                                    <li
                                        key={atk.name}
                                        className="flex justify-between gap-2"
                                    >
                                        <span className="capitalize">
                                            {atk.name} <span className="text-gray-500">({atk.type})</span>
                                        </span>
                                        <span className="font-medium">{atk.damage}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Special Attacks */}
                        <div className="rounded-lg border p-4">
                            <h3 className="font-medium mb-2">🔥 Special</h3>
                            <ul className="space-y-1 text-sm">
                                {pokemon.attacks.special.map((atk) => (
                                    <li
                                        key={atk.name}
                                        className="flex justify-between gap-2"
                                    >
                                        <span className="capitalize">
                                            {atk.name} <span className="text-gray-500">({atk.type})</span>
                                        </span>
                                        <span className="font-medium">{atk.damage}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Evolutions */}
                <section>
                    <h2 className="text-xl font-semibold mb-3">Evolutions</h2>

                    {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
                        <ul className="flex flex-wrap gap-3">
                            {pokemon.evolutions.map((evo) => (
                                <li key={evo.id}>
                                    <button
                                        type="button"
                                        onClick={() => router.push(`/?name=${evo.name}`)}
                                        className="
                                            rounded-full
                                            border
                                            px-4
                                            py-1
                                            text-sm
                                            capitalize
                                            hover:bg-gray-600
                                            hover:cursor-pointer
                                            transition
                                        "
                                    >
                                    {evo.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">No evolutions</p>
                    )}
                </section>
            </div>
        </div>
    );
}