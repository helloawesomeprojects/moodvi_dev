module.exports = {
  apps: [
    {
      name: "Moodvi",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
