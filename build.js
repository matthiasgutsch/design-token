const StyleDictionaryPackage = require('style-dictionary');

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

function getStyleDictionaryConfig(brand) {
    return {

        "source": [
            `src/brands/${brand}/*.json`, 
            "src/globals/**/*.json",],
        "platforms": {
          "base": {
            "transformGroup": "scss",
            "buildPath": "src/assets/",
            "files": [
              {
                "destination": "default.scss",
                "format": "scss/variables",
              }
            ]
          },
          "flint": {
            "transformGroup": "scss",
            "buildPath": "src/assets/flint/",
            "files": [
              {
                "destination": "colors.scss",
                "format": "scss/variables",
              }
            ]
          },
          "datacolor": {
            "transformGroup": "scss",
            "buildPath": `src/assets/${brand}/`,
            "files": [
              {
                "destination": "colors.scss",
                "format": "scss/variables",
              }
            ]
          }
        }


    };
}

// REGISTER CUSTOM FORMATS + TEMPLATES + TRANSFORMS + TRANSFORM GROUPS

// if you want to see the available pre-defined formats, transforms and transform groups uncomment this
// console.log(StyleDictionaryPackage);

StyleDictionaryPackage.registerFormat({
    name: 'json/flat',
    formatter: function(dictionary) {
        return JSON.stringify(dictionary.allProperties, null, 2);
    }
});


// I wanted to use this custom transform instead of the "prefix" property applied to the platforms
// because I wanted to apply the "token" prefix only to actual tokens and not to the aliases
// but I've found out that in case of "name/cti/constant" the prefix was not respecting the case for the "prefix" part
//
// StyleDictionaryPackage.registerTransform({
//     name: 'name/prefix-token',
//     type: 'name',
//     matcher: function(prop) {
//         return prop.attributes.category !== 'alias';
//     },
//     transformer: function(prop) {
//         return `token-${prop.name}`;
//     }
// });

StyleDictionaryPackage.registerTransform({
    name: 'size/pxToPt',
    type: 'value',
    matcher: function(prop) {
        return prop.value.match(/^[\d.]+px$/);
    },
    transformer: function(prop) {
        return prop.value.replace(/px$/, 'pt');
    }
});

StyleDictionaryPackage.registerTransform({
    name: 'size/pxToDp',
    type: 'value',
    matcher: function(prop) {
        return prop.value.match(/^[\d.]+px$/);
    },
    transformer: function(prop) {
        return prop.value.replace(/px$/, 'dp');
    }
});

StyleDictionaryPackage.registerTransformGroup({
    name: 'styleguide',
    transforms: ["attribute/cti", "name/cti/kebab", "size/px", "color/css"]
});

StyleDictionaryPackage.registerTransformGroup({
    name: 'tokens-js',
    transforms: ["name/cti/constant", "size/px", "color/hex"]
});

StyleDictionaryPackage.registerTransformGroup({
    name: 'tokens-json',
    transforms: ["attribute/cti", "name/cti/kebab", "size/px", "color/css"]
});

StyleDictionaryPackage.registerTransformGroup({
    name: 'tokens-scss',
    // to see the pre-defined "scss" transformation use: console.log(StyleDictionaryPackage.transformGroup['scss']);
    transforms: [ "name/cti/kebab", "time/seconds", "size/px", "color/css" ]
});

StyleDictionaryPackage.registerTransformGroup({
    name: 'tokens-ios',
    // to see the pre-defined "ios" transformation use: console.log(StyleDictionaryPackage.transformGroup['ios']);
    transforms: [ "attribute/cti", "name/cti/camel", "size/pxToPt"]
});

StyleDictionaryPackage.registerTransformGroup({
    name: 'tokens-android',
    // to see the pre-defined "android" transformation use: console.log(StyleDictionaryPackage.transformGroup['android']);
    transforms: [ "attribute/cti", "name/cti/camel", "size/pxToDp"]
});

StyleDictionaryPackage.transformGroup['android'];

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

['base', 'flint', 'datacolor'].map(function(platform) {
    ['base', 'flint', 'datacolor'].map(function(brand) {

        console.log('\n==============================================');
        console.log(`\nProcessing: [${platform}] [${brand}]`);

        const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, platform));

        if (platform === 'base') {
            StyleDictionary.buildPlatform('base');
        } else if (platform === 'flint') {
            StyleDictionary.buildPlatform('flint');
        } 
        StyleDictionary.buildPlatform('datacolor');

        console.log('\nEnd processing');

    })
})

console.log('\n==============================================');
console.log('\nBuild completed!');