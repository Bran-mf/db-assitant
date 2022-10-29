import { createContext, useState } from "react";
import { parsedTable } from "../Conf/Interfaces/ParsedTables";

export const DBContext = createContext<any>({});
export const DBProvider = ({ children }: any) => {
  const [file, setFile] = useState<Array<parsedTable>>();
  return (
    <DBContext.Provider value={{ file, setFile }}>
      {children}
    </DBContext.Provider>
  );
};
