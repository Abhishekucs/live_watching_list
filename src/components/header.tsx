import { Box, Button, Flex } from "@radix-ui/themes";
import React from "react";
import DialogBox from "./dialog";
import LiveTime from "./live_time";

export default function Header() {
  return (
    <Box className="container">
      <Flex justify="between">
        <Box>
          <h1 className="font-bold text-2xl font-[family-name:var(--font-geist-mono)]">
            Live Watching List
          </h1>
          <Flex align="center" gap="3">
            <h2 className="font-[family-name:var(--font-geist-mono)]">Anime</h2>
            <LiveTime />
          </Flex>
        </Box>
        <DialogBox>
          <Button variant="classic">Add Anime</Button>
        </DialogBox>
      </Flex>
    </Box>
  );
}
