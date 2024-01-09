# South Plus Kit

> [!CAUTION]
> 本代码库并不包含任何不健康的内容。但是由本项目产出的油猴脚本作用于south-plus.net，该站点是一个包含成人内容的网站。请确认自己知道south-plus.net是什么再使用这些脚本。

出于信息健康的考虑，这个文档不会保留任何指向south-plus.net的链接。

## 功能

本项目是一个油猴脚本，用于增强south-plus.net的使用体验，它包含以下功能：

1. 在论坛贴子中，可以使用快捷键`B`快速购买内容。
2. 在已购买的内容下，可以使用快捷键`D`打开常见的网盘链接，按优先级顺序支持以下：
   1. GoFile链接。
   2. WorkUpload链接。
   3. Mega链接。
3. 在贴子中用快捷键`C`可以复制标题并自动替换操作系统文件名不支持的字符，在下载后需要修改文件名时非常有用。
4. 对GoFile和WorkUpload的链接，使用快捷键打开后，在新页面会自动定位贴子对应的文件，使用`D`快捷键直接开始下载。

本脚本会在生效的页面底部添加一个横幅指导你使用快捷键，具体生效的站点可参考[油猴脚本声明](build/header.txt)的内容。

## 使用

脚本支持Chrome 80以上浏览器，如果需要兼容其它浏览器，可以[创建issue](https://github.com/otakustay/south-plus-kit/issues/new)反馈。

你可以通过[GreasyFork](https://greasyfork.org/zh-CN/scripts/484304-soul-plus%E5%A2%9E%E5%BC%BA%E5%A5%97%E4%BB%B6)安装脚本。

如果需要定制，你也可以下载源代码进行构建，项目源码托管于[GitHub](https://github.com/otakustay/south-plus-kit)。

```shell
yarn install
yarn build
```

构建产出位于`dist/index.js`。

## 反馈

本项目的宗旨是保持功能精简操作快捷，并不也不打算包含页面美化、丰富信息等功能。我们希望所有功能都是用于缩减操作步长，尽可能使用键盘快捷键触发。

项目会持续跟进south-plus.net上常用的网盘链接，尽可能将购买-下载流程缩短。

在符合上述限制的情况下，如有功能需求，欢迎[创建issue](https://github.com/otakustay/south-plus-kit/issues/new)反馈。
