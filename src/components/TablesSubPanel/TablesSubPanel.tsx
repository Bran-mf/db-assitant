import React, { useContext, useState } from "react";
import { DBContext, IDBGraphDataState } from "../../providers/dbProvider";
import ListGroup from "react-bootstrap/ListGroup";
import {
  Button,
  ButtonGroup,
  Container,
  Dropdown,
} from "react-bootstrap";
import { GraphNode } from "../GrahpBoard/GraphBoard";
const TablesSubPanel = () => {
  const { graphData, setGraph, netWork } = useContext(DBContext);
  const [filter, setFilter] = useState("");
  const handleFilter = (value: string) => setFilter(value);

  const matchFilter = (node: { label: string }) =>
    filter !== "" ? node.label.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) : true;

  const handleToggleNodeVisibility = (nodeID: number) => {
    setGraph((prev: IDBGraphDataState) => ({
      ...prev,
      nodes: prev?.nodes.map((node: GraphNode) =>
        node.id === nodeID ? { ...node, hidden: !node.hidden } : node
      ),
    }));
  };
  const handleFocus = (e: React.MouseEvent<HTMLElement>, node: GraphNode) => {
    e.stopPropagation();
    netWork.selectNodes([node.id]);
  };
  return (
    <div>
      <label className=" block ">
        <input
          onChange={({ target: { value } }: any) => handleFilter(value)}
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Table Name"
          type="text"
          name="filter"
        />
      </label>
      <div className="overflow-y-auto max-h-96 ">
        <br />
        <Container className="gap-2 flex flex-col">
          {graphData?.nodes?.filter(matchFilter).map((node: any) => (
            <div
              className="grid grid-cols-4 gap-2 alig-center cursor-pointer"
              onClick={() => handleToggleNodeVisibility(node.id)}
            >
              <div className="m-auto ">
                <input
                  type="checkbox"
                  checked={!node.hidden}
                  className="col-span-1"
                />
              </div>

              <p className="col-span-2 self-center break-words my-auto">{`${node.label}`}</p>
              <Dropdown as={ButtonGroup} onClick={(e) => e.stopPropagation()} >
                <Button variant="primary" onClick={(e) => handleFocus(e, node)} disabled={node.hidden}>
                  Focus
                </Button>
                <Dropdown.Toggle
                  split
                  variant="primary"
                  id="dropdown-split-basic"
                  disabled={node.hidden}
                />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => console.log("test")}>
                    Check
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ))}
        </Container>
      </div>
    </div>
  );
};

export default TablesSubPanel;
