---
title: "借助 Claude Agent 和 DeepSeek 完成了第一个个人网页开发"
date: 2026-04-29
type: "footprints"
draft: false
---

借助 Claude Code Agent 和 DeepSeek 模型的协作，从零开发并持续迭代了个人学术网站。项目采用 Astro 框架搭建、Tailwind CSS 渲染样式、Vercel 平台部署，实现了三个核心模块：

- **Thinking & Notes**：研究思考与学术笔记，支持 Markdown 写作、标签筛选和全文搜索
- **Achievements**：我在 AI × 医学领域取得的一些突破，footprints记录的是一些小小的进步和成长，contributions即将记录的是自己在这个领域做出的一些小小贡献和成果（现在还没有这个标签，期待这个标签能早日“显化”在这个网站里lol）
- **Bedside Reference**：临床常用评分量表工具集，按科室分类，内置 Vue.js 交互式计算器，首位量表为 GCS 昏迷评分

全程通过 AI 辅助完成，包括架构设计、组件开发、搜索集成（Pagefind）、GitHub 部署等完整链路，并解决了静态站点客户端标签筛选、Astro v6 兼容性、Pagefind 搜索 UI API 适配等技术问题。域名 hoikei.top。
