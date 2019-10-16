#!/usr/bin/env node

import { success, error, info } from "signale";
import { generate } from "./generator";
import { readJsonSync } from "fs-extra";
import { join } from "path";
import minimist from "minimist";

const args = minimist(process.argv.slice(2), {
  boolean: ["v", "version", "d", "dev", "h", "help"]
});

const staartSite = async () => {
  return await generate();
};

if (args.version) {
  info(
    `Staart Site version: ${
      readJsonSync(join(__dirname, "..", "package.json")).version
    }`
  );
  process.exit(0);
} else if (args.help) {
  process.stdout.write(`usage: @staart/site [options]
  Options:
    -v, --version                 Print the version
    -h, --help                    Print this help
  Examples:
    $ @staart/site
    $ @staart/site -v
`);
  process.exit(0);
} else {
  const startTime = new Date().getTime();
  staartSite()
    .then(() =>
      success(
        `Start Site built in ${(
          (new Date().getTime() - startTime) /
          1000
        ).toFixed(2)}s`
      )
    )
    .catch(err => error(err));
}
