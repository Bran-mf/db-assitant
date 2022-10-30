import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import CustomAccordion from "../../../components/Acordion/CustomAccordion";
import ConfigPanel from "../../../components/GrahpBoard/ConfigPanel/ConfigPanel";
import GraphBoard from "../../../components/GrahpBoard/GraphBoard";
import Table from "../../../components/Table/Table";
import TablesSubPanel from "../../../components/TablesSubPanel/TablesSubPanel";
import { parsedTable } from "../../../Conf/Interfaces/ParsedTables";

interface ITablesAsTables {
  datax: parsedTable[];
}
const TablesAsTables = ({ datax }: ITablesAsTables) => {
  return (
    <div className="flex flex-row h-full justify-start gap-4">
      <div className="w-1/4">
        <CustomAccordion
          accordionElement={[
            { tittle: "Tablas", elements: <TablesSubPanel /> },
            { tittle: "Configs", elements: <ConfigPanel /> },
          ]}
        />
      </div>
      <Card className="flex-grow">
        <GraphBoard parsedTables={datax} />
      </Card>
    </div>
  );
};

export default TablesAsTables;
