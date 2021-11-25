module.exports = async () => {
  return {
    verbose: true,
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
      "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
    },
  };
};
