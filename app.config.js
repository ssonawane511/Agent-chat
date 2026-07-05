const appJson = require("./app.json");

/** @type {import("expo/config").ExpoConfig} */
module.exports = () => {
  const config = {
    ...appJson,
    expo: {
      ...appJson.expo,
      experiments: {
        ...appJson.expo.experiments,
      },
    },
  };

  if (process.env.PLATFORM === "web" && process.env.EXPO_BASE_URL) {
    config.expo.experiments.baseUrl = process.env.EXPO_BASE_URL;
  }

  return config;
};
