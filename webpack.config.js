const path = require("path")
const PACKAGE_JSON = require("./package.json")
const PACKAGE_NAME = PACKAGE_JSON.fullName
const fs = require("fs")

let config = []

// 打包 node 和 web 2 种
const ENTRY_WEB = "./src/index.js"
const ENTRY_NODE = "./src/index.js"


if (fs.existsSync(ENTRY_NODE))
{

    let babel_loader = {
        loader: "babel-loader",
        options: {
            // plugins: ['transform-runtime'],
            presets: [
                [
                    "@babel/preset-env", {
                    "targets": {
                        "node": "1.2",
                    },
                    "modules": false,
                }]],
        },
    }
    config.push({
        entry: ENTRY_NODE,
        mode: "development",
        target: "node",
        output: {
            library: PACKAGE_NAME,
            libraryTarget: "umd",
            libraryExport: "default",
            filename: PACKAGE_NAME + ".bundle-node.js",
            path: path.resolve(__dirname, "dist"),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: babel_loader,

                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        babel_loader,
                        {
                            loader: "ts-loader",
                            options: {
                                transpileOnly: true,
                            },
                        },
                    ],
                },

            ],

        },
    })
}

module.exports = config
