export default function MiniHomePage() {
  return (
    <div className="flex-1 flex flex-col p-8">
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold text-blue-700">Updated news</div>
          <div className="text-xs text-gray-400">TODAY STORY</div>
        </div>
        <ul className="text-sm text-gray-700 mb-6 list-disc list-inside">
          <li>하나 더 질문!</li>
          <li>피부과에서 푼 처방전</li>
          <li>블러왔어요!</li>
          <li>몸맛이 점심훨샤 -_-</li>
        </ul>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-[320px] h-[220px] bg-blue-50 border-2 border-blue-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-400">Mini Room (미니룸)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
