import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/student-hub/',   // 斜杠开头，斜杠结尾，仓库名一致
})