# 添加自定义DOM属性
在与ts结合时，这个更新尤为重要。在ts中，自定义属性的命名一定要以’-‘作为分隔，如`data-classes`。
```jsx
<Select
  showSearch
  style={{ width: 200 }}
  placeholder={'请选择班期'}
  optionFilterProp="children"
  onSelect={(value: string, option) => {
    dispatch({
      type: 'courseTermName',
      act: 'set',
      value: value,
    });
    console.log(value,option)
  }}
>
  {
    Object.entries(state.courseTerms).map(([key, value])=>{
      enum courseTermType {
        finishClass='已结课',
        inClassing='已开课',
        unClassing='未开课'
      }
      return (
        <Select.OptGroup key={key} label={courseTermType[key]}>
        {
          value.map(item => {
            return (
              <Select.Option
                key={item.id} 
                value={item.id}
                data-classes={item.classRespList}
              >
                {item.name}
              </Select.Option>
            )
          })
        }
        </Select.OptGroup>
      )
    })
  }
</Select>
```
