import { Table } from "@radix-ui/themes";
import React from "react";

export default function SkeletonLoader() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Table.Row key={index}>
          <Table.Cell>
            <div className="h-6 w-8 bg-gray-300 animate-pulse rounded"></div>
          </Table.Cell>
          <Table.Cell>
            <div className="h-6 w-32 bg-gray-300 animate-pulse rounded"></div>
          </Table.Cell>
          <Table.Cell>
            <div className="h-6 w-16 bg-gray-300 animate-pulse rounded"></div>
          </Table.Cell>
          <Table.Cell>
            <div className="h-6 w-24 bg-gray-300 animate-pulse rounded"></div>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
}
