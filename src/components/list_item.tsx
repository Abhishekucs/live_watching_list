"use client";
import { incrementCount } from "@/actions";
import { ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";
import { Button, Flex, IconButton, Table } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

export default function ListItem({
  id,
  rank,
  name,
  upVote,
}: {
  id: string;
  rank: number;
  name: string;
  upVote: number;
}) {
  const [hasUpVoted, setHasUpVoted] = useState(false);
  //   const [hasDownVoted, setHasDownVoted] = useState(false);

  // Load vote state from localStorage
  useEffect(() => {
    const storedVotes = JSON.parse(localStorage.getItem("votes") || "{}");
    if (storedVotes[id]) {
      setHasUpVoted(storedVotes[id] === "up");
      //   setHasDownVoted(storedVotes[id] === "down");
    }
  }, [id]);
  async function handleIncrement() {
    await incrementCount(id, {
      upVote: upVote + 1,
    });

    // Save vote in localStorage
    const storedVotes = JSON.parse(localStorage.getItem("votes") || "{}");
    storedVotes[id] = "up";
    localStorage.setItem("votes", JSON.stringify(storedVotes));

    setHasUpVoted(true);
    // setHasDownVoted(false);
  }

  //   async function handleDecrement() {
  //     if (!hasDownVoted && upVote > 0) {
  //       await incrementCount(id, {
  //         upVote: upVote - 1,
  //       });

  //       // Save vote in localStorage
  //       const storedVotes = JSON.parse(localStorage.getItem("votes") || "{}");
  //       storedVotes[id] = "down";
  //       localStorage.setItem("votes", JSON.stringify(storedVotes));

  //       setHasDownVoted(true);
  //       setHasUpVoted(false); // Reset upvote if previously upvoted
  //     }
  //   }
  return (
    <Table.Row>
      <Table.RowHeaderCell># {(rank + 1).toString()}</Table.RowHeaderCell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{upVote}</Table.Cell>
      <Table.Cell>
        <Flex gap="3">
          <Button
            variant="classic"
            onClick={handleIncrement}
            disabled={hasUpVoted}
          >
            I'm watching this
          </Button>
          {/* <IconButton
            variant="classic"
            onClick={handleDecrement}
            disabled={hasDownVoted || upVote == 0}
          >
            <ThickArrowDownIcon width="18" height="18" />
          </IconButton> */}
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
}
