import { useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import type { Mods } from "./api/collection/[id]";

const baseUrl = "https://steamcommunity.com/workshop/filedetails/?id=";
export default function Home() {
    const [url, setUrl] = useState(baseUrl);
    const inputRef = useRef<HTMLInputElement>(null);

    const id = useMemo(() => url.replace(baseUrl, ""), [url]);

    const { data, isLoading } = useQuery<Mods>(
        [id],
        async () => {
            const { data } = await axios.get("/api/collection/" + id);

            return data;
        },
        { enabled: !!id },
    );

    const xml = useMemo(() => {
        if (!data) {
            return;
        }

        let tmp = "\t<Mods>\n";
        for (const [id, item] of Object.entries(data)) {
            tmp += `\t\t<ModItem>
\t\t\t<Name>${id}.sbm</Name>
\t\t\t<PublishedFileId>${id}</PublishedFileId>
\t\t</ModItem>\n`;
        }

        return tmp + "\t</Mods>";
    }, [data]);

    return (
        <div className="">
            <div>
                <label htmlFor="url" className="block text-md font-medium text-gray-200">
                    Steam Collection URL
                </label>
                <div className="mt-1">
                    <input
                        ref={inputRef}
                        type="url"
                        name="url"
                        id="url"
                        className="text-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={url}
                        onClick={() => inputRef.current?.setSelectionRange(0, url.length)}
                        onChange={({ target: { value } }) => setUrl(value)}
                        aria-describedby="url-description"
                    />
                </div>
                <p className="mt-2 text-sm text-gray-400" id="url-description">
                    Enter a steam collection url here to generate the Mods xml.
                </p>
            </div>

            {data && (
                <div className="mt-8">
                    <div>
                        <label htmlFor="mods" className="block text-md font-medium text-gray-200">
                            Mods XML
                        </label>
                        <div className="mt-1">
                            <textarea
                                name="mods"
                                id="mods"
                                className="h-50vh text-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={xml}
                                readOnly
                            />
                        </div>
                        <div className="mt-1 text-sm text-gray-400">Collection ID: {id}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
