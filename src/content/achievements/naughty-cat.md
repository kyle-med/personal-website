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

项目开源在 GitHub：[kyle-med/naughty-cat](https://github.com/kyle-med/naughty-cat)

## v2.0 更新

**新增功能**

- **设置即时生效**：修改工作时间、休息时长等设置后保存，立刻应用到当前计时，无需退出软件。智能保留已过工作时间，不会因为改设置而丢失进度。
- **实时计时状态显示**：设置页面顶部新增计时状态卡片，一行紧凑设计，实时显示当前状态和倒计时。工作中显示"猫咪还有 X 分钟过来玩"+ 进度条，休息中、暂停等状态均有对应提示。
- **工作暂停/恢复**：时间设置页面新增暂停按钮，点击可随时暂停工作计时去吃饭或开会，回来后恢复继续，不丢失已有进度。笔记本电脑合盖自动暂停，开盖自动恢复。

**技术要点**

- Python 3.13 + PySide6
- 状态机新增 `update_intervals()`、`timer_info()`、`pause()`/`resume()` 等 5 个方法
- Windows 电源事件监听（WM_POWERBROADCAST）实现合盖感知
- `time.monotonic()` 时钟同步进度条与计时器

**已知问题**

合盖后进度条会与猫咪出现事件脱节一次，尚未修复，后续需要重新思考进度条与计时器的同步策略。

**与 v1.0 对比**

|          | v1.0   | v2.0                     |
|----------|--------|--------------------------|
| 修改设置 | 重启生效 | 保存即生效                 |
| 计时进度 | 不可见   | 设置页实时显示             |
| 暂停工作 | 仅托盘   | 设置页 + 托盘 + 合盖自动   |

v3.0 计划新增猫咪视角的用户工作日记录导出，让每只猫咪成为你的工作日记作者。
