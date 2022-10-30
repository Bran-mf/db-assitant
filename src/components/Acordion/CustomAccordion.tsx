import React from "react";
import { Accordion } from "react-bootstrap";
interface IAccordion {
  accordionElement?: { tittle: string; elements: any }[];
}
const CustomAccordion = ({ accordionElement }: IAccordion) => {
  return (
    <Accordion defaultActiveKey="0" flush>
      {accordionElement?.map((element,index) => (
        <Accordion.Item eventKey={index.toString()}>
          <Accordion.Header>{element.tittle}</Accordion.Header>
          <Accordion.Body>
            {element.elements}
          </Accordion.Body>
        </Accordion.Item>
      ))}

    </Accordion>
  );
};

export default CustomAccordion;
