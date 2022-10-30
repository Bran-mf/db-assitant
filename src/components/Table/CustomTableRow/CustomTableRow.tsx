import { ColumnDefinitionType } from "../Table";

type CustomTableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
};

const CustomTableRows = <T, K extends keyof T>({
  data,
  columns,
}: CustomTableRowsProps<T, K>): JSX.Element => {
  const rows = data.map((row, index) => {
    return (
      <tr key={`row-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        {columns.map((column, index2) => (
          <td key={`cell-${index2}`}>{row[column.key] as any}</td>
        ))}
      </tr>
    );
  });

  return <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >{rows}</tbody>;
};

export default CustomTableRows;
