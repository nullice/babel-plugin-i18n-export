# babel-plugin-i18n-export

This babel-plugin used to export translation map file into json file from source code. 
`babel-plugin-i18n-export` will check  function identifier (name) in the code and extract parameters.



## Example
 

*source code file*
```js 

i18n("1 繋がるってことが")

i18n("idPath"," ${0} passed, ${1} total ",{0:2, 1:24*5})

vue.i18n(`3  Listen to “Lemonade” from Mili’s new album “Millennium `)
 
```

export *Export.language.json*

```js 
{
    "translationMap": {
        "1 繋がるってことが": "1 繋がるってことが",
        "$$$idPath= ${0} passed, ${1} total ": " ${0} passed, ${1} total ",
        "3  Listen to “Lemonade” from Mili’s new album “Millennium ": "3  Listen to “Lemonade” from Mili’s new album “Millennium ",
    }
}
 
```



## Usage

### Install
```bash
npm i -S babel-plugin-i18n-export
```








