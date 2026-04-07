// ============================================================
// Hot 100 完整题目元数据
// ============================================================

export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export type Category =
  | '哈希表' | '双指针' | '滑动窗口' | '子串' | '普通数组'
  | '矩阵' | '链表' | '二叉树' | '图论' | '回溯'
  | '二分查找' | '栈' | '堆' | '贪心' | '动态规划' | '多维DP' | '技巧'

export const ALL_CATEGORIES: Category[] = [
  '哈希表', '双指针', '滑动窗口', '子串', '普通数组',
  '矩阵', '链表', '二叉树', '图论', '回溯',
  '二分查找', '栈', '堆', '贪心', '动态规划', '多维DP', '技巧',
]

export interface Problem {
  id: number
  slug: string
  title: string
  titleEn: string
  category: Category
  difficulty: Difficulty
  tags: string[]
  hasVisualization: boolean
}

export const HOT100: Problem[] = [
  // ── 哈希表 ──────────────────────────────────────────────────
  { id: 1, slug: '001_two_sum', title: '两数之和', titleEn: 'Two Sum', category: '哈希表', difficulty: 'Easy', tags: ['数组', '哈希表'], hasVisualization: true },
  { id: 49, slug: '049_group_anagrams', title: '字母异位词分组', titleEn: 'Group Anagrams', category: '哈希表', difficulty: 'Medium', tags: ['数组', '哈希表', '排序'], hasVisualization: true },
  { id: 128, slug: '128_longest_consecutive', title: '最长连续序列', titleEn: 'Longest Consecutive Sequence', category: '哈希表', difficulty: 'Medium', tags: ['并查集', '哈希表'], hasVisualization: true },

  // ── 双指针 ──────────────────────────────────────────────────
  { id: 283, slug: '283_move_zeroes', title: '移动零', titleEn: 'Move Zeroes', category: '双指针', difficulty: 'Easy', tags: ['数组', '双指针'], hasVisualization: true },
  { id: 11, slug: '011_container_water', title: '盛最多水的容器', titleEn: 'Container With Most Water', category: '双指针', difficulty: 'Medium', tags: ['数组', '双指针', '贪心'], hasVisualization: true },
  { id: 15, slug: '015_three_sum', title: '三数之和', titleEn: 'Three Sum', category: '双指针', difficulty: 'Medium', tags: ['数组', '双指针', '排序'], hasVisualization: true },
  { id: 42, slug: '042_trapping_rain', title: '接雨水', titleEn: 'Trapping Rain Water', category: '双指针', difficulty: 'Hard', tags: ['栈', '数组', '双指针'], hasVisualization: true },

  // ── 滑动窗口 ────────────────────────────────────────────────
  { id: 3, slug: '003_longest_substring', title: '无重复字符的最长子串', titleEn: 'Longest Substring Without Repeating', category: '滑动窗口', difficulty: 'Medium', tags: ['哈希表', '字符串', '滑动窗口'], hasVisualization: true },
  { id: 438, slug: '438_find_anagrams', title: '找到字符串中所有字母异位词', titleEn: 'Find All Anagrams in a String', category: '滑动窗口', difficulty: 'Medium', tags: ['哈希表', '字符串', '滑动窗口'], hasVisualization: true },

  // ── 子串 ────────────────────────────────────────────────────
  { id: 560, slug: '560_subarray_sum_k', title: '和为 K 的子数组', titleEn: 'Subarray Sum Equals K', category: '子串', difficulty: 'Medium', tags: ['数组', '哈希表', '前缀和'], hasVisualization: true },
  { id: 239, slug: '239_sliding_window_max', title: '滑动窗口最大值', titleEn: 'Sliding Window Maximum', category: '子串', difficulty: 'Hard', tags: ['数组', '队列', '单调队列'], hasVisualization: false },
  { id: 76, slug: '076_min_window', title: '最小覆盖子串', titleEn: 'Minimum Window Substring', category: '子串', difficulty: 'Hard', tags: ['哈希表', '字符串', '滑动窗口'], hasVisualization: false },

  // ── 普通数组 ────────────────────────────────────────────────
  { id: 53, slug: '053_max_subarray', title: '最大子数组和', titleEn: 'Maximum Subarray', category: '普通数组', difficulty: 'Medium', tags: ['数组', '分治', 'DP'], hasVisualization: false },
  { id: 56, slug: '056_merge_intervals', title: '合并区间', titleEn: 'Merge Intervals', category: '普通数组', difficulty: 'Medium', tags: ['数组', '排序'], hasVisualization: false },
  { id: 189, slug: '189_rotate_array', title: '轮转数组', titleEn: 'Rotate Array', category: '普通数组', difficulty: 'Medium', tags: ['数组', '双指针'], hasVisualization: false },
  { id: 238, slug: '238_product_except_self', title: '除自身以外数组的乘积', titleEn: 'Product of Array Except Self', category: '普通数组', difficulty: 'Medium', tags: ['数组', '前缀和'], hasVisualization: false },
  { id: 41, slug: '041_first_missing', title: '缺失的第一个正数', titleEn: 'First Missing Positive', category: '普通数组', difficulty: 'Hard', tags: ['数组', '哈希表'], hasVisualization: false },
  { id: 84, slug: '084_largest_rectangle', title: '柱状图中最大的矩形', titleEn: 'Largest Rectangle in Histogram', category: '普通数组', difficulty: 'Hard', tags: ['栈', '数组', '单调栈'], hasVisualization: false },

  // ── 矩阵 ────────────────────────────────────────────────────
  { id: 73, slug: '073_set_matrix_zeroes', title: '矩阵置零', titleEn: 'Set Matrix Zeroes', category: '矩阵', difficulty: 'Medium', tags: ['数组', '矩阵'], hasVisualization: false },
  { id: 54, slug: '054_spiral_matrix', title: '螺旋矩阵', titleEn: 'Spiral Matrix', category: '矩阵', difficulty: 'Medium', tags: ['数组', '矩阵', '模拟'], hasVisualization: false },
  { id: 48, slug: '048_rotate_image', title: '旋转图像', titleEn: 'Rotate Image', category: '矩阵', difficulty: 'Medium', tags: ['数组', '矩阵'], hasVisualization: false },
  { id: 240, slug: '240_search_2d_matrix', title: '搜索二维矩阵 II', titleEn: 'Search a 2D Matrix II', category: '矩阵', difficulty: 'Medium', tags: ['数组', '二分', '矩阵'], hasVisualization: false },

  // ── 链表 ────────────────────────────────────────────────────
  { id: 160, slug: '160_intersection_linked', title: '相交链表', titleEn: 'Intersection of Two Linked Lists', category: '链表', difficulty: 'Easy', tags: ['哈希表', '链表', '双指针'], hasVisualization: false },
  { id: 206, slug: '206_reverse_linked', title: '反转链表', titleEn: 'Reverse Linked List', category: '链表', difficulty: 'Easy', tags: ['链表', '递归'], hasVisualization: false },
  { id: 234, slug: '234_palindrome_linked', title: '回文链表', titleEn: 'Palindrome Linked List', category: '链表', difficulty: 'Easy', tags: ['链表', '递归', '双指针'], hasVisualization: false },
  { id: 141, slug: '141_linked_cycle', title: '环形链表', titleEn: 'Linked List Cycle', category: '链表', difficulty: 'Easy', tags: ['哈希表', '链表', '双指针'], hasVisualization: false },
  { id: 21, slug: '021_merge_sorted_lists', title: '合并两个有序链表', titleEn: 'Merge Two Sorted Lists', category: '链表', difficulty: 'Easy', tags: ['链表', '递归'], hasVisualization: false },
  { id: 2, slug: '002_add_numbers', title: '两数相加', titleEn: 'Add Two Numbers', category: '链表', difficulty: 'Medium', tags: ['链表', '递归'], hasVisualization: false },
  { id: 19, slug: '019_remove_nth', title: '删除链表的倒数第 N 个结点', titleEn: 'Remove Nth Node From End of List', category: '链表', difficulty: 'Medium', tags: ['链表', '双指针'], hasVisualization: false },
  { id: 24, slug: '024_swap_pairs', title: '两两交换链表中的节点', titleEn: 'Swap Nodes in Pairs', category: '链表', difficulty: 'Medium', tags: ['链表', '递归'], hasVisualization: false },
  { id: 142, slug: '142_linked_cycle_ii', title: '环形链表 II', titleEn: 'Linked List Cycle II', category: '链表', difficulty: 'Medium', tags: ['哈希表', '链表', '双指针'], hasVisualization: false },
  { id: 148, slug: '148_sort_list', title: '排序链表', titleEn: 'Sort List', category: '链表', difficulty: 'Medium', tags: ['链表', '分治', '排序'], hasVisualization: false },
  { id: 23, slug: '023_merge_k_lists', title: '合并 K 个升序链表', titleEn: 'Merge K Sorted Lists', category: '链表', difficulty: 'Hard', tags: ['链表', '分治', '堆'], hasVisualization: false },
  { id: 25, slug: '025_reverse_k_group', title: 'K 个一组翻转链表', titleEn: 'Reverse Nodes in k-Group', category: '链表', difficulty: 'Hard', tags: ['链表', '递归'], hasVisualization: false },

  // ── 二叉树 ──────────────────────────────────────────────────
  { id: 94, slug: '094_inorder_traversal', title: '二叉树的中序遍历', titleEn: 'Binary Tree Inorder Traversal', category: '二叉树', difficulty: 'Easy', tags: ['栈', '树', '深度优先'], hasVisualization: false },
  { id: 104, slug: '104_max_depth', title: '二叉树的最大深度', titleEn: 'Maximum Depth of Binary Tree', category: '二叉树', difficulty: 'Easy', tags: ['树', '递归', '广度优先'], hasVisualization: false },
  { id: 226, slug: '226_invert_tree', title: '翻转二叉树', titleEn: 'Invert Binary Tree', category: '二叉树', difficulty: 'Easy', tags: ['树', '深度优先', '广度优先'], hasVisualization: false },
  { id: 101, slug: '101_symmetric_tree', title: '对称二叉树', titleEn: 'Symmetric Tree', category: '二叉树', difficulty: 'Easy', tags: ['树', '深度优先', '广度优先'], hasVisualization: false },
  { id: 543, slug: '543_diameter_tree', title: '二叉树的直径', titleEn: 'Diameter of Binary Tree', category: '二叉树', difficulty: 'Easy', tags: ['树', '深度优先'], hasVisualization: false },
  { id: 102, slug: '102_level_order', title: '二叉树的层序遍历', titleEn: 'Binary Tree Level Order Traversal', category: '二叉树', difficulty: 'Medium', tags: ['树', '广度优先'], hasVisualization: false },
  { id: 108, slug: '108_sorted_to_bst', title: '将有序数组转换为二叉搜索树', titleEn: 'Convert Sorted Array to BST', category: '二叉树', difficulty: 'Easy', tags: ['数组', '分治', '树'], hasVisualization: false },
  { id: 98, slug: '098_validate_bst', title: '验证二叉搜索树', titleEn: 'Validate Binary Search Tree', category: '二叉树', difficulty: 'Medium', tags: ['树', '深度优先', 'BST'], hasVisualization: false },
  { id: 230, slug: '230_kth_smallest', title: 'BST 中第 K 小的元素', titleEn: 'Kth Smallest Element in a BST', category: '二叉树', difficulty: 'Medium', tags: ['树', '深度优先', 'BST'], hasVisualization: false },
  { id: 199, slug: '199_right_side_view', title: '二叉树的右视图', titleEn: 'Binary Tree Right Side View', category: '二叉树', difficulty: 'Medium', tags: ['树', '深度优先', '广度优先'], hasVisualization: false },
  { id: 114, slug: '114_flatten_tree', title: '二叉树展开为链表', titleEn: 'Flatten Binary Tree to Linked List', category: '二叉树', difficulty: 'Medium', tags: ['栈', '树', '深度优先'], hasVisualization: false },
  { id: 105, slug: '105_preorder_inorder', title: '从前序与中序遍历序列构造二叉树', titleEn: 'Construct Binary Tree from Preorder and Inorder', category: '二叉树', difficulty: 'Medium', tags: ['数组', '哈希表', '分治'], hasVisualization: false },
  { id: 437, slug: '437_path_sum_iii', title: '路径总和 III', titleEn: 'Path Sum III', category: '二叉树', difficulty: 'Medium', tags: ['树', '深度优先', '前缀和'], hasVisualization: false },
  { id: 236, slug: '236_lca_binary_tree', title: '二叉树的最近公共祖先', titleEn: 'Lowest Common Ancestor of a Binary Tree', category: '二叉树', difficulty: 'Medium', tags: ['树', '深度优先'], hasVisualization: false },
  { id: 124, slug: '124_max_path_sum', title: '二叉树中的最大路径和', titleEn: 'Binary Tree Maximum Path Sum', category: '二叉树', difficulty: 'Hard', tags: ['动态规划', '树', '深度优先'], hasVisualization: false },
  { id: 297, slug: '297_serialize_tree', title: '二叉树的序列化与反序列化', titleEn: 'Serialize and Deserialize Binary Tree', category: '二叉树', difficulty: 'Hard', tags: ['树', '设计', '字符串'], hasVisualization: false },

  // ── 图论 ────────────────────────────────────────────────────
  { id: 200, slug: '200_num_islands', title: '岛屿数量', titleEn: 'Number of Islands', category: '图论', difficulty: 'Medium', tags: ['深度优先', '广度优先', '并查集'], hasVisualization: false },
  { id: 994, slug: '994_rotting_oranges', title: '腐烂的橘子', titleEn: 'Rotting Oranges', category: '图论', difficulty: 'Medium', tags: ['广度优先'], hasVisualization: false },
  { id: 207, slug: '207_course_schedule', title: '课程表', titleEn: 'Course Schedule', category: '图论', difficulty: 'Medium', tags: ['深度优先', '广度优先', '拓扑排序'], hasVisualization: false },
  { id: 208, slug: '208_implement_trie', title: '实现 Trie（前缀树）', titleEn: 'Implement Trie (Prefix Tree)', category: '图论', difficulty: 'Medium', tags: ['设计', 'Trie'], hasVisualization: false },
  { id: 547, slug: '547_province_number', title: '省份数量', titleEn: 'Number of Provinces', category: '图论', difficulty: 'Medium', tags: ['深度优先', '广度优先', '并查集'], hasVisualization: false },
  { id: 130, slug: '130_surrounded_regions', title: '被围绕的区域', titleEn: 'Surrounded Regions', category: '图论', difficulty: 'Medium', tags: ['深度优先', '广度优先', '并查集'], hasVisualization: false },

  // ── 回溯 ────────────────────────────────────────────────────
  { id: 46, slug: '046_permutations', title: '全排列', titleEn: 'Permutations', category: '回溯', difficulty: 'Medium', tags: ['数组', '回溯'], hasVisualization: false },
  { id: 78, slug: '078_subsets', title: '子集', titleEn: 'Subsets', category: '回溯', difficulty: 'Medium', tags: ['位运算', '回溯'], hasVisualization: false },
  { id: 39, slug: '039_combination_sum', title: '组合总和', titleEn: 'Combination Sum', category: '回溯', difficulty: 'Medium', tags: ['数组', '回溯'], hasVisualization: false },
  { id: 22, slug: '022_generate_parentheses', title: '括号生成', titleEn: 'Generate Parentheses', category: '回溯', difficulty: 'Medium', tags: ['回溯', '动态规划'], hasVisualization: false },
  { id: 79, slug: '079_word_search', title: '单词搜索', titleEn: 'Word Search', category: '回溯', difficulty: 'Medium', tags: ['数组', '回溯', '矩阵'], hasVisualization: false },
  { id: 131, slug: '131_palindrome_partition', title: '分割回文串', titleEn: 'Palindrome Partitioning', category: '回溯', difficulty: 'Medium', tags: ['回溯', '动态规划', 'BFS'], hasVisualization: false },
  { id: 51, slug: '051_n_queens', title: 'N 皇后', titleEn: 'N-Queens', category: '回溯', difficulty: 'Hard', tags: ['回溯'], hasVisualization: false },

  // ── 二分查找 ────────────────────────────────────────────────
  { id: 35, slug: '035_search_insert', title: '搜索插入位置', titleEn: 'Search Insert Position', category: '二分查找', difficulty: 'Easy', tags: ['数组', '二分'], hasVisualization: false },
  { id: 74, slug: '074_search_matrix', title: '搜索二维矩阵', titleEn: 'Search a 2D Matrix', category: '二分查找', difficulty: 'Medium', tags: ['数组', '二分', '矩阵'], hasVisualization: false },
  { id: 34, slug: '034_search_range', title: '在排序数组中查找元素的第一个和最后一个位置', titleEn: 'Find First and Last Position', category: '二分查找', difficulty: 'Medium', tags: ['数组', '二分'], hasVisualization: false },
  { id: 33, slug: '033_search_rotated', title: '搜索旋转排序数组', titleEn: 'Search in Rotated Sorted Array', category: '二分查找', difficulty: 'Medium', tags: ['数组', '二分'], hasVisualization: false },
  { id: 153, slug: '153_find_min_rotated', title: '寻找旋转排序数组中的最小值', titleEn: 'Find Minimum in Rotated Sorted Array', category: '二分查找', difficulty: 'Medium', tags: ['数组', '二分'], hasVisualization: false },
  { id: 4, slug: '004_median_arrays', title: '寻找两个正序数组的中位数', titleEn: 'Median of Two Sorted Arrays', category: '二分查找', difficulty: 'Hard', tags: ['数组', '二分', '分治'], hasVisualization: false },

  // ── 栈 ──────────────────────────────────────────────────────
  { id: 20, slug: '020_valid_parentheses', title: '有效的括号', titleEn: 'Valid Parentheses', category: '栈', difficulty: 'Easy', tags: ['栈', '字符串'], hasVisualization: false },
  { id: 155, slug: '155_min_stack', title: '最小栈', titleEn: 'Min Stack', category: '栈', difficulty: 'Medium', tags: ['栈', '设计'], hasVisualization: false },
  { id: 394, slug: '394_decode_string', title: '字符串解码', titleEn: 'Decode String', category: '栈', difficulty: 'Medium', tags: ['栈', '字符串', '递归'], hasVisualization: false },
  { id: 739, slug: '739_daily_temperatures', title: '每日温度', titleEn: 'Daily Temperatures', category: '栈', difficulty: 'Medium', tags: ['栈', '数组', '单调栈'], hasVisualization: false },
  { id: 496, slug: '496_next_greater_element', title: '下一个更大元素 I', titleEn: 'Next Greater Element I', category: '栈', difficulty: 'Easy', tags: ['栈', '单调栈', '哈希表'], hasVisualization: false },

  // ── 堆 ──────────────────────────────────────────────────────
  { id: 215, slug: '215_kth_largest', title: '数组中的第 K 个最大元素', titleEn: 'Kth Largest Element in an Array', category: '堆', difficulty: 'Medium', tags: ['堆', '快速选择'], hasVisualization: false },
  { id: 347, slug: '347_top_k_frequent', title: '前 K 个高频元素', titleEn: 'Top K Frequent Elements', category: '堆', difficulty: 'Medium', tags: ['哈希表', '堆', '桶排序'], hasVisualization: false },
  { id: 295, slug: '295_find_median', title: '数据流的中位数', titleEn: 'Find Median from Data Stream', category: '堆', difficulty: 'Hard', tags: ['双堆', '设计', '数据流'], hasVisualization: false },

  // ── 贪心 ────────────────────────────────────────────────────
  { id: 121, slug: '121_best_time_buy', title: '买卖股票的最佳时机', titleEn: 'Best Time to Buy and Sell Stock', category: '贪心', difficulty: 'Easy', tags: ['数组', '动态规划'], hasVisualization: false },
  { id: 55, slug: '055_jump_game', title: '跳跃游戏', titleEn: 'Jump Game', category: '贪心', difficulty: 'Medium', tags: ['数组', '贪心', '动态规划'], hasVisualization: false },
  { id: 45, slug: '045_jump_game_ii', title: '跳跃游戏 II', titleEn: 'Jump Game II', category: '贪心', difficulty: 'Medium', tags: ['数组', '贪心', '动态规划'], hasVisualization: false },
  { id: 763, slug: '763_partition_labels', title: '划分字母区间', titleEn: 'Partition Labels', category: '贪心', difficulty: 'Medium', tags: ['哈希表', '贪心', '字符串'], hasVisualization: false },

  // ── 动态规划 ────────────────────────────────────────────────
  { id: 70, slug: '070_climbing_stairs', title: '爬楼梯', titleEn: 'Climbing Stairs', category: '动态规划', difficulty: 'Easy', tags: ['记忆化搜索', '数学', 'DP'], hasVisualization: false },
  { id: 118, slug: '118_pascals_triangle', title: '杨辉三角', titleEn: "Pascal's Triangle", category: '动态规划', difficulty: 'Easy', tags: ['数组', 'DP'], hasVisualization: false },
  { id: 198, slug: '198_house_robber', title: '打家劫舍', titleEn: 'House Robber', category: '动态规划', difficulty: 'Medium', tags: ['数组', 'DP'], hasVisualization: false },
  { id: 279, slug: '279_perfect_squares', title: '完全平方数', titleEn: 'Perfect Squares', category: '动态规划', difficulty: 'Medium', tags: ['广度优先', 'DP'], hasVisualization: false },
  { id: 322, slug: '322_coin_change', title: '零钱兑换', titleEn: 'Coin Change', category: '动态规划', difficulty: 'Medium', tags: ['广度优先', 'DP'], hasVisualization: false },
  { id: 139, slug: '139_word_break', title: '单词拆分', titleEn: 'Word Break', category: '动态规划', difficulty: 'Medium', tags: ['字典树', '记忆化', 'DP'], hasVisualization: false },
  { id: 300, slug: '300_longest_increasing', title: '最长递增子序列', titleEn: 'Longest Increasing Subsequence', category: '动态规划', difficulty: 'Medium', tags: ['数组', '二分', 'DP'], hasVisualization: false },
  { id: 152, slug: '152_max_product_subarray', title: '乘积最大子数组', titleEn: 'Maximum Product Subarray', category: '动态规划', difficulty: 'Medium', tags: ['数组', 'DP'], hasVisualization: false },
  { id: 416, slug: '416_partition_subset', title: '分割等和子集', titleEn: 'Partition Equal Subset Sum', category: '动态规划', difficulty: 'Medium', tags: ['数组', 'DP'], hasVisualization: false },
  { id: 32, slug: '032_longest_valid_parens', title: '最长有效括号', titleEn: 'Longest Valid Parentheses', category: '动态规划', difficulty: 'Hard', tags: ['栈', '字符串', 'DP'], hasVisualization: false },

  // ── 多维 DP ─────────────────────────────────────────────────
  { id: 62, slug: '062_unique_paths', title: '不同路径', titleEn: 'Unique Paths', category: '多维DP', difficulty: 'Medium', tags: ['数学', '组合', 'DP'], hasVisualization: false },
  { id: 64, slug: '064_min_path_sum', title: '最小路径和', titleEn: 'Minimum Path Sum', category: '多维DP', difficulty: 'Medium', tags: ['数组', '矩阵', 'DP'], hasVisualization: false },
  { id: 5, slug: '005_longest_palindrome', title: '最长回文子串', titleEn: 'Longest Palindromic Substring', category: '多维DP', difficulty: 'Medium', tags: ['字符串', 'DP'], hasVisualization: false },
  { id: 1143, slug: '1143_lcs', title: '最长公共子序列', titleEn: 'Longest Common Subsequence', category: '多维DP', difficulty: 'Medium', tags: ['字符串', 'DP'], hasVisualization: false },
  { id: 72, slug: '072_edit_distance', title: '编辑距离', titleEn: 'Edit Distance', category: '多维DP', difficulty: 'Medium', tags: ['字符串', 'DP'], hasVisualization: false },
  { id: 312, slug: '312_burst_balloons', title: '戳气球', titleEn: 'Burst Balloons', category: '多维DP', difficulty: 'Hard', tags: ['数组', '记忆化', 'DP'], hasVisualization: false },

  // ── 技巧 ────────────────────────────────────────────────────
  { id: 136, slug: '136_single_number', title: '只出现一次的数字', titleEn: 'Single Number', category: '技巧', difficulty: 'Easy', tags: ['位运算', '数组'], hasVisualization: false },
  { id: 169, slug: '169_majority_element', title: '多数元素', titleEn: 'Majority Element', category: '技巧', difficulty: 'Easy', tags: ['数组', '哈希表', '分治'], hasVisualization: false },
  { id: 75, slug: '075_sort_colors', title: '颜色分类', titleEn: 'Sort Colors', category: '技巧', difficulty: 'Medium', tags: ['数组', '双指针', '排序'], hasVisualization: false },
  { id: 31, slug: '031_next_permutation', title: '下一个排列', titleEn: 'Next Permutation', category: '技巧', difficulty: 'Medium', tags: ['数组', '双指针'], hasVisualization: false },
]
