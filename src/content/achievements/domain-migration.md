---
title: "完成 hoikei.top 域名迁移，实现国内可访问"
date: 2026-04-29
type: "footprints"
draft: false
---

今天完成了个人网站的域名迁移，将 `hoikei.top` 正式投入生产环境。原始方案是阿里云 DNS 直接指向 Vercel，实际部署中引入 Cloudflare 作为中间层，最终架构为 **阿里云(注册商) → Cloudflare(DNS+CDN) → Vercel(托管)**。

操作流程：阿里云域名控制台修改 NS 记录指向 Cloudflare nameserver，Cloudflare 添加 A 记录指向 Vercel IP 并开启橙色代理，Vercel 添加自定义域名并通过验证。三平台联动，DNS 生效后国内外均可正常访问。

尚待解决：Bedside Reference 的 GCS 昏迷评分模块在手机端加载延迟明显。排查发现 Vue 3 从 unpkg CDN 拉取两份脚本（`vue.global.js` 与 `vue.esm-browser.js`），其中一份未使用且阻塞渲染。尝试改为本地打包引入完整版 Vue，但遇到模板编译器缺失导致组件失效，已回退至 CDN 方案，性能优化留待后续处理。
