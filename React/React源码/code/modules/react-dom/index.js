import $ from 'jquery'
import { createUnit } from './unit'

function render (element, container) {
    let unit = createUnit(element)
    let markup = unit.getMarkUp('0')
    $(container).html(markup)
    $(document).trigger('mounted')
}

export default {
    render
}