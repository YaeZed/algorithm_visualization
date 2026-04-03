<script setup lang="ts">
import { computed } from 'vue'
import { ALL_CATEGORIES, HOT100, type Category } from '@/data/hot100'
import { useProgressStore } from '@/stores/progress'

const props = defineProps<{ selectedCategory: Category | null }>()
const emit = defineEmits<{ 'update:selectedCategory': [v: Category | null] }>()

const store = useProgressStore()

// 每个分类的统计
const categoryStats = computed(() => {
  const stats: Record<string, { total: number; mastered: number; available: number }> = {}
  for (const cat of ALL_CATEGORIES) {
    const problems = HOT100.filter(p => p.category === cat)
    stats[cat] = {
      total: problems.length,
      mastered: problems.filter(p => store.getStatus(p.id) === 'mastered').length,
      available: problems.filter(p => p.hasVisualization).length,
    }
  }
  return stats
})

function selectCategory(cat: Category) {
  emit('update:selectedCategory', props.selectedCategory === cat ? null : cat)
}
</script>

<template>
  <aside class="sidebar">
    <!-- Logo区 -->
    <div class="sidebar-logo">
      <div class="logo-mark">H</div>
      <div class="logo-text">
        <span class="logo-title">Hot 100</span>
        <span class="logo-sub">算法可视化</span>
      </div>
    </div>

    <!-- 分类导航 -->
    <div class="sidebar-section-label">分类</div>

    <!-- 全部 -->
    <div
      class="category-item"
      :class="{ active: selectedCategory === null }"
      @click="emit('update:selectedCategory', null)"
    >
      <span class="cat-name">全部题目</span>
      <span class="cat-count">100</span>
    </div>

    <!-- 各分类 -->
    <div
      v-for="cat in ALL_CATEGORIES"
      :key="cat"
      class="category-item"
      :class="{ active: selectedCategory === cat }"
      @click="selectCategory(cat)"
    >
      <span class="cat-name">{{ cat }}</span>
      <div class="cat-meta">
        <span
          v-if="categoryStats[cat].mastered > 0"
          class="cat-mastered"
          :title="`已掌握 ${categoryStats[cat].mastered} 题`"
        >
          ✓{{ categoryStats[cat].mastered }}
        </span>
        <span class="cat-count">{{ categoryStats[cat].total }}</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 200px;
  flex-shrink: 0;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
}

/* Logo */
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 16px 14px;
  border-bottom: 1px solid var(--border);
}
.logo-mark {
  width: 32px;
  height: 32px;
  background: var(--c-orange);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
}
.logo-text {
  display: flex;
  flex-direction: column;
}
.logo-title {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1;
}
.logo-sub {
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 2px;
}

/* Section label */
.sidebar-section-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--text-dim);
  text-transform: uppercase;
  padding: 14px 16px 6px;
}

/* Category items */
.category-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 16px;
  cursor: pointer;
  border-radius: 0 6px 6px 0;
  margin-right: 8px;
  transition: background 0.15s ease, color 0.15s ease;
  border-left: 2px solid transparent;
}
.category-item:hover {
  background: var(--bg-card);
  color: var(--text-primary);
}
.category-item.active {
  background: rgba(217, 119, 87, 0.12);
  border-left-color: var(--c-orange);
}
.cat-name {
  font-size: 13px;
  color: var(--text-muted);
  transition: color 0.15s;
}
.category-item.active .cat-name,
.category-item:hover .cat-name {
  color: var(--text-primary);
}
.category-item.active .cat-name {
  color: var(--c-orange);
  font-weight: 500;
}
.cat-meta {
  display: flex;
  align-items: center;
  gap: 4px;
}
.cat-count {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-dim);
  background: var(--bg-card);
  padding: 1px 5px;
  border-radius: 4px;
}
.cat-mastered {
  font-size: 10px;
  color: var(--c-green);
  font-family: var(--font-mono);
}
</style>
