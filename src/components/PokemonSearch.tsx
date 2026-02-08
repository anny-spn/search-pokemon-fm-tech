"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

export function PokemonSearch(){
    const searchParams = useSearchParams();
    const router = useRouter();

    const name = searchParams.get("name") ?? "";

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        const value = new FormData(e.currentTarget).get("name");
   
        if(!value) return;
        router.push(`/?name=${value.toString().toLowerCase()}`);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="pokemon-name">Search Pokémon</label>

                <input
                    id="pokemon-name"
                    type="search"
                    name="name"
                    defaultValue={name}
                    placeholder="Search Pokémon by name"
                />

                <button type="submit">Search</button>
            </form>
        </div>
    );
}