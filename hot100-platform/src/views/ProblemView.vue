<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, ArrowRight, ArrowLeftBold } from '@element-plus/icons-vue'
import { HOT100 } from '@/data/hot100'
import { useProgressStore, type LearningStatus } from '@/stores/progress'

const route = useRoute()
const router = useRouter()
const store = useProgressStore()

const iframeLoaded = ref(false)

// 当前题目信息
const problem = computed(() => HOT100.find(p => p.slug === route.params.slug))
const problemIndex = computed(() => HOT100.findIndex(p => p.slug === route.params.slug))

const prevProblem = computed(() =>
  problemIndex.value > 0 ? HOT100[problemIndex.value - 1] : null
)
const nextProblem = computed(() =>
  problemIndex.value < HOT100.length - 1 ? HOT100[problemIndex.value + 1] : null
)

const iframeSrc = computed(() =>
  problem.value?.hasVisualization
    ? `/problems/${problem.value.slug}.html`
    : null
)

// 当前学习状态
const currentStatus = computed<LearningStatus>(() =>
  problem.value ? store.getStatus(problem.value.id) : 'unvisited'
)

const statusOptions: { command: LearningStatus; label: string; icon: string }[] = [
  { command: 'unvisited',  label: '未学习', icon: '○' },
  { command: 'viewed',     label: '已查看', icon: '👁' },
  { command: 'practicing', label: '练习中', icon: '⚡' },
  { command: 'mastered',   label: '已掌握', icon: '✓' },
]

const statusTypeMap: Record<LearningStatus, 'info' | 'primary' | 'warning' | 'success'> = {
  unvisited:  'info',
  viewed:     'primary',
  practicing: 'warning',
  mastered:   'success',
}

const difficultyTextColor = computed(() => ({
  Easy:   '#788c5d',
  Medium: '#c8893c',
  Hard:   '#c85c5c',
}[problem.value?.difficulty ?? 'Easy']))

const difficultyBg = computed(() => ({
  Easy:   '#2a4a2a',
  Medium: '#4a3808',
  Hard:   '#4a1818',
}[problem.value?.difficulty ?? 'Easy']))

function onStatusChange(cmd: LearningStatus) {
  if (problem.value) store.setStatus(problem.value.id, cmd)
}

function goBack() {
  router.push({ name: 'home' })
}

function navigate(p: typeof prevProblem.value) {
  if (p) router.push({ name: 'problem', params: { slug: p.slug } })
}

// 进入页面时自动标记已查看
onMounted(() => {
  if (problem.value) store.markViewed(problem.value.id)
})
</script>

<template>
  <div class="problem-view">
    <!-- 顶部导航栏 -->
    <header class="problem-topbar">
      <!-- 返回按钮 -->
      <el-button
        :icon="ArrowLeftBold"
        size="small"
        class="back-btn"
        @click="goBack"
      >
        题库
      </el-button>

      <!-- 题目信息 -->
      <div class="problem-info" v-if="problem">
        <span class="problem-num">#{{ problem.id }}</span>
        <span class="problem-name-zh">{{ problem.title }}</span>
        <span class="problem-name-en">{{ problem.titleEn }}</span>
        <el-tag
          :color="difficultyBg"
          effect="dark"
          size="small"
          round
          :style="{ color: difficultyTextColor, borderColor: difficultyTextColor + '55' }"
        >
          {{ problem.difficulty }}
        </el-tag>
        <el-tag type="warning" effect="plain" size="small">
          {{ problem.category }}
        </el-tag>
      </div>

      <!-- 右侧操作 -->
      <div class="topbar-actions">
        <!-- 学习状态下拉 -->
        <el-dropdown @command="onStatusChange" trigger="click">
          <el-tag
            :type="statusTypeMap[currentStatus]"
            effect="light"
            size="default"
            class="status-dropdown-trigger"
          >
            {{ statusOptions.find(o => o.command === currentStatus)?.icon }}
            {{ statusOptions.find(o => o.command === currentStatus)?.label }}
            <span class="dropdown-arrow">▾</span>
          </el-tag>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="opt in statusOptions"
                :key="opt.command"
                :command="opt.command"
                :class="{ 'is-active': currentStatus === opt.command }"
              >
                {{ opt.icon }} {{ opt.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 上一题 / 下一题 -->
        <div class="nav-btns">
          <el-button
            :icon="ArrowLeft"
            size="small"
            circle
            :disabled="!prevProblem"
            class="nav-btn"
            :title="prevProblem ? `#${prevProblem.id} ${prevProblem.title}` : '已是第一题'"
            @click="navigate(prevProblem)"
          />
          <el-button
            :icon="ArrowRight"
            size="small"
            circle
            :disabled="!nextProblem"
            class="nav-btn"
            :title="nextProblem ? `#${nextProblem.id} ${nextProblem.title}` : '已是最后一题'"
            @click="navigate(nextProblem)"
          />
        </div>
      </div>
    </header>

    <!-- iframe 展示区 -->
    <div class="iframe-container">
      <!-- 有可视化内容 -->
      <template v-if="iframeSrc">
        <div v-if="!iframeLoaded" class="iframe-loading">
          <el-icon class="loading-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" :stroke-width="2" fill="none" stroke="currentColor" stroke-dasharray="31.4" stroke-dashoffset="10"/></svg></el-icon>
          <span>加载可视化中…</span>
        </div>
        <iframe
          :src="iframeSrc"
          :class="['viz-iframe', { loaded: iframeLoaded }]"
          @load="iframeLoaded = true"
          frameborder="0"
          allowfullscreen
        />
      </template>

      <!-- Coming Soon 占位 -->
      <div v-else class="coming-soon-page">
        <div class="coming-soon-content">
          <div class="cs-icon">⚗️</div>
          <h2 class="cs-title">可视化制作中</h2>
          <p class="cs-desc">「{{ problem?.title }}」的算法可视化正在精心制作中</p>
          <p class="cs-sub">将使用 p5.js + 五语言代码 + 逐步执行日志呈现</p>
          <div class="cs-tags">
            <el-tag
              v-for="tag in problem?.tags"
              :key="tag"
              type="info"
              effect="plain"
              size="small"
            >{{ tag }}</el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.problem-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-app);
}

