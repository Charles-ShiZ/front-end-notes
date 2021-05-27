let charts = {}
const r = require.context("./", true, /\.js$/)
r.keys().forEach(key => {
    const name = key.split('/')[1].split('.')[0]
    charts[name] = r(key)
})
export default charts