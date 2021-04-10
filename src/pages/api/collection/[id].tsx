import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import $ from "cheerio";

export interface Mod {
    name: string;
    author: string;
    url: string;
    icon: string;
    description: string;
}

export type Mods = Record<string, Mod>;

export default async function fetchCollection(req: NextApiRequest, res: NextApiResponse) {
    const { data } = await axios.get("https://steamcommunity.com/workshop/filedetails/?id=" + req.query.id);

    const items = $(".collectionItem", data);

    const json: Mods = {};
    for (const item of items.get()) {
        const id = item.attribs.id.replace("sharedfile_", "");
        const icon = $(".workshopItem img.workshopItemPreviewImage", item).attr("src") as string;
        const url = $(".workshopItem a", item).attr("href") as string;
        const author = $(".workshopItemAuthorName a", item).text() as string;
        const name = $(".collectionItemDetails .workshopItemTitle", item).text();
        const description = $(".workshopItemShortDesc", item).html() as string;

        json[id] = { name, author, url, icon, description };
    }

    res.json(json);
}
