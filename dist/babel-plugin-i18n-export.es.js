function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var fs = require("fs");

function writeMapTable(callList, state) {
  var translationMap = {};

  for (var i = 0; i < callList.length; i++) {
    var callInfo = callList[i];
    var preFixed = "";
    var key = ""; //多参数

    if (_typeof(callInfo.functionArgs) == "object" || typeof callInfo.functionArgs == "array") {
      if (callInfo.functionArgs.length == 2 && _typeof(callInfo.functionArgs[1]) == "object") {
        // i18n("xx${0}xx",{0:1})
        key = callInfo.functionArgs[0];
      } else {
        preFixed = "$$$" + callInfo.functionArgs[0] + "=";
        key = callInfo.functionArgs[1];
      }
    } else {
      key = callInfo.functionArgs;
    }

    translationMap[preFixed + key] = key;
  }

  if (!fs.existsSync("local")) {
    fs.mkdirSync("local");
  }

  if (state.opts.exportRaw) {
    fs.writeFileSync("local/ExportRaw." + Math.random() + ".json", JSON.stringify({
      callList: callList
    }, null, 4));
  } else {
    var nowJson = {
      translationMap: {}
    };

    if (fs.existsSync("local/Export.language.json")) {
      try {
        nowJson = JSON.parse(fs.readFileSync("local/Export.language.json"));
      } catch (e) {
        nowJson = {
          translationMap: {}
        };
      }
    }

    fs.writeFileSync("local/Export.language.json", JSON.stringify({
      translationMap: Object.assign(nowJson.translationMap, translationMap)
    }, null, 4));
  }
}

// Created by nullice on 2018/04/13 - 11:35
var fs$1 = require("fs");

var callList = [];
function i18nExprot (_ref) {
  var t = _ref.types;
  return {
    visitor: {
      CallExpression: {
        enter: function enter(path, state) {
          var findName = state.opts.functionName || "i18n";

          if (path.type === "CallExpression" && path.node.callee) {
            var node = path.node;
            var functionName = null;

            if (node.callee.type == "MemberExpression" && node.callee.property) {
              functionName = node.callee.property.name;
            } else {
              functionName = node.callee.name;
            }

            if (node.callee && functionName === findName) {
              var functionArgs = [];

              if (node.arguments) {
                node.arguments.forEach(function (arg) {
                  if (arg.type === "StringLiteral") {
                    functionArgs.push(arg.value);
                  } else if (arg.type === "NumericLiteral") {
                    functionArgs.push(arg.value);
                  } else if (arg.type === "TemplateLiteral") {
                    functionArgs.push(parseTemplateLiteral(arg));
                  }
                });
              }

              if (functionArgs.length === 1) {
                functionArgs = functionArgs[0];
              }

              var callInfo = {
                functionName: functionName,
                functionArgs: functionArgs
              };
              callList.push(callInfo);
            }
          }
        }
      }
    },
    //导出翻译表
    post: function post(state) {
      console.log("callList", callList);
      console.log("findName", findName);
      writeMapTable(callList, state);
    }
  };
}

function parseTemplateLiteral(templateLiteral) {
  var text = "";

  for (var i = 0; i < templateLiteral.quasis.length; i++) {
    var quasi = templateLiteral.quasis[i];
    text += quasi.value.cooked;

    if (templateLiteral.expressions[i]) {
      text += "${" + i + "}";
    }
  }

  return text;
}

// Created by nullice on 2018/04/10 - 14:17

export default i18nExprot;
