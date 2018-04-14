
const fs = require("fs")



function writeMapTable(callList, state)
{
    let translationMap = {}

    for (var i = 0; i < callList.length; i++)
    {
        let callInfo = callList[i]
        let preFixed = ""
        let key = ""
        //多参数
        if (typeof callInfo.functionArgs == "object" || typeof callInfo.functionArgs == "array")
        {
            preFixed = "$$$" + callInfo.functionArgs[0] + "="
            key = callInfo.functionArgs[1]
        } else
        {
            key = callInfo.functionArgs
        }

        translationMap[preFixed + key] = key
    }

    if (!fs.existsSync("local"))
    {
        fs.mkdirSync("local")
    }

    if (state.opts.exportRaw)
    {
        fs.writeFileSync("local/ExportRaw." + Math.random() + ".json", JSON.stringify({
            callList: callList,
        }, null, 4))
    } else
    {
        let nowJson = {translationMap: {}}
        if (fs.existsSync("local/Export.language.json"))
        {
            try
            {
                nowJson = JSON.parse(fs.readFileSync("local/Export.language.json"))
            }catch (e)
            {
                nowJson = {translationMap: {}}
            }
        }

        fs.writeFileSync("local/Export.language.json", JSON.stringify({
            translationMap: Object.assign(nowJson.translationMap, translationMap),
        }, null, 4))
    }
}

export default writeMapTable
