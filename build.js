const StyleDictionaryPackage = require("style-dictionary");

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

function getStyleDictionaryConfig(brand) {
  return {
    source: [`src/brands/${brand}/*.json`, "src/globals/**/*.json"],
    platforms: {
      base: {
        transformGroup: "scss",
        buildPath: `src/assets/${brand}/`,
        files: [
          {
            destination: "styles.scss",
            format: "scss/variables",
          },
        ],
      },
      flint: {
        transformGroup: "scss",
        buildPath: `src/assets/${brand}/`,
        files: [
          {
            destination: "styles.scss",
            format: "css/variables",
          },
        ],
      },
      datacolor: {
        transformGroup: "scss",
        buildPath: `src/assets/${brand}/`,
        files: [
          {
            destination: "styles.scss",
            format: "scss/variables",
          },
        ],
      },
    },
  };
}

["base", "flint", "datacolor"].map(function (platform) {
  ["base", "flint", "datacolor"].map(function (brand) {
    console.log("\n==============================================");
    console.log(`\nProcessing: [${platform}] [${brand}]`);

    const StyleDictionary = StyleDictionaryPackage.extend(
      getStyleDictionaryConfig(brand, platform)
    );

    if (platform === "base") {
      StyleDictionary.buildPlatform("base");
    } else if (platform === "flint") {
      StyleDictionary.buildPlatform("flint");
    }
    StyleDictionary.buildPlatform("datacolor");

    console.log("\nEnd processing");
  });
});

console.log("\n==============================================");
console.log("\nBuild completed!");

