import fs from "fs";
import Ajv from "ajv";
import path from "path";
import { glob } from "glob";
import invariant from "tiny-invariant";

async function main() {
  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
  });

  const schema = JSON.parse(fs.readFileSync("src/echo.schema.json", "utf8"));

  const validate = ajv.compile(schema);

  try {
    const files = glob.sync("src/agents/**/echo.json");

    if (files.length === 0) {
      console.log("No echo.json files found");
      return;
    }

    console.log(`Found ${files.length} echos to validate\n`);

    let crash = false;

    files.forEach((file) => {
      const name = path.dirname(file).split("/").at(-1);

      invariant(name, "Invalid echo name");

      try {
        console.log(`[validation] Validating ${name}...`);
        const data = JSON.parse(fs.readFileSync(file, "utf8"));

        if (validate(data)) {
          console.log(`[validation] ✅ ${name} is valid\n`);
        } else {
          crash = true;
          console.error(`[validation] ❌ ${name} is invalid`);
          validate.errors?.forEach((error) => {
            console.error(`  - ${error.instancePath} ${error.message}`);
          });
          console.error("");
        }
      } catch (error) {
        crash = true;
        console.error(`❌ Error processing ${name}:`, error.message, "\n");
      }
    });

    if (crash) {
      process.exit(1);
    }

    console.log("[validation] All echo.json files are valid! 🎉");
  } catch (error) {
    console.error("[validation] Error during validation:", error);
    process.exit(1);
  }
}

main();
