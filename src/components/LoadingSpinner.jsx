export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin"></div>
      </div>
      <p className="text-gray-400 text-base font-medium">正在加载机会信息...</p>
    </div>
  )
}
