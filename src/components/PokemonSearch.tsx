"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export function PokemonSearch(){
    const searchParams = useSearchParams();
    const router = useRouter();

    const urlName = searchParams.get("name") ?? "";
    const [value, setValue] = useState(urlName);

    useEffect(() => {
        setValue(urlName);
    }, [urlName]);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        // const value = new FormData(e.currentTarget).get("name");
   
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
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search Pokémon"
                />

                <button type="submit">Search</button>
            </form>
        </div>
    );
}