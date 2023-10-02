import { statSync, readFileSync, readdirSync, copyFileSync } from "node:fs";

/**
 * Load GraphQL schema from .gql / .graphql files
 *
 * ```js
 * let typeDefs = loadGraphQL("schema.graphql", "response.gql", "graphql-types");
 * ```
 *
 * @since v1.0.0
 * @param ...schema string[]
 * @returns Promise<string>
 */
function loadGraphQL(...schema: string[]) {
  let res: string = "";

  for (let schemaSource of schema) {
    res += `${readSource(schemaSource)}\n`;
  }

  return res;
}

function readSource(source: string) {
  let stat = statSync(source);

  if (stat.isFile()) {
    if (source.includes(".gql") || source.includes(".graphql")) {
      let content = readFileSync(source);
      return content.toString("utf-8");
    }
    return "";
  } else if (stat.isDirectory()) {
    let content: string = "";

    for (let src of readdirSync(source)) {
      content += readSource(`${source}/${src}`);
    }

    return content;
  } else {
    throw new Error("ERROR: The source is neither file nor directory");
  }
}

export default loadGraphQL;
