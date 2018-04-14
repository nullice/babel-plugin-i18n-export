# babel-plugin-i18n-export
<p align="center"> <img src="https://github.com/nullice/zero-jslib/raw/master/logo.png"> </p>

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
npm i -S babel-plugin-i18n-export
```








