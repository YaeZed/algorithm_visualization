# Agent 工作问题清单（基于本轮对话）

## 1. 题目与 Hot100 对齐补全
- 问题：按 `task_plan.md` 补齐缺失可视化题目，并修正 `hasVisualization`。
- 范围：`hot100-platform/public/problems/*.html`，`hot100-platform/src/data/hot100.ts`
- 状态：已完成
- 已完成：
  - `136_single_number`
  - `169_majority_element`
  - `075_sort_colors`
  - `031_next_permutation`
  - `198_house_robber`

## 2. 按钮文案/样式与既有题目统一（参考 49 题）
- 问题：
  - 按钮样式需与旧题一致
  - `重置` 改为 `🔄 重新运行`
  - 暂停/继续文案统一为 `⏸ 暂停` / `▶ 继续`
- 范围：
  - `136_single_number.html`
  - `169_majority_element.html`
  - `075_sort_colors.html`
  - `031_next_permutation.html`
- 状态：已完成

## 3. 日志时间边框问题
- 问题：执行日志时间显示不应出现边框（样式类冲突导致）。
- 根因：`time` 类被 memo badge 与日志时间共用。
- 处理：拆分类名为 `log-time`、`memo-time`、`memo-space`。
- 状态：已完成

## 4. 75 / 31 可视化重叠问题
- 问题：可视化区域出现重叠（元素拥挤、状态文案互压）。
- 处理：
  - 节点宽度随间距自适应，避免数组块互相压住
  - 状态卡改为纵向多行布局
  - 状态卡位置改为动态避让
- 范围：
  - `075_sort_colors.html`
  - `031_next_permutation.html`
- 状态：已完成

## 5. 五语言代码注释补全
- 问题：每题 `Python / TS / Java / C++ / C` 均需清晰注释。
- 范围：
  - `136_single_number.html`
  - `169_majority_element.html`
  - `075_sort_colors.html`
  - `031_next_permutation.html`
  - `198_house_robber.html`
- 状态：已完成

## 6. 构建验证
- 问题：每次修复后需本地验证可构建。
- 命令：`node node_modules/vite/bin/vite.js build`
- 状态：已完成（最近一次通过）

## 7. 注释语言统一（新增要求）
- 问题：新补充题目的五语言代码注释统一使用中文。
- 范围：
  - `279_perfect_squares.html`
- 状态：已完成
- 处理：
  - TS / Java / C++ / C 代码注释已改为中文表述
  - 保持 Python 注释为中文

## 8. 新增题目进度（本轮新增）
- 已新增可视化题目：
  - `152_max_product_subarray`
  - `300_longest_increasing`
  - `279_perfect_squares`
  - `322_coin_change`
  - `139_word_break`
- `hot100.ts` 状态同步：
  - `152_max_product_subarray` -> `hasVisualization: true`
  - `300_longest_increasing` -> `hasVisualization: true`
  - `279_perfect_squares` -> `hasVisualization: true`
  - `322_coin_change` -> `hasVisualization: true`
  - `139_word_break` -> `hasVisualization: true`

## 9. 末轮补全与复盘（最新）
- 新增可视化题目：
  - `416_partition_subset`
  - `032_longest_valid_parens`
  - `062_unique_paths`
  - `064_min_path_sum`
  - `005_longest_palindrome`
  - `1143_lcs`
  - `072_edit_distance`
  - `312_burst_balloons`
- `hot100.ts` 同步状态：
  - 上述题目均已设置 `hasVisualization: true`
- 复盘检查项（对照前述要求）：
  - 按钮文案统一：`⏸ 暂停` / `🔄 重新运行`
  - 日志时间样式使用 `log-time`，未与 memo 徽标样式冲突
  - 五语言代码注释已按中文风格补齐
  - 本地构建验证通过：`node node_modules/vite/bin/vite.js build`
- 状态：已完成

## 10. 注释专项检查（新增）
- 执行动作：
  - 对已补题目执行自动化注释扫描（按语言片段提取 `python/ts/java/cpp/c`）。
  - 检查规则：每个语言片段必须有业务注释，且注释需包含中文。
- 发现并修复：
  - `031_next_permutation.html`：TS/Java/C++/C 英文注释改为中文。
  - `152_max_product_subarray.html`：TS/Java/C++/C 英文注释改为中文。
  - `300_longest_increasing.html`：TS/Java/C++/C 英文注释改为中文。
  - `136_single_number.html`：C++ 片段补充独立中文注释行。
- 复检结果：
  - 注释检查 `ISSUE_COUNT = 0`（通过）。
- 状态：已完成
