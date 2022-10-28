// export const CREATE_TABLE =/CREATE TABLE (\w*|`\w`)(?s).*;/gU
 const TABLES = new RegExp('CREATE TABLE (\w*|`\w`) ?\(.*?\)\s?;','sg');
 const CREATE_INDEX = new RegExp('CREATE (UNIQUE)? ?INDEX .*?;','sg')
 const ALTER_TABLE = new RegExp('ALTER TABLE (\w*|`\w`).*?;','sg')

 export const TABLE_ATTRIBUTES = new RegExp(/(`\w+`|\w+|'\w) ((\w+ ?\(.+?\))|\w+) ?(.+ ?)+/,'g')
export const ROOT_REGEX = new RegExp(TABLES.source+"|"+CREATE_INDEX.source+"|"+ALTER_TABLE.source,'sg')


//table attribvutes
// (FOREIGN KEY)|(\w+|`\w+`)|\w*\(.*?\)
export const ATT_PARTS = new RegExp(/(FOREIGN KEY)|(\w+|`\w+`)|\w*\(.*?\)|' ?.+ ?'| " ?.+ ?"/,'g')
export const ALTER_TABLE_PARTS = new RegExp(/(FOREIGN KEY)|(PRIMARY KEY)|(\w+|`\w+`)|\w*\(.*?\)/,'g')
