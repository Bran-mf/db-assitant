export interface parsedTable {
  tableName: string;
  tableAttributes: {
    [key: string]: {
      name: string;
      conf: string[];
      isPrimary?: boolean;
      FK_info?: { name: string; target_key: string; target_table: string };
    };
  };
}
