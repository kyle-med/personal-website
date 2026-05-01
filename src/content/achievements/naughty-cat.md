---
title: "开发了 Naughty Cat —— 用猫咪提醒你休息的 Windows 桌面应用"
date: 2026-05-02
type: "footprints"
draft: false
---

今天用 Claude Code Agent 从零到一完成了一个 Windows 桌面休息提醒应用 **Naughty Cat**。应用通过可爱的猫咪动画在屏幕上提醒用户定时休息——到达工作间隔后，猫咪们会弹出在桌面上随机漫步、喵喵叫，直到用户真正休息够为止。

## 技术架构

- **技术栈**：Python 3.12 + PySide6 (Qt for Python) + PyInstaller + NSIS
- **6 个核心模块**：config_store（JSON 配置读写，原子写入）、idle_detector（Win32 `GetLastInputInfo` API 轮询键盘鼠标空闲）、sound_player（QMediaPlayer 音频播放）、state_machine（6 状态状态机驱动全部逻辑）、cat_manager（猫咪弹窗随机漫步动画，带边框弹跳）、tray_icon（系统托盘图标与右键菜单）
- **4 个 UI 组件**：welcome_wizard（首次运行三步向导：选猫 → 设时间 → 完成）、settings_window（四标签设置对话框：猫咪/时间/音效/通用）、cat_config（猫咪选择面板，支持 GIF 预览和自定义导入）、break_done_toast（休息完成通知弹窗）
- **状态机设计**：WORKING → CAT_SHOW → RESTING ⇄ RESTING_PAUSED → REST_DONE → WORKING，支持驱赶隐藏、手动召唤、暂停/恢复等分支
- **分发包**：PyInstaller 打包为独立 exe，NSIS 制作安装程序，支持开机自启动注册表写入
- **完整测试**：11 个测试文件（pytest-qt），覆盖所有模块的单元测试和集成冒烟测试

## 成品小猫阵容

内置 4 只猫咪 GIF：波仔、咣当、Bender、胖虎（已去喵星 TuT），支持用户导入自定义猫咪 GIF。默认猫咪数量、大小、工作间隔、休息时长均可配置。
