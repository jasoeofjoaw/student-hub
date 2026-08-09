import { useMemo } from 'react'

const TYPE_COLORS = {
  '竞赛': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-l-orange-400' },
  '活动': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-l-green-400' },
  '实习': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-l-blue-400' },
  '科研': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-l-purple-400' },
  '其他': { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-l-gray-300' },
}

function getDaysUntil(deadline) {
  if (!deadline) return Infinity
  const now = new Date()
  const target = new Date(deadline)
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24))
}

export default function OpportunityCard({ item }) {
  const daysLeft = useMemo(() => getDaysUntil(item.deadline), [item.deadline])
  const isUrgent = daysLeft <= 3 && daysLeft >= 0
  const isExpired = daysLeft < 0

  const tags = useMemo(() => {
    if (!item.tags) return []
    return item.tags.split(',').map((t) => t.trim()).filter(Boolean)
  }, [item.tags])

  const colors = TYPE_COLORS[item.type] || TYPE_COLORS['其他']

  const deadlineText = useMemo(() => {
    if (!item.deadline) return '暂无截止日期'
    const d = new Date(item.deadline)
    const dateStr = d.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    if (isExpired) return `${dateStr}（已截止）`
    if (isUrgent) return `${dateStr}（仅剩 ${daysLeft} 天！）`
    return `${dateStr}（剩余 ${daysLeft} 天）`
  }, [item.deadline, isUrgent, isExpired, daysLeft])

  return (
    <div
      className={`bg-white rounded-2xl shadow-md border-l-4 ${colors.border} p-5
                  hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                  flex flex-col gap-3`}
    >
      {/* 标题行 */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-bold text-gray-800 leading-snug flex-1">
          {item.title || '未命名机会'}
        </h3>
        <span
          className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}
        >
          {item.type || '其他'}
        </span>
      </div>

      {/* 标签 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 截止日期 */}
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-gray-400">📅</span>
        <span
          className={`font-semibold ${
            isUrgent ? 'text-red-500 animate-pulse' : isExpired ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {deadlineText}
        </span>
      </div>

      {/* 摘要 */}
      {item.summary && (
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {item.summary}
        </p>
      )}

      {/* 来源 + 按钮 */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-400 truncate max-w-[60%]">
          {item.source ? `来源：${item.source}` : ''}
        </span>
        <button
          onClick={() => item.link && window.open(item.link, '_blank')}
          disabled={!item.link}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
            ${
              item.link
                ? 'bg-indigo-500 text-white hover:bg-indigo-600 active:scale-95'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          {item.link ? '查看详情 →' : '暂无链接'}
        </button>
      </div>
    </div>
  )
}
