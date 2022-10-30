import React, { useContext, useState } from "react";
import { DBContext, IDBGraphDataState } from "../../providers/dbProvider";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, Col, Container, Row } from "react-bootstrap";
import { GraphNode } from "../GrahpBoard/GraphBoard";
const TablesSubPanel = () => {
  const {
    graphData,
    setGraph,
  } = useContext(DBContext);
  const [filter, setFilter] = useState("");
  const handleFilter = (value: string) => setFilter(value);

  const matchFilter = (node: { label: string }) =>
    filter !== "" ? node.label.includes(filter) : true;

  const handleToggleNodeVisibility = (nodeID: number) => {
    setGraph((prev:IDBGraphDataState) =>
    ( {...prev, nodes: prev?.nodes.map((node: GraphNode) =>
        node.id === nodeID ? { ...node, hidden: !node.hidden } : node
      )})
    );
  };
  return (
    <div className="overflow-y-auto max-h-96 ">
      <label className=" block sticky top-0">
        <input
          onChange={({ target: { value } }: any) => handleFilter(value)}
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Table Name"
          type="text"
          name="filter"
        />
      </label>
      <br />
      <Container className=" grid grid-cols-4 gap-2 alig-center">
        {graphData?.nodes?.filter(matchFilter).map((node: any) => (
          <>
            <div className="m-auto">
              <input
                type="checkbox"
                checked={!node.hidden}
                className="col-span-1"
                onChange={() => handleToggleNodeVisibility(node.id)}
              />
            </div>

            <p className="col-span-2 self-center break-words my-auto">{`${node.label}`}</p>
            <Button color="primary" className="col-span-1">
              Ver
            </Button>
          </>
        ))}
      </Container>
    </div>
  );
};

export default TablesSubPanel;
