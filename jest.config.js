const { resolve } = require("path")

const rootDir = resolve(__dirname)

/** @typedef {import('ts-jest/dist/types')} */
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  testEnvironment: "node",
  rootDir: "./",
  projects: [`${rootDir}/apps/*`, `${rootDir}/packages/*`],
  transform: {
    ".(js|jsx|ts|tsx)": "@sucrase/jest-plugin",
  },
}
