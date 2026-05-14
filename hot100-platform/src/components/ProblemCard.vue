<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore, type LearningStatus } from '@/stores/progress'
import type { Problem } from '@/data/hot100'

const props = defineProps<{ problem: Problem }>()

const router = useRouter()
const store = useProgressStore()

const status = computed<LearningStatus>(() => store.getStatus(props.problem.id))

const statusConfig = computed(() => ({
  unvisited:  { label: '未学习', type: 'info'    as const, icon: '○' },
  viewed:     { label: '已查看', type: 'primary'  as const, icon: '📘' },
  practicing: { label: '练习中', type: 'warning'  as const, icon: '⚡' },
  mastered:   { label: '已掌握', type: 'success'  as const, icon: '✓' },
}[status.value]))
const statusClass = computed(() => `status-${status.value}`)

const borderColor = computed(() => ({
  unvisited:  'var(--border)',
  viewed:     'var(--c-blue)',
  practicing: 'var(--c-amber)',
  mastered:   'var(--c-green)',
}[status.value]))

const isComingSoon = computed(() => !props.problem.hasVisualization)

function handleClick() {
  if (isComingSoon.value) return
  router.push({ name: 'problem', params: { slug: props.problem.slug } })
}
</script>

<template>
  <el-tooltip
    :content="isComingSoon ? '可视化制作中，敬请期待…' : ''"
    :disabled="!isComingSoon"
    placement="top"
    effect="dark"
  >
    <div
      class="problem-card"
      :class="[{ 'coming-soon': isComingSoon }, `status-${status}`]"
      :style="{ '--status-border': borderColor }"
      @click="handleClick"
    >
      <!-- 题号 + 难度 -->
      <div class="card-header">
        <span class="problem-id">#{{ problem.id }}</span>
        <el-tag
          effect="plain"
          size="small"
          round
          :class="['difficulty-tag', `diff-${problem.difficulty.toLowerCase()}`]"
        >
          {{ problem.difficulty }}
        </el-tag>
      </div>

      <!-- 标题 -->
      <div class="card-body">
        <h3 class="title-zh">{{ problem.title }}</h3>
        <p class="title-en">{{ problem.titleEn }}</p>
      </div>

      <!-- 分类 tag -->
      <div class="card-tags">
        <el-tag type="warning" effect="plain" size="small" class="category-tag">
          {{ problem.category }}
        </el-tag>
        <el-tag
          v-if="isComingSoon"
          type="info"
          effect="plain"
          size="small"
          class="soon-tag"
        >
          即将上线
        </el-tag>
      </div>

      <!-- 分隔线 + 状态 -->
      <div class="card-footer">
        <el-tag
          :type="statusConfig.type"
          effect="light"
          size="small"
          :class="['status-tag', statusClass]"
        >
          {{ statusConfig.icon }} {{ statusConfig.label }}
        </el-tag>
      </div>
    </div>
  </el-tooltip>
</template>

