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

  if (process.env.PLATFORM === "web") {
    const baseUrl = process.env.EXPO_BASE_URL ?? "/";
    if (baseUrl !== "/") {
      config.expo.experiments.baseUrl = baseUrl;
    }
  }

  return config;
};
