import React from "react";
import TableHeader from "./CustomTableHeader/CustomTableHeader";
import CustomTableRows from "./CustomTableRow/CustomTableRow";
export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number;
}

type TableProps<T, K extends keyof T> = {
data: Array<T>;
columns: Array<ColumnDefinitionType<T, K>>;
}

const Table =<T, K extends keyof T>({data,columns}: TableProps<T, K>) => {

  return (
    <table className="table-autop-4 w-full bg-gray-50 rounded border border-gray-200 dark:border-gray-600 dark:bg-gray-700" >
      <TableHeader columns={columns} />
      <CustomTableRows
        data={data}
        columns={columns}
      />
    </table>
  );
};

export default Table;
