class Parent {
    constructor( element ){
        this._currentElement = element
    }
    getElement(){
        console.log(this._currentElement)
    }
}
class Child extends Parent {
    constructor(element){
        super(element)
    }
    getElement2 = function () {
        console.log(this._currentElement)
    }
}

const child = new Child('eee')
child.getElement2()