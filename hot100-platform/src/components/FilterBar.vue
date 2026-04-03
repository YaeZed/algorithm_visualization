<script setup lang="ts">
import { type Category } from '@/data/hot100'

const props = defineProps<{
  selectedCategory: Category | null
  selectedDifficulty: string
  selectedStatus: string
  searchQuery: string
}>()

const emit = defineEmits<{
  'update:selectedCategory': [v: Category | null]
  'update:selectedDifficulty': [v: string]
  'update:selectedStatus': [v: string]
  'update:searchQuery': [v: string]
}>()

const difficultyOptions = [
  { label: '全部', value: '' },
  { label: 'Easy', value: 'Easy' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Hard', value: 'Hard' },
]

const statusOptions = [
  { label: '全部', value: '' },
  { label: '未学习', value: 'unvisited' },
  { label: '已查看', value: 'viewed' },
  { label: '练习中', value: 'practicing' },
  { label: '已掌握', value: 'mastered' },
]
</script>

<template>
  <div class="filter-bar">
    <el-input
      :model-value="searchQuery"
      @update:model-value="emit('update:searchQuery', String($event ?? ''))"
      placeholder="搜索题目..."
      clearable
      class="search-input"
    >
      <template #prefix>
        <span class="search-icon">🔍</span>
      </template>
    </el-input>

    <div class="filter-group">
      <span class="filter-label">难度</span>
      <el-radio-group
        :model-value="selectedDifficulty"
        @update:model-value="emit('update:selectedDifficulty', String($event))"
        size="small"
      >
        <el-radio-button
          v-for="opt in difficultyOptions"
          :key="opt.value"
          :value="opt.value"
          :class="['diff-btn', opt.value.toLowerCase()]"
        >
          {{ opt.label }}
        </el-radio-button>
      </el-radio-group>
    </div>

    <div class="filter-group">
      <span class="filter-label">状态</span>
      <el-radio-group
        :model-value="selectedStatus"
        @update:model-value="emit('update:selectedStatus', String($event))"
        size="small"
      >
        <el-radio-button
          v-for="opt in statusOptions"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  background: var(--bg-sidebar);
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
}
.search-input {
  width: 220px;
  flex-shrink: 0;
}
.search-icon {
  font-size: 12px;
}
.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
.filter-label {
  font-size: 12px;
  color: var(--text-muted);
  white-space: nowrap;
}

/* EP Radio Button 暗色覆盖 */
:deep(.el-radio-button__inner) {
  background: var(--bg-card) !important;
  border-color: var(--border) !important;
  color: var(--text-muted) !important;
  font-size: 12px !important;
  padding: 5px 10px !important;
}
:deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background: var(--c-orange) !important;
  border-color: var(--c-orange) !important;
  color: white !important;
  box-shadow: none !important;
}
:deep(.el-radio-button__inner:hover) {
  color: var(--c-orange) !important;
}
</style>
