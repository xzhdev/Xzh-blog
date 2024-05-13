---
title: 正则和glob，通通拿来吧！🤩
date: 2024-05-13 09:43:19
copyright: false
author: Mr_Carl
home: https://juejin.cn/user/712139266332670/posts
origin: juejin
url: https://juejin.cn/post/7244409172380139557
tag: 
  - 前端
  - JavaScript
  - 正则表达式
categories: 
description: 正则和glob，都可以用来进行匹配，但正则主要用于 文本内容 的匹配，而glob主要用于 文件路径 ...
---

正则和glob，都可以用来进行匹配，但正则主要用于 **文本内容** 的匹配，而glob主要用于 **文件路径** 的匹配，它俩具体是如何进行匹配的，就请听本文分解吧！

![ppx.jpg](./正则和glob，通通拿来吧！🤩/e58afcf8774e4288f14f90137ce895ee.awebp)

## 正则

### 简介

正则表达式由 **字符** 和 **特殊符号** 组成，用于定义文本模式，以下是一些常见的正则表达式特殊符号的含义：

* `.`：匹配任意单个字符
* `*`：匹配前一个字符的零个或多个出现
* `+`：匹配前一个字符的一个或多个出现
* `?`：匹配前一个字符的零个或一个出现
* `^`：匹配文本的开头
* `$`：匹配文本的结尾
* `[]`：匹配括号内的任意一个字符
* `()`：定义一个捕获组，可以提取匹配的部分

### 示例

本节给出一些正则使用的常见场景，各位读者可以按需享用

![666.jpg](./正则和glob，通通拿来吧！🤩/6f3fa167d26f3b3f135850e4f47d4ada.awebp)

