# window.requestAnimationFrame(callback)
作用：使回调函数的执行次数与浏览器屏幕刷新频率相匹配，即保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，使用动画效果更加的自然。
```js
const Event = require('bcore/event')
const $ = require('jquery')
const _ = require('lodash')
const { panelBg, numberBg } = require('./base64')
require('./index.css')
module.exports = Event.extend( function Base(container, config) {
    this.container = $(container)
    this.config = {}
    this.data = {}
    this.init(config)
}, {
    getRadian(degree){
        degree = parseInt(degree)
        if(!!degree && typeof(degree) === 'number') return degree * (Math.PI / 180)
        else return 0
    },
    init(config){
        this.config = config
        const { padding } = this.config
        const { top, left } = padding
        this.initialConfig = {
            backgroundImage:{
                start:[left, top],
                size:[194,73]
            },
            centerCirclePosition:[89 + left,72 + top], // c:center, C:cicle, Pos:position
            movingCirclePosition:[19 + left,72 + top], // m:moving, C:cicle, Pos:position
            panelRadius: 89 - 19,
        }
    },
    startRender () {
        let 
            { backgroundImage, centerCirclePosition, movingCirclePosition, panelRadius } = this.initialConfig,
            { accu } = this.config,
            { value = 2, maxValue = 10 } = this.data
        const 
            degree = (value/maxValue)*180,
            radian = this.getRadian(degree),
            mCx = centerCirclePosition[0] - Math.cos(radian)* panelRadius,
            mCy = centerCirclePosition[1] - Math.sin(radian)* panelRadius 
        accu = accu > 0 ? accu : maxValue / 80
        
        this.container.html( 
            `
                <div style="width:300px;height:200px;">
                    <svg width="100%" height="100%">
                        <image xlink:href="${panelBg}" x="${backgroundImage.start[0]}" y="${backgroundImage.start[1]}" height="${backgroundImage.size[1]}" width="${backgroundImage.size[0]}"/>
                        <image xlink:href="${numberBg}" x="${degree < 95 ? mCx-70 : mCx}" y="${mCy-35}" height="30" width="64"/>
                        <text 
                            x="${(degree < 95 ? mCx-70 : mCx)+5}"
                            y="${mCy-10}" 
                            fill="rgba(255, 235, 160, 1)" 
                            style="font-family:blender pro;font-size:30px"
                        >
                        ${this.data.value}
                        </text>
                        <path
                            transform="rotate(${degree}, ${centerCirclePosition[0]}, ${centerCirclePosition[1]})"
                            fill="url(#arrow)" 
                            d="
                                M${movingCirclePosition[0] + 10} ${movingCirclePosition[1]} 
                                L${centerCirclePosition[0]} ${centerCirclePosition[1] - 9.5} 
                                L${centerCirclePosition[0]} ${centerCirclePosition[1] + 9.5} 
                                Z
                            "
                        >
                        </path>
                        <circle 
                            class="centerCircle"
                            cx="${centerCirclePosition[0]}" cy="${centerCirclePosition[1]}" r="9.5" fill="rgba(23, 100, 171, 1)"
                            stroke="rgba(102, 204, 255, 1)" stroke-width="2"
                        >
                        </circle>
                        <path
                            d="
                                M ${movingCirclePosition[0]} ${movingCirclePosition[1]}
                                A ${panelRadius} ${panelRadius}, 0, ${0}, 1, ${mCx} ${mCy}
                            "
                            stroke="url(#arrow)"
                            stroke-width="3"
                            fill='transparent'
                            strokeOpacity="0.8"
                            strokeLinecap="butt"
                        />
                        <circle
                            class="movingCircle"
                            cx="${mCx}" cy="${mCy}"
                            stroke="rgba(255, 235, 160, 1)"
                            stroke-width="2"
                            r="3"
                            fill="transparent"
                        >
                        </circle>
                        <text 
                            x="${backgroundImage.start[0]+18}" y="${backgroundImage.start[1]+backgroundImage.size[1]+5}"
                            fill="rgba(172, 221, 255, 1)" 
                            style="font-family:blender pro;font-size:18px"
                            dominant-baseline= "hanging"
                        >0</text>
                        <text 
                            x="${backgroundImage.start[0]+backgroundImage.size[0]-52}" y="${backgroundImage.start[1]+backgroundImage.size[1]+5}"
                            fill="rgba(172, 221, 255, 1)" 
                            style="font-family:blender pro;font-size:18px"
                            dominant-baseline= "hanging"
                        >${maxValue}</text>
                        <defs>
                            <linearGradient id="arrow" x1="0" x2="1" y1="0" y2="0">
                                <stop offset="0%" stop-color="rgba(49, 131, 255, 1)"/>
                                <stop offset="100%" stop-color="rgba(134, 205, 255, 1)"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            `
        )

        if (this.data.value < this.finalValue) {
            this.data.value = Number((this.data.value + accu).toFixed(2))
            window.requestAnimationFrame(this.startRender.bind(this))
        } else {
            if(!this.isEnd) {
                this.isEnd = true
                this.data.value = this.finalValue
                window.requestAnimationFrame(this.startRender.bind(this))
                console.log('animation end')
            }
        }
    },
    render (data, config) {
        if(config) this.config = config
        if(data) this.data = data
        
        this.isEnd = false
        this.finalValue = this.data.value
        if(this.config.animation) this.data.value = 0

        this.startRender()
    },
    resize (width, height) {
    },
    destroy () {
        console.log('请实现 destroy 方法')
    }
})
```