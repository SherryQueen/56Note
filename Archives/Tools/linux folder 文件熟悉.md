#### 文件属性

[d][rwx][r-x][r-x]
- 文件类型
  - d: directory
  - \: file
  - l: link file
  - b: 可存储的接口设备
  - c: 串行端口设备

- Owner权限 / Owner Group权限 / Other User Group权限
  - rwx = 111 = 7
  - r: read
  - w: write
  - x: executable
  - chgrp 更改文件属性组
  - chown 更改文件owner
  - chmod 更改文件9个属性 `chmod 777 ./test`