<style scoped>
.problem-card {
  background: color-mix(in srgb, var(--bg-card) 80%, transparent);
  backdrop-filter: blur(10px) saturate(120%);
  -webkit-backdrop-filter: blur(10px) saturate(120%);
  border: 1px solid var(--border);
  border-left: 3px solid var(--status-border, var(--border));
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 150px;
  position: relative;
  overflow: hidden;
}
.problem-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(217, 119, 87, 0.03) 0%, transparent 60%);
  pointer-events: none;
}
.problem-card:hover:not(.coming-soon) {
  transform: translateY(-3px);
  background: color-mix(in srgb, var(--bg-card-hover) 82%, transparent);
  border-color: var(--border-bright);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
.problem-card:active:not(.coming-soon) {
  transform: scale(0.98);
}
.coming-soon {
  opacity: 0.45;
  cursor: not-allowed;
  border-style: dashed;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.problem-id {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.5px;
}

.card-body {
  flex: 1;
}
.title-zh {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.4;
  margin-bottom: 3px;
}
.title-en {
  font-size: 11px;
  color: var(--text-muted);
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.difficulty-tag {
  font-size: 11px !important;
  font-weight: 500;
}
.difficulty-tag.diff-easy {
  --el-tag-bg-color: rgba(120, 140, 93, 0.18) !important;
  --el-tag-border-color: rgba(120, 140, 93, 0.55) !important;
  --el-tag-text-color: #90a876 !important;
}
.difficulty-tag.diff-medium {
  --el-tag-bg-color: rgba(200, 137, 60, 0.2) !important;
  --el-tag-border-color: rgba(200, 137, 60, 0.55) !important;
  --el-tag-text-color: #d8a45d !important;
}
.difficulty-tag.diff-hard {
  --el-tag-bg-color: rgba(200, 92, 92, 0.18) !important;
  --el-tag-border-color: rgba(200, 92, 92, 0.52) !important;
  --el-tag-text-color: #d58484 !important;
}
.category-tag {
  font-size: 11px !important;
}
.soon-tag {
  font-size: 10px !important;
}

.card-footer {
  border-top: 1px solid var(--border);
  padding-top: 8px;
}
.status-tag {
  font-size: 11px !important;
}

.status-tag.status-unvisited {
  --el-tag-bg-color: #2f3135 !important;
  --el-tag-border-color: #494d54 !important;
  --el-tag-text-color: #b7bdc8 !important;
}

/* 浅色模式：提高标签鲜艳度，并减少突兀感 */
:global(:root[data-theme='light']) .difficulty-tag.diff-easy {
  --el-tag-bg-color: rgba(94, 122, 69, 0.18) !important;
  --el-tag-border-color: rgba(94, 122, 69, 0.62) !important;
  --el-tag-text-color: #4f6d34 !important;
}
:global(:root[data-theme='light']) .difficulty-tag.diff-medium {
  --el-tag-bg-color: rgba(169, 111, 47, 0.19) !important;
  --el-tag-border-color: rgba(169, 111, 47, 0.64) !important;
  --el-tag-text-color: #8f5a1f !important;
}
:global(:root[data-theme='light']) .difficulty-tag.diff-hard {
  --el-tag-bg-color: rgba(177, 73, 73, 0.18) !important;
  --el-tag-border-color: rgba(177, 73, 73, 0.63) !important;
  --el-tag-text-color: #963737 !important;
}

:global(:root[data-theme='light']) .category-tag {
  --el-tag-bg-color: #f8ebd9 !important;
  --el-tag-border-color: #dfb178 !important;
  --el-tag-text-color: #8d5a21 !important;
  background-color: #f8ebd9 !important;
  border-color: #dfb178 !important;
  color: #8d5a21 !important;
}

:global(:root[data-theme='light']) .status-tag.status-unvisited {
  --el-tag-bg-color: #ece6dc !important;
  --el-tag-border-color: #b7ab9b !important;
  --el-tag-text-color: #5f584f !important;
}
:global(:root[data-theme='light']) .status-tag.status-viewed {
  --el-tag-bg-color: rgba(63, 117, 166, 0.16) !important;
  --el-tag-border-color: rgba(63, 117, 166, 0.55) !important;
  --el-tag-text-color: #2f6796 !important;
}
:global(:root[data-theme='light']) .status-tag.status-practicing {
  --el-tag-bg-color: rgba(169, 111, 47, 0.17) !important;
  --el-tag-border-color: rgba(169, 111, 47, 0.58) !important;
  --el-tag-text-color: #8f5a1f !important;
}
:global(:root[data-theme='light']) .status-tag.status-mastered {
  --el-tag-bg-color: rgba(94, 122, 69, 0.16) !important;
  --el-tag-border-color: rgba(94, 122, 69, 0.56) !important;
  --el-tag-text-color: #4f6d34 !important;
}

/* 浅色模式：题卡左侧状态色条更鲜艳 */
:global(:root[data-theme='light']) .problem-card.status-unvisited {
  border-left-color: #8d95a2 !important;
}
:global(:root[data-theme='light']) .problem-card.status-viewed {
  border-left-color: #2f7fcd !important;
}
:global(:root[data-theme='light']) .problem-card.status-practicing {
  border-left-color: #cb7b21 !important;
}
:global(:root[data-theme='light']) .problem-card.status-mastered {
  border-left-color: #5f8f37 !important;
}
</style>
