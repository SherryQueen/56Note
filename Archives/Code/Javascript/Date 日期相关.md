#### IOS Date
- Date 只支持 {Y}-{M}-{D} {H}:{m}:{s} 格式 - 其余格式会变为NaN
- 正确用法

```javascript
new Date('2020-02-02 12:02:24')
```

#### 获取农历
```javascript
// 获取农历
new Date().toLocaleString('ja-JP-u-ca-chinese')
// result: 庚子年7月24日 10:16:03
```
