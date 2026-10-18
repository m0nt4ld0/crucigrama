# 填字游戏（Crucigrama）

## **目录**
- [Español 🇦🇷](#填字游戏crucigrama-)
- [Français 🇫🇷](README.fr.md)
- [English 🇬🇧](README.en.md)
- [中文 🇨🇳](README.zh-cn.md)

### **填字游戏** 🇪🇸
- [生成你自己的填字游戏](#生成你自己的填字游戏-)
- [用 JSON 生成你自己的填字游戏](#用-json-生成你自己的填字游戏)
- [打印填字游戏](#打印填字游戏-)


### **生成你自己的填字游戏** 💡

输入那个需要**竖排**显示的单词，然后点击 **🚀出发！** 按钮。

![生成填字游戏](assets/readme/generator.png)


单词的每个字母都会展开成两个输入框：

![生成填字游戏](assets/readme/inputs.png)

- **左边**填入需要猜的*词*（也就是答案）。
- **右边**填入*描述*，它会作为提示出现。

除了逐个手动输入每个词及其描述，你还可以[用 JSON 生成你自己的填字游戏](#用-json-生成你自己的填字游戏)。

### **用 JSON 生成你自己的填字游戏**

借助这个工具，我们可以载入想要的结构，拼出属于自己的**个性化填字游戏**。填字游戏必须符合 **JSON 格式**，结构如下所示。文末还附带了一个 JSON 示例。只要改动示例 JSON 里的取值，就能得到一个新的填字游戏。

[点击这里](https://m0nt4ld0.github.io/crucigrama/)访问该工具。


要插入的 JSON 必须包含以下格式：

- **vword**：作为“提示”竖排显示的那个词。
- **refs**：填字游戏的提示数组（作为“线索”的描述，让玩家据此猜出对应的词）。
- **answers**：答案词数组。

示例如下：

```
[
  {
     "vword": "Freud",
     "refs": [
        "Antigua teoría pseudocientífica, hoy sin validez, que afirmaba poder determinar rasgos del cáracter y de la personalidad basándose en la forma del cráneo y las facciones.",
        "Fuerza que durante el análisis «se defiende por todos los medios contra la curación y a toda costa quiere aferrarse a la enfermedad y el padecimiento»",
        "Complejo de...",
        "Fuente de estímulos en constante fluir, procedente de una excitación interna (a diferencia del estímulo que es externo) y está ligada a un objeto, el cual es transitorio. Su satisfacción es parcial.",
        "Proyección, introyección, identificación proyectiva, todos estos son mecanismos de..."
     ],
     "answers": [
        "frenologia",
        "resistencia",
        "edipo",
        "pulsion",
        "defensa"       
     ]
  }
]
```

该 JSON 会生成下面这个填字游戏：

![image](assets/readme/play-puzzle.png)

### **打印填字游戏** 🖨️

载入自定义填字游戏之后，点击相应的按钮即可打印。它会新开一个空白页面，上面是待填写的填字游戏和它的提示。你可以把它打印出来，也可以作为 PDF 文档保存到电脑里。

点击 **打印（Imprimir）** 按钮

![image](assets/readme/print.png)

随后会打开下面的打印页面。在右侧的选择框里，可以在打印（使用已安装并配置好的打印机）和另存为 PDF 之间切换。
