<script setup lang="ts">
import { computed } from 'vue'
import { useProgressStore } from '@/stores/progress'

const store = useProgressStore()
const mastered = computed(() => store.masteredCount)
const percentage = computed(() => Math.round((mastered.value / 100) * 100))
</script>

<template>
  <div class="progress-bar-wrap">
    <div class="progress-label">
      <span class="label-text">掌握进度</span>
      <span class="label-count">
        <span class="count-num">{{ mastered }}</span>
        <span class="count-total"> / 100</span>
      </span>
    </div>
    <el-progress
      :percentage="percentage"
      :show-text="false"
      striped
      striped-flow
      :duration="10"
      :stroke-width="6"
      class="ep-progress"
    />
  </div>
</template>

<style scoped>
.progress-bar-wrap {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 180px;
}
.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.label-text {
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.5px;
}
.label-count {
  font-family: var(--font-mono);
  font-size: 12px;
}
.count-num {
  color: var(--c-orange);
  font-weight: 600;
}
.count-total {
  color: var(--text-muted);
}
/* EP progress 条颜色覆盖 */
:deep(.el-progress-bar__inner) {
  background: linear-gradient(90deg, #d97757, #6a9bcc) !important;
}
:deep(.el-progress-bar__outer) {
  background: var(--border) !important;
}
</style>
