import { parsedTable } from "../Conf/Interfaces/ParsedTables";

export const getEdgesNamesFromTable = (table: parsedTable) => {
  const tableAttributes = Object.keys(table.tableAttributes);

  const algo = tableAttributes.reduce((acc, act) => {
    if (table.tableAttributes[act].FK_info) {
        acc.push({from:table.tableName,to:table?.tableAttributes[act]?.FK_info?.target_table})
    }
    return acc;
   
  }, [] as Array<any>);

  return algo;
};
