export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="搜索机会标题或摘要..."
        className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200
                   focus:border-indigo-400 focus:outline-none transition-colors
                   text-gray-700 placeholder-gray-400 text-base shadow-sm"
      />
    </div>
  )
}
