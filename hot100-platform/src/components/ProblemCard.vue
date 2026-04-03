<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore, type LearningStatus } from '@/stores/progress'
import type { Problem } from '@/data/hot100'

const props = defineProps<{ problem: Problem }>()

const router = useRouter()
const store = useProgressStore()

const status = computed<LearningStatus>(() => store.getStatus(props.problem.id))

const difficultyColor = computed(() => ({
  Easy:   '#2a4a2a',
  Medium: '#4a3808',
  Hard:   '#4a1818',
}[props.problem.difficulty] ?? '#333'))

const difficultyTextColor = computed(() => ({
  Easy:   '#788c5d',
  Medium: '#c8893c',
  Hard:   '#c85c5c',
}[props.problem.difficulty] ?? '#888'))

const statusConfig = computed(() => ({
  unvisited:  { label: '未学习', type: 'info'    as const, icon: '○' },
  viewed:     { label: '已查看', type: 'primary'  as const, icon: '👁' },
  practicing: { label: '练习中', type: 'warning'  as const, icon: '⚡' },
  mastered:   { label: '已掌握', type: 'success'  as const, icon: '✓' },
}[status.value]))

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
      :class="{ 'coming-soon': isComingSoon }"
      :style="{ '--status-border': borderColor }"
      @click="handleClick"
    >
      <!-- 题号 + 难度 -->
      <div class="card-header">
        <span class="problem-id">#{{ problem.id }}</span>
        <el-tag
          :color="difficultyColor"
          effect="dark"
          size="small"
          round
          :style="{ color: difficultyTextColor, borderColor: difficultyTextColor + '44' }"
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
          class="status-tag"
        >
          {{ statusConfig.icon }} {{ statusConfig.label }}
        </el-tag>
      </div>
    </div>
  </el-tooltip>
</template>

<style scoped>
.problem-card {
  background: var(--bg-card);
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
  background: var(--bg-card-hover);
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
</style>
