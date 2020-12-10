- 等比项求和
  `Sn = a1 + a2 + ... an = a1 * (1-q^n) / (1-q)`

  ```
    an = a1*q^(n-1) = (a1 * q^n)/q
    Sn = a1 + a2 + a3 ... an
    q * Sn = a1 * q + a2 * q + ... an * q = (a2 + a2 + ... a(n+1))
    Sn - q * Sn = (1-q)*Sn = a1 - a(n+1) = a1(1-q^n)
    Sn = a1(1-q^n) / (1-q)
  ```

- 泰勒展开
  `g(a)=f(a) + f1(a)/(1!) * (x-a) + f2(a)/(2!) * (x-a) + ... fn(a)/(n!)*(x-a)    fn(a) f(a)的n阶导数`

- 傅立叶变化
