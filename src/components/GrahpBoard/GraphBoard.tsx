import React, { useEffect, useMemo, useRef } from "react";
import { Network } from "vis-network";
import { parsedTable } from "../../Conf/Interfaces/ParsedTables";
import { getEdgesNamesFromTable } from "../../Helpers/GaphsHelpers";
interface GraphBoardInterface {
  parsedTables: parsedTable[];
}
interface GraphNode {
  id: number;
  label: string;
}
interface GraphEdge {
  from: number;
  to: number;
}
const GraphBoard = ({ parsedTables }: GraphBoardInterface) => {
  const container = useRef(null);
  const tableToNodes = (parsedTable: parsedTable[]) =>
    parsedTable.map((table, index) => ({ id: index, label: table.tableName }));

  const nodes = useMemo(
    () =>
      tableToNodes(parsedTables).map((node) => ({
        ...node,
        color: { background: "#00C2FC" },
      })),
    [parsedTables]
  );

  const eedgex2 = useMemo(
    () => parsedTables.map(getEdgesNamesFromTable).flat(),
    [parsedTables]
  );

  const getEdgesIds = (
    nodes: GraphNode[],
    edgeNames: { from: string; to: string }[]
  ) => {
    const edgesAsObject = nodes.reduce((acc, act) => {
      acc[act.label] = act.id;
      return acc;
    }, {} as any);
    return edgeNames.map((edgeName) => ({
      from: edgesAsObject[edgeName.from],
      to: edgesAsObject[edgeName.to],
    }));
  };

  const options = {
    nodes: {
      shape: "circle",
    },
    edges: {
      arrows: {
        to: {
          enabled: true,
          type: "arrow",
        },
      },
      length: 700,
    },
  };
  const edges = getEdgesIds(nodes, eedgex2);
  useEffect(() => {
    const network =
      container.current &&
      new Network(container.current, { nodes, edges }, options);
  }, [container, nodes, edges]);

  return <div ref={container} className={"w-full h-full"} />;
};

export default GraphBoard;
