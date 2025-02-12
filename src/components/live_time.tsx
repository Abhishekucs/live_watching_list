"use client";
import { Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

export default function LiveTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: "long", // e.g., Monday
    year: "numeric",
    month: "long", // e.g., January
    day: "numeric", // e.g., 12
  });

  return (
    <Flex align="center" gap="2">
      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
      <span className="font-mono text-sm">
        {formattedDate} | {formattedTime}
      </span>
    </Flex>
  );
}
