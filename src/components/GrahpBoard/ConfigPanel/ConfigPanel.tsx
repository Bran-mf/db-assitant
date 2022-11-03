import React, { useContext } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { DBContext, IDBGraphDataState } from "../../../providers/dbProvider";

const ConfigPanel = () => {
  const {
    graphOptions,
    setGraphOptions,
  } = useContext(DBContext);
  const handleEdgeLengthChange = (value: any) => {
    setGraphOptions((prev: any) => ({
      ...prev,
      edges: { ...prev.edges, length: value },
    }));
  };
  const handleTogglePhysics = () =>
    setGraphOptions((prev: any) => ({
      ...prev,
      physics: !prev.physics,
    }));

  return (
    <div className="max-h-96 gap-2 flex flex-col">
       <InputGroup>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Physics (This can hurt performance)"
          checked={graphOptions.physics}
          onChange={handleTogglePhysics}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Edges Lenght</InputGroup.Text>
        <Form.Control
           disabled={!graphOptions.physics}
          placeholder="Edge Lenght"
          aria-label="Edge Lenght"
          type="number"
          onChange={({ target: { value } }) => handleEdgeLengthChange(value)}
        />
      </InputGroup> 
    </div>
  );
};

export default ConfigPanel;
