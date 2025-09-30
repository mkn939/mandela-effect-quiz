import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 根據環境決定 base 路徑
  // 優先級：VITE_BASE_PATH 環境變數 > GitHub Actions 自動檢測 > 預設子路徑
  let base = '/'

  // 在構建時使用 process.env，在開發時使用 import.meta.env
  const isProduction = mode === 'production'
  const envVars = isProduction ? process.env : {}

  if (envVars.VITE_BASE_PATH) {
    base = envVars.VITE_BASE_PATH
  } else if (envVars.GITHUB_ACTIONS && !envVars.VITE_BASE_PATH) {
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
