import { Element } from '../react/element'
import $ from 'jquery'
class Unit {
    constructor (element) {
        this._currentElement = element
    }
    getMarkUp () {
        throw Error('此方法不能被调用')
    }
}
class TextUnit extends Unit {
    getMarkUp (reactid) {
        this._reactid = reactid
        return `<span data-reactid="${reactid}">${this._currentElement}</span>`
    }
}
class CompositeUnit extends Unit {
    update(nextElement, partialState){
        this._currentElement = nextElement || this._currentElement
        // nextState
        let nextState = Object.assign(this._componentInstance.state, partialState)
        // nextProps
        let nextProps = this._currentElement.props
        // shouldComponentUpdate
        let shouldComponentUpdate = this._componentInstance.shouldComponentUpdate
        if(shouldComponentUpdate && !shouldComponentUpdate(nextProps, nextState)) return

        // start to update
        // get the pre unit
        let preRenderedUnitInstance = this._renderedUnitInstance
        // get the pre element
        let preRenderedElement =  preRenderedUnitInstance._currentElement;
        // get the next element
        let nextRenderElement = this._componentInstance.render()
        // prepare the new element with the old element deeply
        if(shouldDeepCompare(preRenderedElement, nextRenderElement)){

        } else {
            this._renderedUnitInstance = create
        }
    }
    getMarkUp(reactid){
        this._reactid = reactid
        let { type: Component, props } = this._currentElement
        let componentInstance = this._componentInstance = new Component(props)
        
        componentInstance._currentUnit = this
        // componentWillMount
        componentInstance.componentWillMount && componentInstance.componentWillMount()
        // render
        let renderedElement = componentInstance.render()
        // createUnit
        let renderedUnitInstance = this._renderedUnitInstance = createUnit(renderedElement)
        // getMarkUp
        let renderedMarkUp = renderedUnitInstance.getMarkUp(this._reactid)
        // componentDidMount
        $(document).on('mounted', ()=>{
            componentInstance.componentDidMount && componentInstance.componentDidMount()
        })
        return renderedMarkUp;
    }
}
class NativeUnit extends Unit {
    getMarkUp(reactid){
        this._reactid = reactid
        let { type, props } = this._currentElement
        let tagStart = `<${type} data-reactid="${this._reactid}" `
        let childString = ''
        let tagEnd = `</${type}>`
        this._renderedChildrenUnits = []
        //{id:'sayHello',onClick:sayHello,style:{color:'red',backgroundColor:'green'}},children:['say',{type:'b',{},'Hello'}]
        for(let propName in props) {
            if(/^on[A-Z]/.test(propName)){
                let eventName = propName.slice(2).toLowerCase()
                $(document).delegate(`[data-reactid="${this._reactid}"]`,`${eventName}.${this._reactid}`,props[propName])
            } else if (propName === 'style') {
                let styleObj = props[propName]
                let styleStr = Object.entries(styleObj).map(([attr, value])=>{
                    return `${attr.replace(/[A-Z]/, m => `-${m.toLowerCase()}`)}:${value}`
                })
                tagStart += ` style=${styleStr} `
            } else if (propName === 'className') {
                tagStart += ` class="${props[propName]}" `
            } else if (propName === 'children') {
                let children = props[propName]
                children.forEach((child, index) => {
                    let childUnit = createUnit(child)
                    childUnit._mountIndex = index
                    this._renderedChildrenUnits.push(childUnit)
                    let childMarkUp = childUnit.getMarkUp(`${this._reactid}.${index}`)
                    childString += childMarkUp
                })
            } else {
                tagStart += ` ${propName}=${props[propName]} `
            }
        }
        return tagStart + '>' + childString + tagEnd
    }
}
function createUnit (element) {
    if(['string', 'number'].includes(typeof element)){
        return new TextUnit(element)
    }
    if(element instanceof Element && typeof element.type === 'string'){
        return new NativeUnit(element)
    }
    if(element instanceof Element && typeof element.type === 'function'){
        return new CompositeUnit(element)
    }
}
export {
    createUnit
}