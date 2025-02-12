"use client";

import { Table } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import ListItem from "./list_item";
import { AnimeData } from "@/interfaces/interface";
import { getAnimeStream } from "@/firebase/firestore";
import SkeletonLoader from "./skeleton";

export default function ActiveList() {
  const [animeList, setAnimeList] = useState<AnimeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getAnimeStream((data) => {
      setAnimeList(data);
      setLoading(false); // Data is loaded
    });

    return () => unsubscribe(); // Cleanup listener when component unmounts
  }, []);

  return (
    <div className="mt-20 container">
      <Table.Root variant="surface" size="3">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Rank</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Live Count</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {loading ? (
            <SkeletonLoader /> // Show skeleton loader while fetching data
          ) : (
            animeList.map((anime, index) => (
              <ListItem
                key={anime.id}
                id={anime.id}
                name={anime.name}
                upVote={anime.upVote}
                rank={index}
              />
            ))
          )}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
