module.exports = {
  apps: [
    {
      name: "Cofean-react",
      script: "node_modules/.bin/react-scripts",
      args: "start",
      interpreter: "none", // No need to specify node interpreter as react-scripts does this
      env: {
        NODE_ENV: "development",
      },
      // Make sure to set this as 'none' to use the script directly
      interpreter_args: "--require dotenv/config",
    },
  ],
};
