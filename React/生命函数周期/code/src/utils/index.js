function importAll(dir, children=true, reg=/\.js$/) {
    let charts = {}
    const r = require.context(dir, children, reg)
    r.keys().forEach(key => {
        const name = key.split('/')[1].split('.')[0]
        charts[name] = r(key)
    })
    return charts
}

function getDefault(modules) {
    Object.keys(modules).forEach( key =>{
        modules[key] = modules[key].default
    })
    return modules
}
export {
    importAll,
    getDefault
}