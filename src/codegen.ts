import fs from "fs";
import path from "path";
import prettier from "prettier";
import process from "process";

const main = async () => {
  const filename = "echo.json";

  const paths = {
    agents: path.join(process.cwd(), "src/agents"),
    entry: path.join(process.cwd(), "src/echos.ts"),
  };

  const directories = fs.readdirSync(paths.agents);

  const list = directories.map((directory) => {
    const metadata = path.join(paths.agents, directory, filename);

    if (!fs.existsSync(metadata)) {
      console.error(
        `Metadata file not found for agent ${directory} ${metadata}`
      );
      process.exit(1);
    }

    const variable = `_${directory}`;

    const relative = `./agents/${directory}/${filename}`;

    return {
      id: directory,
      filename,
      variable,
      relative,
      literal: `import ${variable} from '${relative}'`,
    };
  });

  list.forEach((data) => {
    console.log(`[codegen] Including ${data.id} to the entry file`);
  });

  const output = await prettier.format(
    `
    ${list.map((data) => data.literal).join("\n")}

    const echos = [
        ${list
          .map((data) => {
            return data.variable;
          })
          .join(",\n")}
    ]

    export { echos };
`,
    { parser: "babel" }
  );

  console.log(`[codegen] Codegen complete, writing to ${paths.entry}`);

  fs.writeFileSync(paths.entry, output, { encoding: "utf-8" });
};

main();
