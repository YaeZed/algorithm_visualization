<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { HOT100, type Category, type Problem } from "@/data/hot100";
import { useProgressStore } from "@/stores/progress";
import CategorySidebar from "@/components/CategorySidebar.vue";
import FilterBar from "@/components/FilterBar.vue";
import TopProgressBar from "@/components/TopProgressBar.vue";
import ProblemCard from "@/components/ProblemCard.vue";

const store = useProgressStore();

// 筛选状态
const selectedCategory = ref<Category | null>(null);
const selectedDifficulty = ref("");
const selectedStatus = ref("");
const searchQuery = ref("");

// 过滤后的题目列表
const filteredProblems = computed<Problem[]>(() => {
  return HOT100.filter((p) => {
    if (selectedCategory.value && p.category !== selectedCategory.value)
      return false;
    if (selectedDifficulty.value && p.difficulty !== selectedDifficulty.value)
      return false;
    if (selectedStatus.value) {
      const status = store.getStatus(p.id);
      if (status !== selectedStatus.value) return false;
    }
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.trim().toLowerCase();
      if (
        !p.title.toLowerCase().includes(q) &&
        !p.titleEn.toLowerCase().includes(q) &&
        !String(p.id).includes(q)
      )
        return false;
    }
    return true;
  });
});

const totalFiltered = computed(() => filteredProblems.value.length);
const stats = computed(() => store.stats);
const contentAreaRef = ref<HTMLElement | null>(null);
const HOME_SCROLL_KEY = "hot100-home-scroll-top";

const currentTheme = ref<"dark" | "light">("dark");
const isDarkTheme = computed(() => currentTheme.value === "dark");
const themeIcon = computed(() => (isDarkTheme.value ? "🌙" : "☀"));
const themeSwitchHint = computed(() =>
  isDarkTheme.value ? "切换到浅色模式" : "切换到深色模式"
);

function applyTheme(theme: "dark" | "light") {
  currentTheme.value = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("hot100-theme", theme);
}

function toggleTheme() {
  applyTheme(isDarkTheme.value ? "light" : "dark");
}

function saveHomeScrollPosition() {
  if (!contentAreaRef.value) return;
  sessionStorage.setItem(HOME_SCROLL_KEY, String(contentAreaRef.value.scrollTop));
}

function restoreHomeScrollPosition() {
  if (!contentAreaRef.value) return;
  const raw = sessionStorage.getItem(HOME_SCROLL_KEY);
  if (!raw) return;
  const top = Number(raw);
  if (Number.isFinite(top) && top >= 0) {
    contentAreaRef.value.scrollTop = top;
  }
}

function handleContentScroll() {
  saveHomeScrollPosition();
}

onMounted(() => {
  const savedTheme = localStorage.getItem("hot100-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    applyTheme(savedTheme);
  } else {
    const domTheme = document.documentElement.getAttribute("data-theme");
    if (domTheme === "light" || domTheme === "dark") {
      currentTheme.value = domTheme;
    } else {
      applyTheme("dark");
    }
  }

  // 等网格渲染后恢复滚动位置，避免回到首页时跳到顶部
  nextTick(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        restoreHomeScrollPosition();
      });
    });
  });
});

onBeforeRouteLeave(() => {
  saveHomeScrollPosition();
});

onBeforeUnmount(() => {
  saveHomeScrollPosition();
});
</script>

<template>
  <div class="home-layout">
    <!-- 左侧分类栏 -->
    <CategorySidebar
      :selected-category="selectedCategory"
      @update:selected-category="selectedCategory = $event"
    />

    <!-- 右侧主区域 -->
    <div class="main-area">
      <!-- 顶部导航栏 -->
      <header class="topbar">
        <div class="topbar-left">
          <h1 class="topbar-title">LeetCode Hot 100</h1>
          <span class="topbar-sub">算法可视化平台</span>
          <a
            class="repo-link"
            href="https://github.com/YaeZed/algorithm_visualization"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub 仓库"
            title="GitHub 仓库"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.66-.22.66-.49 0-.24-.01-.89-.01-1.75-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.27-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.8c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.42.2 2.45.1 2.72.64.72 1.02 1.63 1.02 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.67.94.67 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.16.6.67.49A10.23 10.23 0 0 0 22 12.23C22 6.58 17.52 2 12 2z"
              />
            </svg>
          </a>
        </div>

        <div class="topbar-center">
          <!-- 状态统计 -->
          <div class="stat-group">
            <div class="stat-item">
              <span class="stat-num" style="color: var(--c-green)">{{
                stats.mastered
              }}</span>
              <span class="stat-label">已掌握</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-num" style="color: var(--c-amber)">{{
                stats.practicing
              }}</span>
              <span class="stat-label">练习中</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-num" style="color: var(--c-blue)">{{
                stats.viewed
              }}</span>
              <span class="stat-label">已查看</span>
            </div>
          </div>

          <el-tag
            class="theme-toggle-tag"
            effect="dark"
            round
            :aria-label="themeSwitchHint"
            :title="themeSwitchHint"
            @click="toggleTheme"
          >
            <span class="theme-icon">{{ themeIcon }}</span>
          </el-tag>
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
      <div
        ref="contentAreaRef"
        class="content-area"
        @scroll.passive="handleContentScroll"
      >
        <div class="grid-header">
          <span class="grid-count">
            共 <strong>{{ totalFiltered }}</strong> 道题目
            <span v-if="selectedCategory" class="active-filter"
              >· {{ selectedCategory }}</span
            >
            <span v-if="selectedDifficulty" class="active-filter"
              >· {{ selectedDifficulty }}</span
            >
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

      <!-- 回到顶部 -->
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

.repo-link {
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-left: 2px;
  color: #8a8f99;
  text-decoration: none;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.repo-link:hover {
  color: #c7ccd6;
  transform: translateY(-1px);
}

.repo-link svg {
  width: 20px;
  height: 20px;
}

.topbar-center {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
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

.theme-toggle-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  min-width: 38px;
  padding: 0 10px !important;
  border-radius: 999px !important;
  border: 1px solid var(--border) !important;
  background: var(--bg-card) !important;
  color: var(--text-primary) !important;
  cursor: pointer;
  user-select: none;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.theme-toggle-tag:hover {
  background: var(--bg-card-hover) !important;
  border-color: var(--border-bright) !important;
  transform: translateY(-1px);
}

.theme-icon {
  font-size: 14px;
  line-height: 1;
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

/* 回到顶部按钮覆盖 */
:deep(.el-backtop) {
  background: var(--c-orange) !important;
  color: white !important;
}
</style>
