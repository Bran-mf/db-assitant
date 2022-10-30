import React, { useContext } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { DBContext, IDBGraphDataState } from "../../../providers/dbProvider";

const ConfigPanel = () => {
  const { graphData, setGraph, graphOptions, setGraphOptions, container  } =
    useContext(DBContext);
  const handleEdgeLengthChange = ( value: any) => {
    setGraphOptions((prev:any)=>({
        ...prev,edges:{...prev.edges,length:value}
    }))
  };
  return (
    <div className="max-h-96">
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Edges Lenght</InputGroup.Text>
        <Form.Control
          placeholder="Edge Lenght"
          aria-label="Edge Lenght"
          type="number"
          onChange={({target:{value}}) => handleEdgeLengthChange(value)}
        />
      </InputGroup>
    </div>
  );
};

export default ConfigPanel;
