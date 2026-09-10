---
title: "发布我的第一个 Skill：Bilingual Paper Reader"
date: 2026-09-10
type: "tool"
draft: false
---

我完成并发布了第一个可复用的 Codex Skill：**Bilingual Paper Reader**。它把科研论文 PDF 转换为可在本地打开的英中双语 HTML 阅读器，让原文与忠实中文翻译逐段对应，同时保留完整图表、双语图注、章节阅读旁注和本地批注功能。

这个 Skill 的重点不是生成一份摘要，而是把一篇论文整理成可以反复阅读、标记、导出笔记的阅读材料。它会按论文原有顺序处理摘要、引言、结果和讨论，在结果出现的位置放入完整图表与图注；读者还可以切换译文与阅读旁注、为段落或图片添加标签和“待讨论”标记，并导出带批注的 HTML、JSON、Markdown、完整英文或中文文本。

生成过程使用固定的构建器与内容规范：在核对正文、图表和图注后，将逐段双语内容写入结构化输入，再生成一个自包含的 HTML 阅读器和原始 PDF 副本。这样既保留论文原貌，也方便在没有网络的环境中继续阅读和整理。

源码已公开在 GitHub：[kyle-med/bilingual-paper-reader](https://github.com/kyle-med/bilingual-paper-reader)。

## 安装

在 Codex 本机运行以下命令，即可从 GitHub 安装到 `~/.codex/skills/bilingual-paper-reader`：

```powershell
python "$env:USERPROFILE\.codex\skills\.system\skill-installer\scripts\install-skill-from-github.py" --repo kyle-med/bilingual-paper-reader --path . --name bilingual-paper-reader
```

安装完成后，开启一个新对话并使用 `$bilingual-paper-reader`，再提供需要阅读或翻译的科研 PDF 即可开始。
