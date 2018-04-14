# babel-plugin-i18n-export
[![Build Status](https://travis-ci.org/nullice/babel-plugin-i18n-export.svg?branch=master)](https://travis-ci.org/nullice/babel-plugin-i18n-export)


<p align="center"> <img src="https://github.com/nullice/babel-plugin-i18n-export/raw/master/logo.png"> </p>

This babel-plugin used to export translation mapping file into json file from source code.  
`babel-plugin-i18n-export` will check  function identifier (name) in the code and extract parameters.  
you can use the exported translation mapping for the next phase of translation work, instead of manually write the translation mapping.


## Example
 

*source code file*
```js 

i18n("1 繋がるってことが")

i18n("idPath"," ${0} passed, ${1} total ",{0:2, 1:24*5})

vue.i18n(`3  Listen to “Lemonade” from Mili’s new album “Millennium” `)
 
```

exported *Export.language.json*

```js 
{
    "translationMap": {
        "1 繋がるってことが": "1 繋がるってことが",
        "$$$idPath= ${0} passed, ${1} total ": " ${0} passed, ${1} total ",
        "3  Listen to “Lemonade” from Mili’s new album “Millennium” ": "3  Listen to “Lemonade” from Mili’s new album “Millennium” ",
    }
}
 
```

## Usage

### Install

```bash
npm i -D @nullice/babel-plugin-i18n-export
```


### Configurate Babel

your *.babelrc* or elsewhere babel config

```diff
{
  "presets": [
      "@babel/preset-env",
  ],
  + plugins:["@nullice/babel-plugin-i18n-export"]
}
```


```diff
{
  "presets": [
      "@babel/preset-env",
  ],
  + plugins:[["@nullice/babel-plugin-i18n-export",{functionName:'$i18n'}]]
}
```

### Just run without *.babelrc*

If you don't want to add it to your workflow, you just can run it with bable cli

```bash
$ npx babel src  --plugins=@nullice/babel-plugin-i18n-export
```

> if you can't find `npx` command try `npm install -g npx`


### Exprot file

The exported file is placed in the `local` folder under the project directory.
``` bash
ProjectDirectory
    - local
        - Export.language.json

```


## Rule

### General Literal

your source code

```js
i18n("Your General Literal")

// in translationMap: 
// "Your General Literal"
```

### Path Literal
If the target function has 2 parameters, and the second parameter is not an Object, the first parameter will be taken as the Path，it can distinguish between two literally the same text.

your source code

```js
i18n("home/page1","Your General Literal")
i18n("home/setting","Your General Literal")

// in translationMap: 
// "$$$home/page1=Your General Literal"
// "$$$home/setting=Your General Literal" 
```

### Variable Literal

If the target function has 2 parameters and last parameter is not Object, and has 3 parameters, This literal will be treated as variable literal, which is supported by some i18n tools.

```js
i18n("home/page1","Your ${0} Literal", {0:1+1})
i18n("Your ${0} Literal", {0:1+1})

// in translationMap: 
// "$$$home/page1=Your ${0} Literal"
// "Your ${0} Literal"
```


## Options

### `functionName`
assign a function identifier (name) for extract parameters.

defualt:`18n`



