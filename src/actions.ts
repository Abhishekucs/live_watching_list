"use server";

import { AnimeData, UpdateData } from "./interfaces/interface";
import { addAnime, getAnimes, updateAnime } from "./firebase/firestore";
import { z } from "zod";
import { capitalize } from "./utils/helper";

export async function addAnimeToDb(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    name: z.string().min(1),
  });
  const parse = schema.safeParse({
    name: formData.get("name"),
  });

  if (!parse.success) {
    return { message: "Error: Failed to add" };
  }

  const data = parse.data;
  const animeName = data.name.trim().toLowerCase();

  try {
    const animes = await getAnimes();
    // Check if anime name already exists (case-insensitive)
    const isNameAlreadyPresent = animes.some(
      (anime) => anime.name.trim().toLowerCase() === animeName
    );

    if (isNameAlreadyPresent) {
      return { message: "Error: Anime already exists!" };
    }

    const animeData: AnimeData = {
      id: "",
      name: capitalize(animeName),
      upVote: 0,
      downVote: 0,
    };
    await addAnime(animeData);
    return { message: "Added successfully" };
  } catch (error) {
    return { message: `Something went wrong ${error}` };
  }
}

export async function incrementCount(id: string, data: UpdateData) {
  try {
    await updateAnime(id, data);
  } catch (error) {
    console.error("Error fetching anime list:", error);
    throw new Error("Failed to fetch anime list");
  }
}

export async function decrementCount() {}
