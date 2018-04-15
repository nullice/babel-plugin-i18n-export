
function i18n()
{

}


i18n("1_a111")
i18n("id","2_hi",{0:123, 1:"123"})


class test {
    constructor (){

        this.i18n("3_classThis")
    }
    i18n(){}
}

var n =new test()


test.i18n("4_nnn${0}",{0:123})
n.i18n("5_xxx")
n.i18n(`6_xxx`)
n.i18n(`7_O${1+1}A${2+2}`)
n.i18n(`8 KKK`,{0:123})
