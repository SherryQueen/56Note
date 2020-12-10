#### orderly
```bash
command1;command2;command3 # Sequential execution
which command1 && command2 || command3 # Ternary expression
```

- pipe
  - stdin: 上一个命令的
  - stdout\n\n

#### lsof 用法
```bash
lsof -i:8080 # 查看8080端口占用
lsof abc.txt # 显示开启文件abc.txt的进程
lsof -c abc # 显示abc进程现在打开的文件
lsof -c -p 1234 # 列出进程号为1234的进程所打开的文件
lsof -g gid # 显示归属gid的进程情况
lsof +d /usr/local/ # 显示目录下被进程开启的文件
lsof +D /usr/local/ # 同上，但是会搜索目录下的目录，时间较长
lsof -d 4 # 显示使用fd为4的进程
lsof -i -U # 显示所有打开的端口和UNIX domain文件
```

#### directory

```bash
chown [-R] owner_name file_name
chgrp [-R] group_name file_name
chmod [-R] xyz file_name
```

#### grep

```bash
-a 搜索二进制文件
-c 计算查找到字符串的次数
-i 忽略大小写
-v 反向查找 查找没有目标字符串的行
-r 递归查找
```
