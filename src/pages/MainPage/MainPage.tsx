import React from "react";
import { Container } from "react-bootstrap";
import useParseFile from "../../hooks/useParseFile";
import TablesAsTables from "../TablesViews/TablesAsTables/TablesAsTables";

const MainPage = () => {
  const { file, handleOpenFile } = useParseFile();

  return (
    <Container fluid className={'h-full'} >
      {!file ? <input type={"file"} onChange={handleOpenFile} /> : <TablesAsTables datax={file} />}
    </Container>
  );
};

export default MainPage;
