import Header from './components/Header'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import CardGrid from './components/CardGrid'
import LoadingSpinner from './components/LoadingSpinner'
import EmptyState from './components/EmptyState'
import { useOpportunities } from './hooks/useOpportunities'
import './App.css'

function App() {
  const {
    opportunities,
    loading,
    error,
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    tagFilter,
    setTagFilter,
  } = useOpportunities()

  const hasFilters = !!(search.trim() || typeFilter || tagFilter)

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-pink-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 搜索与筛选区域 */}
        <section className="sticky top-0 z-10 bg-gradient-to-b from-indigo-50/95 via-white/95 to-white/95 backdrop-blur-sm pb-6 rounded-b-3xl shadow-sm mb-8 pt-4 space-y-5">
          <SearchBar value={search} onChange={setSearch} />
          <FilterBar
            typeFilter={typeFilter}
            onTypeChange={setTypeFilter}
            tagFilter={tagFilter}
            onTagChange={setTagFilter}
          />
        </section>

        {/* 内容区域 */}
        <section>
          {loading && <LoadingSpinner />}

          {!loading && error && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">😵</div>
              <h3 className="text-xl font-bold text-red-400 mb-2">加载失败</h3>
              <p className="text-gray-400 text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && opportunities.length === 0 && (
            <EmptyState hasFilters={hasFilters} />
          )}

          {!loading && !error && opportunities.length > 0 && (
            <>
              <p className="text-sm text-gray-400 mb-4 text-center">
                共找到 <span className="font-bold text-indigo-500">{opportunities.length}</span> 个机会
                {hasFilters && (
                  <button
                    onClick={() => {
                      setSearch('')
                      setTypeFilter('')
                      setTagFilter('')
                    }}
                    className="ml-2 text-indigo-500 underline hover:text-indigo-600"
                  >
                    清除筛选
                  </button>
                )}
              </p>
              <CardGrid opportunities={opportunities} />
            </>
          )}
        </section>
      </main>

      {/* 底部 */}
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-100">
        Student Hub — 助力每一位大学生的成长 ✨
      </footer>
    </div>
  )
}

export default App
