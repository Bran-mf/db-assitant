import React, { useState } from "react";
import { parsedTable } from "../Conf/Interfaces/ParsedTables";
import {
  ALTER_TABLE_PARTS,
  ATT_PARTS,
  ROOT_REGEX,
  TABLE_ATTRIBUTES,
} from "../Conf/regexs";
import { SQL_KEYS } from "../Conf/sqlKeys";

const useParseFile = () => {
  const [file, setFile] = useState<Array<parsedTable>>();

  const handleOpenFile = async (event: any) => {
    if (!event.target.files) return;
    const file = await event.target.files[0].text();
    const parsedFile = parseFile(file);

    setFile(parsedFile);
  };

  const parseFile = (fileText: string) => {
    const parsedFile = fileText.match(ROOT_REGEX) || [];
    const parsedEntities = parseToEntities(parsedFile);
    return applyConstrains(parsedEntities);
  };

  const applyConstrains = (parsedEntities: {
    tables: Array<any>;
    constrains: Array<any>;
  }) => {
    const contrains = parsedEntities.constrains.reduce((acc, contrain) => {
      acc[contrain.tableName] = [
        ...(acc[contrain.tableName] ? acc[contrain.tableName] : []),
        contrain,
      ];
      return acc;
    }, {});
    return parsedEntities.tables.map((table) => {
      const constrainx = contrains[table.tableName];
      if (!constrainx) return table;

      //falta filtrar aca

      return constrainx.reduce(
        (acc: any, constrain: any) => {
          if (constrain.type === "PRIMARY KEY") {
            return {
              ...acc,
              tableAttributes: {
                ...acc.tableAttributes,
                [constrain.PK_name]: {
                  ...acc.tableAttributes[constrain.PK_name],
                  isPrimary: true,
                },
              },
            };
          }
          if (constrain.type === "FOREIGN KEY") {
            return {
              ...acc,
              tableAttributes: {
                ...acc.tableAttributes,
                [constrain.FK_name]: {
                  ...acc.tableAttributes[constrain.FK_name],
                  FK_info: {
                    name: constrain.constrainName,
                    target_key: constrain.targetID,
                    target_table: constrain.targetTable,
                  },
                },
              },
            };
          }
        },
        { ...table }
      );
    });
  };
  const parseToEntities = (documentParts: string[]) => {
    return documentParts.reduce(
      (acc, line) => {
        if (line.startsWith("CREATE TABLE")) {
          const parsedTable = handleParseTables(line);
          acc.tables.push(parsedTable);
          return acc;
        }
        if (line.startsWith("ALTER TABLE")) {
          const contrainsToArrays = line.match(/.+/g) as Array<string>;
          const tableName = contrainsToArrays[0].match(/\w+/g) as Array<string>;
          contrainsToArrays.slice(1).forEach((constrainAsArr) => {
            const algo = parseConstrains(tableName[2], constrainAsArr);
            if (algo.type !== "INDEX") {
              acc.constrains.push(algo);
            }
          });

          return acc;
        }
        return acc;
      },
      { tables: [], constrains: [] } as any
    );
  };
  const parseConstrains = (tableName: string, constrainInstruction: string) => {
    const constrainAsArrayString = constrainInstruction.match(
      ALTER_TABLE_PARTS
    ) as Array<string>;
    // fild 6 is what what is adding it could be FK or PK
    if (constrainAsArrayString[3] === "FOREIGN KEY") {
      return {
        type: "FOREIGN KEY",
        tableName: removeBackTicks(tableName),
        constrainName: constrainAsArrayString[2],
        FK_name: removeBackTicks(constrainAsArrayString[4]),
        targetTable: removeBackTicks(constrainAsArrayString[6]),
        targetID: removeBackTicks(constrainAsArrayString[7]),
      };
    }
    if (constrainAsArrayString[1] === "PRIMARY KEY") {
      return {
        type: "PRIMARY KEY",
        tableName: removeBackTicks(tableName),
        constrainName: "PRIMARY KEY",
        PK_name: removeBackTicks(constrainAsArrayString[2]),
      };
    }
    return {
      type: "INDEX",
      // i had to continue this, but not today...
    };
  };

  const handleParseFKConstrain = (addConstrainInstruction: string) => {};

  //parse table fields to array of string, each element in the array is 1 hole attribute
  const handleParseTables = (lineText: string) => {
    const tableName = (lineText.match(/\w+/g) as Array<string>)[2];

    const tableAttributes = getTableAttributes(lineText)
      .match(TABLE_ATTRIBUTES)
      ?.map((att_line) => att_line.match(ATT_PARTS));

    return {
      tableName,
      tableAttributes: tableToObject(tableAttributes as [][]),
    };
  };

  const getTableAttributes = (tableAsString: string) =>
    tableAsString.slice(
      tableAsString.indexOf("(") + 1,
      tableAsString.lastIndexOf(")")
    );

  const numberOfTables = (): number => {
    return file?.length || 0;
  };
  const isSQLKey = (posibleKey: string) =>
    [...(Object.values(SQL_KEYS) as string[])].includes(posibleKey);

  const removeBackTicks = (word: string) =>
    (word.match(/\w+/) as Array<string>)[0];
  const removeEndLine = (stringLine: string) =>
    stringLine.replace(/(\r\n|\n|\r)/gm, "");

  const tableToObject = (tableContentAsArray: string[][]) => {
    const tableAsObject = tableContentAsArray.reduce((acc, attAsArray) => {
      if (isSQLKey(attAsArray[0])) {
        // 0 = instruction, 1 = name of key = 2 it could be (algo) or (`algo`)
        if (attAsArray[0] === SQL_KEYS.KEY) {
          const attributeName = (
            attAsArray[2].match(/\w+/) as Array<string>
          )[0];
          acc[attributeName] = {
            ...acc[attributeName],
            indexName: attAsArray[1],
          };
          return acc;
        }
        if (attAsArray[0] === SQL_KEYS.PRIMARY) {
          const attributeName = attAsArray[2].match(/\w+/g) as Array<string>;
          attributeName.forEach((attName) => {
            acc[attName] = { ...acc[attName], isPrimary: true };
          });
          return acc;
        }
        // 0 type 1= nane 2 action
        if (attAsArray[0] === SQL_KEYS.CONSTRAINT) {
          if (attAsArray[2] === SQL_KEYS.FOREIGN_KEY) {
            const constrainName = removeBackTicks(attAsArray[1]);
            const attributeName = removeBackTicks(attAsArray[3]);
            const targetKey = removeBackTicks(attAsArray[6]);
            const targetTable = removeBackTicks(attAsArray[5]);

            acc[attributeName] = {
              ...acc[attributeName],
              FK_info: {
                name: constrainName,
                target_key: targetKey,
                target_table: targetTable,
              },
            };
            return acc;
          }
        }

        if (attAsArray[0] === SQL_KEYS.ALTER) {
        }
      }
      const tableName = removeBackTicks(attAsArray[0]);
      acc[tableName] = { name: tableName, conf: attAsArray.slice(1) };
      return acc;
    }, {} as any);
    return tableAsObject;
  };
  return { handleOpenFile, file };
};

export default useParseFile;
