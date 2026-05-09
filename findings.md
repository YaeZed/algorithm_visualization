# 研究发现

## 项目架构
- **技术栈**: Vue 3 + Vite + TypeScript + Pinia + Element Plus
- **可视化引擎**: p5.js 1.7.0 (CDN)
- **代码高亮**: highlight.js 11.9.0 (CDN)
- **字体**: JetBrains Mono + Poppins + Lora (Google Fonts)

## 可视化文件结构模式
每个 HTML 文件遵循统一模板：
1. `<head>` 区：CDN 依赖 + 完整内联 CSS（约 108 行样式变量和布局）
2. `<body>` 区：三栏布局（侧边栏 / canvas / 右侧面板）
3. `<script>` 区：
   - `SNIPPETS` 对象：五语言代码（python, ts, java, cpp, c）
   - `setup()`：初始化 p5 canvas + 启动 generator
   - Generator function：状态机驱动动画步骤
   - `drawVisuals()`：p5.js 绘制逻辑
   - `draw()`：p5.js 主循环（计时器驱动步骤推进）
   - `performStep()` / `logMsg()`：执行下一步并记录日志
   - `switchLang()` / `updateParam()` / `togglePause()` / `setPreset()`：交互

## 已可视化题目分类统计
- 哈希表: 3/3 ✓
- 双指针: 4/4 ✓
- 滑动窗口: 2/2 ✓
- 子串: 3/3 ✓
- 普通数组: 5/5 ✓（id:84 注释掉，但属于缺失的）
- 矩阵: 4/4 ✓
- 链表: 14/14 ✓
- 二叉树: 16/16 ✓
- 图论: 6/6 ✓
- 回溯: 7/7 ✓
- 二分查找: 6/6 ✓
- 栈: 5/5 ✓
- 堆: 3/3 ✓
- 贪心: 4/4 ✓
- 动态规划: 2/10（70, 118 已做；198, 279, 322, 139, 300, 152, 416, 32 未做）
- 多维DP: 0/6（62, 64, 5, 1143, 72, 312）
- 技巧: 0/4（136, 169, 75, 31）

## 数据文件关键信息
- 路径: `hot100-platform/src/data/hot100.ts`
- 每个题目有：id, slug, title, titleEn, category, difficulty, tags, hasVisualization
- slug 格式：`{id三位数}_{英文标题简写}`（如 `198_house_robber`）
- id:84 被注释掉了，需要取消注释

## 路由
- `/` → HomeView（题目列表）
- `/problem/:slug` → ProblemView（iframe 加载对应 HTML）
- 当 hasVisualization=false 时，ProblemCard 显示为 "即将上线"，不可点击进入
