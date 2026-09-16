# OnlineDelta 官网（苹果风重做，静态站）

纯静态 HTML + CSS + JS，无构建步骤，可直接用任何静态托管（GitHub Pages / 云服务器 Nginx）发布。

## 本地预览

```bash
cd /workspace
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080/
```

## 页面结构（对标规划 docs/delta-website-plan.md §2）

| 路径 | 说明 |
|---|---|
| `/` | 苹果风主页：大首屏 + Fact 条 + 卖点屏 + 产品/IP 双入口 |
| `/products/` | 产品中心 |
| `/products/delta-series/` | Delta 整机系列（3 版本 + 参数表） |
| `/products/parts/` | 零部件总览（可点选结构图） |
| `/products/parts/demo-servo/` | 零件详情示例（Apple Store 式） |
| `/ip/` | IP 与代码（3 商品 + 授权档位对照） |
| `/ip/motion-control/` `/ip/delta-design/` `/ip/conveyor/` | IP 商品详情 |
| `/ip/license/` | 授权说明 |
| `/solutions/` `/support/` `/about/` `/contact/` | 解决方案 / 技术支持 / 关于 / 询价表单 |
| `/cart/` `/checkout/` `/account/` | 占位页（M3/M4 上线，现走询价） |
| `/legacy/` | **隐藏存档页**：改版前域名首页快照，不在任何导航出现 |

## 上线到 jiehuang.top（需用户操作，只列清单）

> 现状：`jiehuang.top` 当前解析到 GitHub Pages 的 `Jie-Huangi/Jie-Huangi.github.io` 个人博客。

1. 在本仓库开启 GitHub Pages（Settings → Pages → Deploy from branch，选主分支 `/` 根目录）。
2. 域名 DNS 处将 `jiehuang.top` / `www` 的解析从旧 Pages 仓库切换到本仓库的 Pages 地址（CNAME 到 `<用户名>.github.io`），或按需保留博客另设二级域名（如 `blog.jiehuang.top` 仍指向旧仓库）。
3. 如用国内云服务器 + Nginx：把本目录整体同步到服务器站点根目录，配置 HTTPS（免费证书即可），再做域名备案（如需）。
4. 上线后验证：首页、产品/IP 页、` /legacy/` 存档页均可访问；旧博客内容仅在 `/legacy` 与原仓库保留。
