import { TYPES, HOT_TAGS } from '../hooks/useOpportunities'

export default function FilterBar({
  typeFilter,
  onTypeChange,
  tagFilter,
  onTagChange,
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* 类型筛选 */}
      <div className="flex flex-wrap justify-center gap-2">
        {TYPES.map((type) => (
          <button
            key={type}
            onClick={() => onTypeChange(typeFilter === type ? '' : type)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200
              ${
                typeFilter === type
                  ? 'bg-indigo-500 text-white shadow-md scale-105'
                  : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-indigo-300 hover:text-indigo-500'
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 热门标签 */}
      <div className="flex flex-wrap justify-center gap-2">
        <span className="text-sm text-gray-400 mr-1 self-center">热门标签：</span>
        {HOT_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagChange(tagFilter === tag ? '' : tag)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200
              ${
                tagFilter === tag
                  ? 'bg-pink-400 text-white shadow-md scale-105'
                  : 'bg-pink-50 text-pink-500 border border-pink-200 hover:bg-pink-100'
              }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
