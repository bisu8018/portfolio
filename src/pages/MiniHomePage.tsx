export default function MiniHomePage() {
  return (
    <div className="relative w-[900px] h-[600px] rounded-2xl shadow-2xl flex overflow-hidden bg-[rgba(255,255,255,0.25)] [backdrop-filter:blur(16px)_saturate(180%)] [box-shadow:0_8px_32px_0_rgba(31,38,135,0.18)]">
      {/* 왼쪽: 프로필/메뉴 */}
      <div className="w-1/3 p-8 flex flex-col items-center bg-[rgba(255,255,255,0.18)] [backdrop-filter:blur(16px)_saturate(180%)]">
        <div className="w-24 h-24 rounded-full bg-pink-200 mb-4 flex items-center justify-center text-4xl font-bold border-4 border-white shadow-lg">
          <span role="img" aria-label="profile">
            😊
          </span>
        </div>
        <div className="text-lg font-bold mb-2">싸이좋은 사람들</div>
        <div className="text-xs text-gray-500 mb-6">
          TODAY IS... <span className="font-semibold text-blue-700">즐거움</span>
        </div>
        <div className="text-sm text-gray-700 mb-2">사이좋은 사람을 싸이월드~^_^</div>
        <div className="mt-auto text-xs text-gray-400">★나의 1촌</div>
      </div>
      {/* 오른쪽: 수첩/미니룸 */}
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
    </div>
  )
}
