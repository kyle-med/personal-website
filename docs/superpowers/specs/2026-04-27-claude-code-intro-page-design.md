# Claude Code 介绍页 — 设计说明

**日期:** 2026-04-27
**目标:** 单页 HTML，面向开发者，用中文介绍 Claude Code 及其基本用法
**风格:** 现代 Landing Page

## 页面结构

1. **Hero** — 居中大标题 + 副标题 + 渐变背景
2. **什么是 Claude Code** — 定义 + 核心技术指标（上下文窗口、模型、平台支持）
3. **核心能力卡片** — 8 张卡片（Agent Loop, Tool Use, Subagents, Skills, Hooks, Computer Use, MCP, IDE 集成）
4. **快速开始** — 3 步横向步骤（安装 → 认证 → 对话）
5. **常用命令速查** — 表格：斜杠命令 + 说明
6. **快捷键** — 表格：快捷键 + 功能
7. **Footer** — 链接 + 资料来源

## 技术选型

- 单文件 HTML + 内联 CSS + 少量 vanilla JS
- 系统字体栈，CSS Grid 响应式布局（3→2→1 列）
- 支持亮色/暗色模式（prefers-color-scheme）
- 圆角卡片、柔和阴影、滚动渐入动画
- 零外部依赖

## 数据来源

基于 2026 年 4 月 Claude Code 官方文档和多个中文教程的最新信息。
