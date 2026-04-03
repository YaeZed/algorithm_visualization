// ============================================================
// Pinia progress store — localStorage 持久化
// ============================================================
import { defineStore } from 'pinia'

export type LearningStatus = 'unvisited' | 'viewed' | 'practicing' | 'mastered'

export interface ProblemProgress {
  status: LearningStatus
  lastViewed: string   // ISO datetime
  viewCount: number
}

const STORAGE_KEY = 'algo_hot100_progress'

export const useProgressStore = defineStore('progress', {
  state: () => ({
    records: {} as Record<number, ProblemProgress>,
  }),

  getters: {
    stats(state): Record<LearningStatus, number> {
      const counts: Record<LearningStatus, number> = {
        unvisited: 0, viewed: 0, practicing: 0, mastered: 0,
      }
      Object.values(state.records).forEach(r => counts[r.status]++)
      counts.unvisited += 100 - Object.keys(state.records).length
      return counts
    },
    masteredCount(): number {
      return (this.stats as Record<LearningStatus, number>).mastered
    },
    getStatus: (state) => (id: number): LearningStatus => {
      return state.records[id]?.status ?? 'unvisited'
    },
  },

  actions: {
    markViewed(id: number) {
      const cur = this.records[id]
      if (!cur || cur.status === 'unvisited') {
        this.records[id] = {
          status: 'viewed',
          lastViewed: new Date().toISOString(),
          viewCount: (cur?.viewCount ?? 0) + 1,
        }
      } else {
        this.records[id].lastViewed = new Date().toISOString()
        this.records[id].viewCount++
      }
      this._persist()
    },

    setStatus(id: number, status: LearningStatus) {
      if (!this.records[id]) {
        this.records[id] = { status, lastViewed: new Date().toISOString(), viewCount: 1 }
      } else {
        this.records[id].status = status
      }
      if (status !== 'unvisited') {
        this.records[id].lastViewed = new Date().toISOString()
      }
      this._persist()
    },

    _persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.records))
    },

    loadFromStorage() {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        try { this.records = JSON.parse(raw) } catch { /* malformed */ }
      }
    },

    reset() {
      this.records = {}
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})
