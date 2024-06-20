#!/usr/bin/env node

import qrcode from "qrcode-terminal";
import fs from "node:fs";

const cwd = process.cwd();

// args contains env path
const [, , ...args] = process.argv;

const path = args[0];

const envPath = `${cwd}/${path ? path : ".env"}`;

// check if file exists
if (!fs.existsSync(envPath)) {
  console.error("File does not exist");
  process.exit(1);
}

const env = fs.readFileSync(envPath, "utf8");

const envArray = env.split("\n");

const envObject: Record<string, string> = {};

envArray.forEach((env) => {
  const [key, value] = env.split("=");
  if (!key || !value) return;
  envObject[key] =
    value.startsWith('"') && value.endsWith('"') ? value.slice(1, -1) : value;
});

const terminalWidth = process.stdout.columns;

console.log("=".repeat(terminalWidth));

// print qr code for every key value pair
Object.entries(envObject).forEach(([key, value]) => {
  console.log(`Key: ${key}, Value: ${value}`);
  qrcode.generate(value, { small: true });
  console.log("=".repeat(terminalWidth));
});
