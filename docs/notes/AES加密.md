# CryptoJS

CryptoJS是一个JavaScript的加解密的工具包。它支持多种的算法：`MD5、SHA1、SHA2、SHA3、RIPEMD-160 哈希散列`，进行 `AES、DES、Rabbit、RC4、Triple DES` 加解密.

## 散列算法

### MD5

`MD5`是被广泛使用的散列函数。它被应用于各种安全应用，通常也可以校验文件的完整性。但`MD5`不耐碰撞攻击，因此不适用于SSL证书或数字签名。

```js
var mode = CryptoJS.MD5("Message");
// 输出一个obj
```

toString()方法转换

```js
var mode = CryptoJS.MD5("Message");
console.log(mode.toString());
// 4c2a8fe7eaf24721cc7a9f0175115bd4
```

## 加密

### 加密算法

加密函数的参数是：(明文字符串, 密钥字符串，可选参数对象)，返回密文字符串。 加密函数是：`Cryptojs.AES.encrypt`，`Cryptojs.DES.encrypt`，`Cryptojs.Rabbit.encrypt`，`Cryptojs.RC4.encrypt`，`Cryptojs.TripleDES.encrypt`

解密函数的参数是：(密文字符串, 密钥字符串，可选参数对象)，返回的结果必须用`.toString(CryptoJS.enc.Utf8)`转为明文。 

解密函数是:`CryptoJS.AES.decrypt`，`CryptoJS.DES.decrypt`，`CryptoJS.Rabbit.decrypt`，`CryptoJS.RC4.decrypt`，`CryptoJS.TripleDES.decrypt`


参数

encrypt(message,secret,obj);

可选参数对象常用属性

obj:`{mode,paddig,vi,formatter}`

- mode:加密模式。`CBC`,`ECB`,`CFB`,`OFB`,`CTR`
- 
- paddig:填充方式。`NoPadding`,`ZeroPadding`,`Pkcs7(Pkcs5)`,`Iso10126`,`Iso97971`,`AnsiX923`
- 
- vi:偏移量
- 
- formatter：自定义格式

应用：

### AES

例如：
```js
// 加密
// CryptoJS.AES.encrypt(message, secret,{});
var encrypted = CryptoJS.AES.encrypt("message 123", "secret",{
  mode:CryptoJS.mode.CBC,
  padding:CryptoJS.pad.Pkcs7
});

// 解密
var decrypted = CryptoJS.AES.decrypt("message 123", "secret",{
  mode:CryptoJS.mode.CBC,
  padding:CryptoJS.pad.Pkcs7
});

console.log(decrypted.toString(CryptoJS.enc.Utf8));//message 123
```

参考文档：[git地址](https://github.com/xiaohuiguo/CryptoJS-guide-cn)


