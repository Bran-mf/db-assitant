import React, { useContext, useEffect, useMemo, useRef } from "react";
import { Network } from "vis-network";
import { parsedTable } from "../../Conf/Interfaces/ParsedTables";
import { getEdgesNamesFromTable } from "../../Helpers/GaphsHelpers";
import { DBContext } from "../../providers/dbProvider";
interface GraphBoardInterface {
  parsedTables: parsedTable[];
}
export interface GraphNode {
  id: number;
  label: string;
  [index: string]: any;
}
export interface GraphEdge {
  from: number;
  to: number;
  [index: string]: any;
}
const GraphBoard = ({ parsedTables }: GraphBoardInterface) => {

  const { file, setGraph, container } = useContext(DBContext);

  const tableToNodes = (parsedTable: parsedTable[]) =>
    parsedTable.map((table, index) => ({ id: index, label: table.tableName }));

  useEffect(() => {
    const nodes = tableToNodes(parsedTables).map((node) => ({
      ...node,
    }));

    const edges = getEdgesIds(
      nodes,
      parsedTables.map(getEdgesNamesFromTable).flat()
    );
    setGraph((prev: any) => ({ ...prev, edges, nodes }));
  }, [file]);

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




  return <div ref={container} className={"w-full h-full"} />;
};

export default GraphBoard;
