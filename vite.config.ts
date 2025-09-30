import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
  // 根據環境決定 base 路徑
  // 優先級：VITE_BASE_PATH 環境變數 > GitHub Actions 自動檢測 > 預設子路徑
  let base = '/'

  if (import.meta.env.VITE_BASE_PATH) {
    base = import.meta.env.VITE_BASE_PATH
  } else if (import.meta.env.VITE_GITHUB_ACTIONS && !import.meta.env.VITE_BASE_PATH) {
    // 在 GitHub Actions 中，如果沒有明確設定 VITE_BASE_PATH，使用子路徑
    base = '/mandela-effect-quiz/'
  }

  console.log(`Building with base path: ${base}`)

  return {
    plugins: [react()],
    base: base,
    build: {
      outDir: 'dist'
    }
  }
})
