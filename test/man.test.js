// Created by nullice on 2018/04/11 - 19:44
var babel = require("babel-core")
var  fs =require("fs")
console.log("123")

async function bb ()
{
    try
    {
        fs.unlinkSync(__dirname + "/../local/Export.language.json")
    }catch (e)
    {

    }

    return new Promise((resolve, reject) => {

        babel.transformFile(__dirname + "/sample.js", {
            plugins: [[__dirname + "/../dist/babel-plugin-i18n-export.cjs.js", {functionName: "i18n"}]],

        }, function (err, result) {

            resolve(result)

        })
    })

}

test("babel-plugin-i18n-export", async () => {

    var result = await  bb()

    var json = require(__dirname + "/../local/Export.language.json")

    expect(typeof json).toBe("object")


    var ob = {  "translationMap": {
            "1_a111": "1_a111",
            "$$$id=2_hi": "2_hi",
            "3_classThis": "3_classThis",
            "4_nnn${0}": "4_nnn${0}",
            "5_xxx": "5_xxx",
            "6_xxx": "6_xxx",
            "7_O${0}A${1}": "7_O${0}A${1}",
            "8 KKK": "8 KKK"
        }
    }
    expect(json).toEqual(ob)


})
