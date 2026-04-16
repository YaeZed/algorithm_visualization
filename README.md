# LeetCode Hot 100 算法可视化平台

![Hot 100 Platform](https://img.shields.io/badge/Status-Beta-orange)
![Tech Stack](https://img.shields.io/badge/Stack-Vue%203%20%2B%20Vite%20%2B%20TS-brightgreen)
![Design](https://img.shields.io/badge/Design-Premium-blueviolet)

这是一个专为 **LeetCode Hot 100** 设计的算法可视化与进度管理平台。它不仅能帮助你追踪刷题进度，还通过交互式的动画演示细节化地呈现算法逻辑，让抽象的代码变得直观易懂。

## 📸 项目预览

| 首页 (Home) | 题目详情 (Problem View) |
| :---: | :---: |
| ![首页预览](/hot100-platform/docs/screenshots/home.png) | ![算法演示预览](/hot100-platform/docs/screenshots/problem.png) |

## ✨ 核心特性

- 🧪 **交互式可视化**：集成基于 `p5.js` 开发的算法演示窗口，支持逐步执行、实时日志和五种主流语言（C++、Java、Python、JS、TS）的代码片段对照。
- 📊 **进度追踪系统**：内置状态管理（已掌握、练习中、已查看），数据持久化存储于本地，随时掌握你的 Hot 100 通关进度。
- 🔍 **高效筛选与搜索**：支持按分类（哈希表、双指针、动态规划等）、难度（简单、中等、困难）以及题目 ID 或名称快速定位。
- 🎨 **沉浸式 UI 体验**：采用深色主题设计，结合 Element Plus 组件库，提供极速响应、高颜值且专注的刷题环境。
- 🚀 **现代技术栈**：由 Vue 3 + Vite + TypeScript + Pinia 驱动，模块化程度高，性能表现卓越。

## 🛠️ 技术栈

| 模块 | 技术 |
| :--- | :--- |
| **框架** | [Vue 3](https://vuejs.org/) (Composition API) |
| **构建** | [Vite](https://vitejs.dev/) |
| **语言** | [TypeScript](https://www.typescriptlang.org/) |
| **UI 组件** | [Element Plus](https://element-plus.org/) |
| **状态管理** | [Pinia](https://pinia.vuejs.org/) |
| **可视化库** | [p5.js](https://p5js.org/) |

## 🚀 快速开始

### 1. 克隆与安装
```bash
# 获取项目
git clone https://github.com/YaeZed/algorithm_visualization.git
cd algorithm_visualization/hot100-platform

# 安装依赖
npm install
```

### 2. 本地开发
```bash
npm run dev
```

### 3. 构建发布
```bash
npm run build
```

## 📂 项目结构

```text
src/
├── components/          # 公用组件（侧边栏、过滤器、题目卡片等）
├── data/                # 题目元数据 (hot100.ts)
├── stores/              # Pinia 状态管理
├── views/               # 页面视图 (HomeView, ProblemView)
├── styles/              # 全局样式与变量定义
└── assets/              # 静态资源
public/
└── problems/            # 存放各题目的 HTML 可视化模块 (slug.html)
```

## 🛠️ 开发者指南：如何添加新的可视化？

1. **准备可视化模块**：在 `public/problems/` 目录下创建一个 HTML 文件，建议使用 `p5.js` 编写动画。文件命名应与题目的 `slug` 一致。
2. **注册题目**：在 `src/data/hot100.ts` 中找到对应的题目条目。
3. **启用标志**：将 `hasVisualization` 属性设置为 `true`。
   ```typescript
   {
     id: 1,
     slug: '001_two_sum',
     title: '两数之和',
     // ... 其他属性
     hasVisualization: true
   }
   ```
4. **刷新页面**：进入该题目详情页，系统将自动加载并展示你的可视化模块。

---

*Made with ❤️ for Algorithmic Mastery.*
