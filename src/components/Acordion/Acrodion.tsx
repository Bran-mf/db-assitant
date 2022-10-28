import React from 'react'
import { Accordion } from 'react-bootstrap'

const Accrodion = () => {
  return (
    <Accordion defaultActiveKey="0" flush>
    <Accordion.Item eventKey="0">
      <Accordion.Header>Accordion Item #1</Accordion.Header>
      <Accordion.Body>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
      <Accordion.Header>Accordion Item #2</Accordion.Header>
      <Accordion.Body>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
  )
}

export default Accrodion