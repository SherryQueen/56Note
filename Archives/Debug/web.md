#### Antd@3.x Select 组件在 React@16.13.0 onSearch 调用警告异常

###### 环境

- chrome
- antd@3.x
- react@16.13.0

###### 现象

```jsx
<Select onSearch={setValue} />
```

console output the warning `Cannot update a component from inside the function body of a different component.`

###### 原因

16.13.0 对于在渲染中更新 state 的有所限制
同组件将能正常更新
其余组件则会抛出警告 `Warning: Cannot update a component from inside the function body of a different component.`

Select 组件的 onSearch 方法是在 setState 的过程中触发: [code](https://github.com/react-component/select/blob/9.x/src/Select.tsx#L882)

###### 方案

将setValue操作异步化
```jsx
<Select onSearch={key => setTimeout(() => setValue(key), 0)} />
```
