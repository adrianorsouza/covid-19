
export default {
  name: process.env.REACT_APP_NAME || ``,
  env: process.env.NODE_ENV,
  version: process.env.REACT_APP_VERSION,
  consoleLogRequests: false,
};
