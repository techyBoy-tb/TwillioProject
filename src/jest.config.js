const esModules = ['ngx-simple-crypt', '@ng-idle/core'].join('|');

module.exports = {
    globals: {
        "ts-jest": {
            "allowSyntheticDefaultImports": true,
            "tsConfig": "src/tsconfig.spec.json",
        }
    },


    transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
    testPathIgnorePatterns: [
        "<rootDir>/dist",
    ],
    "transform": {
        "^.+\\.js$": "babel-jest"
    },
    verbose: true,
    collectCoverage: true,
    coverageDirectory: "<rootDir>/coverage/",
    // coverageThreshold: {
    //     "global": {
    //         "branches": 65,
    //         "functions": 80,
    //         "lines": 80,
    //         "statements": 80
    //     }
    // },
    coverageThreshold: {
        "global": {
            "branches": 25,
            "functions": 20,
            "lines": 20,
            "statements": 20
        }
    },
    watchPlugins: [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname"
    ],
    collectCoverageFrom: [
        "**/app/**/*.ts",
        "!**/*.module.ts",
        "!**/app/auth/state/auth.query.ts",
        "!**/app/auth/state/auth.store.ts",
        "!**/app/auth/state/index.ts",
        "!**/app/auth/storage.ts",
        "!**/app/model/**/*.model.ts",
        "!**/app/model/**/*.enum.ts",
        "!**/app/model/**/*.ts",

    ]
};