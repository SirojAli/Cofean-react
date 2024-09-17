module.exports = {
  apps: [
    {
      name: "COFEAN-REACT",
      script: "C:/Users/siroj/AppData/Local/Yarn/bin/serve.cmd",
      args: "-s build",
      interpreter: "cmd",
      cwd: "C:/Users/siroj/Desktop/cofean-react",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};
