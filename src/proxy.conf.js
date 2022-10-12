var process = require("process");

const PROXY_CONFIG = [
  {
    context: ["/issues*"],
    target: "https://projects.imatia.com",
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
  },
];

module.exports = PROXY_CONFIG;
