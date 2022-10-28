import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Accrodion from "../../../components/Acordion/Acrodion";
import GraphBoard from "../../../components/GrahpBoard/GraphBoard";
import Table from "../../../components/Table/Table";
import { parsedTable } from "../../../Conf/Interfaces/ParsedTables";

interface ITablesAsTables{
 datax:parsedTable[]
}
const TablesAsTables = ({ datax }: ITablesAsTables) => {
  return (
    <div className="flex flex-row h-full justify-start gap-4">
      <div className="w-1/4">
        <Accrodion />
      </div>
      <Card className="flex-grow"><GraphBoard parsedTables={datax}/></Card>
    </div>
  );
};

export default TablesAsTables;
