<script setup lang="ts">
import { ref, computed } from 'vue'
import { HOT100, type Category, type Problem } from '@/data/hot100'
import { useProgressStore } from '@/stores/progress'
import CategorySidebar from '@/components/CategorySidebar.vue'
import FilterBar from '@/components/FilterBar.vue'
import TopProgressBar from '@/components/TopProgressBar.vue'
import ProblemCard from '@/components/ProblemCard.vue'

const store = useProgressStore()

// 筛选状态
const selectedCategory = ref<Category | null>(null)
const selectedDifficulty = ref('')
const selectedStatus = ref('')
const searchQuery = ref('')

// 过滤后题目列表
const filteredProblems = computed<Problem[]>(() => {
  return HOT100.filter(p => {
    if (selectedCategory.value && p.category !== selectedCategory.value) return false
    if (selectedDifficulty.value && p.difficulty !== selectedDifficulty.value) return false
    if (selectedStatus.value) {
      const status = store.getStatus(p.id)
      if (status !== selectedStatus.value) return false
    }
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.trim().toLowerCase()
      if (!p.title.toLowerCase().includes(q) &&
          !p.titleEn.toLowerCase().includes(q) &&
          !String(p.id).includes(q)) return false
    }
    return true
  })
})

const totalFiltered = computed(() => filteredProblems.value.length)
const stats = computed(() => store.stats)
</script>

<template>
  <div class="home-layout">
    <!-- 左侧分类栏 -->
    <CategorySidebar
      :selected-category="selectedCategory"
      @update:selected-category="selectedCategory = $event"
    />

    <!-- 右侧主区 -->
    <div class="main-area">
      <!-- 顶部导航栏 -->
      <header class="topbar">
        <div class="topbar-left">
          <h1 class="topbar-title">LeetCode Hot 100</h1>
          <span class="topbar-sub">算法可视化平台</span>
        </div>
        <div class="topbar-center">
          <!-- 状态统计 -->
          <div class="stat-group">
            <div class="stat-item">
              <span class="stat-num" style="color: var(--c-green)">{{ stats.mastered }}</span>
              <span class="stat-label">已掌握</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-num" style="color: var(--c-amber)">{{ stats.practicing }}</span>
              <span class="stat-label">练习中</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-num" style="color: var(--c-blue)">{{ stats.viewed }}</span>
              <span class="stat-label">已查看</span>
            </div>
          </div>
        </div>
        <div class="topbar-right">
          <TopProgressBar />
        </div>
      </header>

      <!-- 筛选栏 -->
      <FilterBar
        :selected-category="selectedCategory"
        :selected-difficulty="selectedDifficulty"
        :selected-status="selectedStatus"
        :search-query="searchQuery"
        @update:selected-category="selectedCategory = $event"
        @update:selected-difficulty="selectedDifficulty = $event"
        @update:selected-status="selectedStatus = $event"
        @update:search-query="searchQuery = $event"
      />

      <!-- 题目网格 -->
      <div class="content-area">
        <div class="grid-header">
          <span class="grid-count">
            共 <strong>{{ totalFiltered }}</strong> 道题目
            <span v-if="selectedCategory" class="active-filter">· {{ selectedCategory }}</span>
            <span v-if="selectedDifficulty" class="active-filter">· {{ selectedDifficulty }}</span>
          </span>
        </div>

        <div v-if="totalFiltered > 0" class="problem-grid">
          <ProblemCard
            v-for="problem in filteredProblems"
            :key="problem.id"
            :problem="problem"
          />
        </div>

        <el-empty
          v-else
          description="没有符合条件的题目"
          :image-size="80"
          class="empty-state"
        />
      </div>

      <!-- 回顶 -->
      <el-backtop :right="24" :bottom="24" />
    </div>
  </div>
</template>

<style scoped>
.home-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: var(--bg-app);
}

/* 主区域 */
.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

/* 顶栏 */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 60px;
  background: var(--bg-topbar);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  gap: 20px;
}
.topbar-left {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-shrink: 0;
}
.topbar-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: var(--c-orange);
  white-space: nowrap;
}
.topbar-sub {
  font-size: 12px;
  color: var(--text-muted);
  white-space: nowrap;
}

.topbar-center {
  flex: 1;
  display: flex;
  justify-content: center;
}
.stat-group {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 6px 16px;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}
.stat-num {
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
}
.stat-label {
  font-size: 10px;
  color: var(--text-muted);
}
.stat-divider {
  width: 1px;
  height: 24px;
  background: var(--border);
}

.topbar-right {
  flex-shrink: 0;
}

/* 内容区 */
.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
}
.grid-header {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.grid-count {
  font-size: 13px;
  color: var(--text-muted);
}
.grid-count strong {
  color: var(--text-primary);
}
.active-filter {
  color: var(--c-orange);
}

/* 卡片网格 */
.problem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
}

.empty-state {
  margin-top: 80px;
}
:deep(.el-empty__description) {
  color: var(--text-muted) !important;
}

/* 回顶按钮覆盖 */
:deep(.el-backtop) {
  background: var(--c-orange) !important;
  color: white !important;
}
</style>
