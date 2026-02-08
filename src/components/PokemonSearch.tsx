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
            <form onSubmit={handleSubmit} className="gap-3 flex items-center">
                <input
                    type="search"
                    name="name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Type Pokémon Name.."
                    className="px-3 py-1 rounded-2xl bg-gray-300 border-4 border-fuchsia-600 text-sm text-gray-900
                        focus:border-fuchsia-800 transition
                    "
                />

                <button
                    type="submit"
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
                    ">
                    Search
                </button>
            </form>
        </div>
    );
}