1. **匹配邮箱地址**：

   * 正则表达式：`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
   * 示例：

   ```javascript
   javascript复制代码const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   const email = 'example@example.com';
   if (emailRegex.test(email)) {
     console.log('邮箱地址有效');
   } else {
     console.log('邮箱地址无效');
   }
   ```

2. **匹配手机号码**：

   * 正则表达式：`/^1[3456789]\d{9}$/`
   * 示例：

   ```javascript
   javascript复制代码const phoneRegex = /^1[3456789]\d{9}$/;
   const phoneNumber = '13812345678';
   if (phoneRegex.test(phoneNumber)) {
     console.log('手机号码有效');
   } else {
     console.log('手机号码无效');
   }
   ```

3. **提取 URL 中的域名**：

   * 正则表达式：`/https?:\/\/([^/]+)\/.*/`
   * 示例：

   ```javascript
   javascript复制代码const urlRegex = /https?:\/\/([^/]+)\/.*/;
   const url = 'https://www.example.com/path/to/page';
   const domain = url.match(urlRegex)[1];
   console.log('域名:', domain);
   ```

4. **替换字符串中的所有数字**：

   * 正则表达式：`/\d/g`
   * 示例：

   ```javascript
   javascript复制代码const string = 'Hello 123 World 456';
   const result = string.replace(/\d/g, '');
   console.log('替换后的字符串:', result);
   ```

5. **验证日期格式（YYYY-MM-DD）**

   * 正则表达式：`/^\d{4}-\d{2}-\d{2}$/`
   * 示例：

   ```javascript
   javascript复制代码const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
   const date = '2022-12-31';
   if (dateRegex.test(date)) {
     console.log('日期格式正确');
   } else {
     console.log('日期格式错误');
   }
   ```

6. **匹配 HTML 标签**：

   * 正则表达式：`/<[^>]+>/g`
   * 示例：

   ```javascript
   javascript复制代码const html = '<div>Hello World</div>';
   const tags = html.match(/<[^>]+>/g);
   console.log('匹配到的标签:', tags);
   ```

7. **验证密码强度**（包含至少一个大写字母、一个小写字母和一个数字）：

   * 正则表达式：`/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/`
   * 示例：

   ```javascript
   javascript复制代码const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/;
   const password = 'Abcdefg123';
   if (passwordRegex.test(password)) {
     console.log('密码强度符合要求');
   } else {
     console.log('密码强度不符合要求');
   }
   ```

8. **匹配邮政编码**（中国邮政编码为 6 位数字）：

   * 正则表达式：`/^\d{6}$/`
   * 示例：

   ```javascript
   javascript复制代码const postalCodeRegex = /^\d{6}$/;
   const postalCode = '123456';
   if (postalCodeRegex.test(postalCode)) {
     console.log('邮政编码有效');
   } else {
     console.log('邮政编码无效');
   }
   ```

9. **验证身份证号码**（中国身份证号码为 18 位数字）：

   * 正则表达式：`/^\d{17}[\dXx]$/`
   * 示例：

   ```javascript
   javascript复制代码const idRegex = /^\d{17}[\dXx]$/;
   const idNumber = '320123198012345678';
   if (idRegex.test(idNumber)) {
     console.log('身份证号码有效');
   } else {
     console.log('身份证号码无效');
   }
   ```

10. **验证 URL 格式**：

  * 正则表达式：`/^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/`
  * 示例：

  ```javascript
  javascript复制代码const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/;
  const url = 'https://www.example.com/path/to/page';
  if (urlRegex.test(url)) {
    console.log('URL 格式正确');
  } else {
    console.log('URL 格式错误');
  }
  ```

## glob匹配

### 简介

当我们需要在文件系统中进行 **文件路径** 匹配时，可以使用 `glob` 模式来快速匹配符合特定模式的文件路径，它是一种简单且常用的模式匹配语法，广泛应用于文件操作和构建工具中

其语法规则如下：

* **\***: 匹配0个或者多个字符，比如`d*`，可以匹配`d`，`dl`，`ddl`
* **?**: 匹配单个字符，比如`d?`，只匹配`dd`，不能匹配`d`
* **\[\]**: 包含在\[\]中的字符，只会被匹配一个，并且\[\]不可以为空,比如 \[abc\] 匹配a，b，c三个中的一个字符
* **\-**: 两个字符中间用'-'连接表示range，比如\[0-9\]等同于\[0123456789\]，需要注意的是如果'-'出现在开头或者结尾，并不表示range，比如\[-a\]或者\[a-\]匹配 '-'或'a' 字符中的一个
* **!**: 取反，\[!abc\] 表示匹配a,b,c之外的一个字符
* **\*\***: 双星号代表可以匹配后代所有子目录
* 任何以 **.** 开头命名的文件，都必须在glob中显示指定才能匹配，比如有一个文件.abc，那么`rm *`匹配不到.abc，只能使用`rm .*`

### 示例

以下是一些常见的 `glob` 匹配模式示例：

* `*.js`：匹配当前目录下所有以 `.js` 结尾的文件
* `src/**/*.js`：匹配 `src` 目录及其所有子目录下的所有以 `.js` 结尾的文件
* `app.{js,css}`：匹配当前目录下的 `app.js` 和 `app.css` 文件
* `!dist/*.js`：排除匹配 `dist` 目录下的所有 `.js` 文件
* `[abc].js`：匹配当前目录下的 `a.js`、`b.js` 和 `c.js` 文件
* `?(pattern|pattern|pattern).js`：匹配当前目录下的零个或一个括号内指定的模式文件，如 `pattern.js`、`pattern2.js`
* `+(pattern|pattern|pattern).js`：匹配当前目录下至少一个括号内指定的模式文件，如 `pattern.js`、`pattern2.js`
* `*(pattern|pattern|pattern).js`：匹配当前目录下任意数量的括号内指定的模式文件，如 `pattern.js`、`pattern2.js`
* `@(pattern|pat*|pat?erN).js`：匹配当前目录下与括号内模式之一匹配的文件，如 `pattern.js`、`patN.js`

## 正则表达式与 `glob` 匹配的区别

正则表达式和 `glob` 匹配都是用于 **模式匹配**，但它们在语法和用途上存在一些区别：

* **语法差异**：正则表达式使用 **特殊符号** 来表示模式，具有更高的灵活性和表达能力，而 `glob` 使用通配符（如 `*` 和 `?`）来匹配文件路径模式，更加简洁易懂
* **匹配范围**：正则表达式可以匹配更复杂的 **文本模式**，而 `glob` 主要用于匹配 **文件路径模式**
* **匹配方式**：正则表达式是通过模式的 **匹配规则** 来匹配字符串的，可以进行更精确的匹配和提取，而 `glob` 是根据 **通配符** 来匹配文件路径，只能进行简单的文件名匹配
* **使用场景**：正则表达式适用于需要对字符串进行 **复杂模式匹配和替换** 的场景，如验证表单数据、提取特定信息，`glob` 主要用于 **文件操作**，如文件查找、筛选

虽然正则表达式更加灵活和强大，但在一些简单的文件路径匹配场景下，`glob` 的简洁性和易用性更受开发者欢迎，所以合适的场景，选择合适的技术，这是永远不变的真理

![nice2.jpg](./正则和glob，通通拿来吧！🤩/867605c47b96c67f98ab27d5a213a7e5.awebp)

## 结语

通过灵活运用正则表达式，我们可以高效地处理和操作字符串，满足各种文本模式的匹配需求。同时，了解正则表达式和 `glob` 匹配的区别，可以根据具体的场景选择合适的模式匹配工具

都看到这里啦，如果本篇文章对你有帮助，希望能 **点个赞👍** 支持下啦，你们的支持才是我最大的动力！😘

![R-C.gif](./正则和glob，通通拿来吧！🤩/c896f65a89de9a656c37e0a264195cf7.awebp)