import { createContext, useRef, useState } from "react";
import { GraphEdge, GraphNode } from "../components/GrahpBoard/GraphBoard";
import { parsedTable } from "../Conf/Interfaces/ParsedTables";

const graphInitialState = {
  edges: [],
  nodes: [],
};
const optionsInitialState = {
  manipulation:{
    enabled:true,
    addNode: true,
  },
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
      }}
    >
      {children}
    </DBContext.Provider>
  );
};
