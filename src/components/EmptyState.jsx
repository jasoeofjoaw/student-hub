export default function EmptyState({ hasFilters }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center px-4">
      <div className="text-6xl">📭</div>
      <h3 className="text-xl font-bold text-gray-700">
        {hasFilters ? '没有匹配的机会' : '暂无机会信息'}
      </h3>
      <p className="text-gray-400 text-sm max-w-md">
        {hasFilters
          ? '试试调整搜索条件或清除筛选器，也许能找到更多机会~'
          : '当前数据库中没有机会数据，请检查 Supabase 连接或添加数据。'}
      </p>
    </div>
  )
}
