const path = require("path")

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")],
  },
}

module.exports = nextConfig
