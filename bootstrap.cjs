if (!process.env.NODE_ENV)
  process.env.NODE_ENV = process.argv.includes("--debug")
    ? "dev"
    : "production";

process.env.TS_NODE_PROJECT = require("path").resolve(
  __dirname,
  "tsconfig.json"
);

require("tsconfig-paths").register();

if (!process.argv.some((arg) => arg.toLowerCase() === "-no-clear"))
  console.clear();

try {
  require(process.env.NODE_ENV === "dev" ? "./src/" : "./dist/");
} catch (ex) {
  console.error(ex);
  console.error(
    "Make sure you've compiled your project before asking for any help. For further assistance, see github.com/c-harlotte/yaycat/issues"
  );
}
