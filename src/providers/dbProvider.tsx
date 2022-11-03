import { createContext, useEffect, useRef, useState } from "react";
import { Network } from "vis-network";
import { GraphEdge, GraphNode } from "../components/GrahpBoard/GraphBoard";
import { parsedTable } from "../Conf/Interfaces/ParsedTables";

const graphInitialState = {
  edges: [],
  nodes: [],
};
const optionsInitialState = {
  nodes: {
    shape: "circle",
    color: {
      border: '#2B7CE9',
      background: '#97C2FC',
      highlight: {
        border: '#2B7CE9',
        background: '#FDAA99'
      },
    },
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
  physics: true
};
export interface IDBGraphDataState {
  edges: Array<GraphEdge>;
  nodes: Array<GraphNode>;
}
export const DBContext = createContext<any>({});
export const DBProvider = ({ children }: any) => {
  const container = useRef(null);
  const [file, setFile] = useState<Array<parsedTable>>();
  const [selectedTable, setSelectedTable] = useState();
  const [graphData, setGraph] = useState<IDBGraphDataState>({
    ...graphInitialState,
  });
  const [graphOptions, setGraphOptions] = useState<any>({
    ...optionsInitialState,
  });
  const [netWork, setNetWork] = useState<any>();
  useEffect(() => {
    if (!container.current) return;
    setNetWork(
      new Network(
        container.current,
        { nodes: graphData.nodes, edges: graphData.edges },
        graphOptions
      )
    );
  }, [container.current]);

  useEffect(() => {
    if (!container.current) return;
    netWork.setOptions({ ...graphOptions });
  }, [graphOptions]);

  useEffect(() => {
    if (!container.current) return;
    netWork?.setData({ ...graphData });
  }, [graphData]);

   const editNode = (node_id: number, newNode: GraphNode) => {
    setGraph((e) => ({
      ...e,
      nodes: e.nodes.map((node) =>
        node.id === node_id ? { ...newNode } : node
      ),
    }));
  };

  return (
    <DBContext.Provider
      value={{
        file,
        setFile,
        graphData,
        setGraph,
        selectedTable,
        setSelectedTable,
        graphOptions,
        setGraphOptions,
        container,
        netWork,
        editNode,
      }}
    >
      {children}
    </DBContext.Provider>
  );
};
