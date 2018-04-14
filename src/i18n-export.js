// Created by nullice on 2018/04/13 - 11:35
const fs = require("fs")

let callList = []

import writeMapTable from "./lib/writeMapTable"

export default function ({types: t}) {
    return {
        visitor: {
            CallExpression: {
                enter (path, state)
                {
                    let findName = state.opts.functionName || "i18n"
                    if (path.type === "CallExpression" && path.node.callee)
                    {
                        let node = path.node

                        let functionName = null
                        if (node.callee.type == "MemberExpression" && node.callee.property)
                        {
                            functionName = node.callee.property.name
                        } else
                        {
                            functionName = node.callee.name
                        }
                        if (node.callee && functionName === findName)
                        {

                            let functionArgs = []

                            if (node.arguments)
                            {

                                node.arguments.forEach((arg) => {
                                        if (arg.type === "StringLiteral")
                                        {
                                            functionArgs.push(arg.value)
                                        }
                                        else if (arg.type === "NumericLiteral")
                                        {
                                            functionArgs.push(arg.value)
                                        }
                                        else if (arg.type === "TemplateLiteral")
                                        {
                                            functionArgs.push(parseTemplateLiteral(arg))
                                        }
                                    },
                                )
                            }

                            if (functionArgs.length === 1)
                            {
                                functionArgs = functionArgs[0]
                            }

                            let callInfo = {
                                functionName,
                                functionArgs,
                            }

                            callList.push(callInfo)
                        }

                    }

                },
            },
        },
        //导出翻译表
        post (state)
        {
            console.log("callList", callList)
            console.log("findName", findName)
            writeMapTable(callList, state)

        },
    }
}

function parseTemplateLiteral (templateLiteral)
{
    let text = ""
    for (let i = 0; i < templateLiteral.quasis.length; i++)
    {
        let quasi = templateLiteral.quasis[i]

        text += quasi.value.cooked
        if (templateLiteral.expressions[i])
        {

            text += "${" + i + "}"
        }

    }
    return text
}


