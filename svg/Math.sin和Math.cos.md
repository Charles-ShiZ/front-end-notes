## Math.sin()
Math.sin()，参数是弧度，弧度 = 角度×(Math.PI / 180)

```js
    function getRadian (degree) {
        degree = parseInt(degree)
        if(!!degree && typeof(degree) === 'number') return degree * (Math.PI / 180)
        else return 0
    }
```