/* 顶部导航 */
.problem-topbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  height: 52px;
  background: var(--bg-topbar);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  overflow: hidden;
}

.back-btn {
  flex-shrink: 0;
  background: var(--bg-card) !important;
  border-color: var(--border) !important;
  color: var(--text-muted) !important;
  font-size: 12px !important;
}
.back-btn:hover {
  color: var(--c-orange) !important;
  border-color: var(--c-orange) !important;
}

.problem-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  overflow: hidden;
  min-width: 0;
}
.problem-num {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
  flex-shrink: 0;
}
.problem-name-zh {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  flex-shrink: 0;
}
.problem-name-en {
  font-size: 12px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  margin-left: auto;
}

.status-dropdown-trigger {
  cursor: pointer;
  user-select: none;
  font-size: 12px !important;
}
.dropdown-arrow {
  margin-left: 4px;
  font-size: 10px;
  opacity: 0.7;
}

.nav-btns {
  display: flex;
  gap: 4px;
}
.nav-btn {
  background: var(--bg-card) !important;
  border-color: var(--border) !important;
  color: var(--text-muted) !important;
}
.nav-btn:not(:disabled):hover {
  border-color: var(--c-orange) !important;
  color: var(--c-orange) !important;
}

/* iframe 区域 */
.iframe-container {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.iframe-loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: var(--bg-app);
  color: var(--text-muted);
  font-size: 14px;
  z-index: 1;
}
.loading-icon {
  font-size: 32px;
  color: var(--c-orange);
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.viz-iframe {
  width: 100%;
  height: 100%;
  border: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.viz-iframe.loaded {
  opacity: 1;
}

/* Coming Soon 页 */
.coming-soon-page {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-app);
}
.coming-soon-content {
  text-align: center;
  max-width: 440px;
  padding: 40px;
}
.cs-icon {
  font-size: 48px;
  margin-bottom: 16px;
}
.cs-title {
  font-family: var(--font-display);
  font-size: 22px;
  color: var(--text-primary);
  margin-bottom: 12px;
}
.cs-desc {
  font-size: 15px;
  color: var(--text-muted);
  margin-bottom: 8px;
  line-height: 1.6;
}
.cs-sub {
  font-size: 12px;
  color: var(--text-dim);
  margin-bottom: 20px;
}
.cs-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

/* EP Dropdown 菜单暗色 */
:deep(.el-dropdown-menu) {
  background: var(--bg-card) !important;
  border-color: var(--border) !important;
}
:deep(.el-dropdown-menu__item) {
  color: var(--text-muted) !important;
  font-size: 13px !important;
}
:deep(.el-dropdown-menu__item:hover),
:deep(.el-dropdown-menu__item.is-active) {
  background: var(--bg-card-hover) !important;
  color: var(--c-orange) !important;
}
</style>
