import Link from "next/link";
import { Search, User, Calendar, Lock, Play, ChevronRight, Star } from "lucide-react";


export default function Home() {
  return (
    <div className="min-h-screen pb-24 font-sans-kr bg-[#F5F5F7] text-gray-900">
      <main className="max-w-md mx-auto min-h-screen px-5 pt-12 flex flex-col">
        {/* Header */}
        <header className="mb-8 space-y-1 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                Unconscious Analysis
              </p>
              <h1 className="font-serif-kr font-bold text-3xl text-gray-900 leading-tight">
                나의 무의식<br /><span className="text-gray-400">발견하기</span>
              </h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 border border-white shadow-sm flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 gap-4 auto-rows-[160px]">
          {/* Main Card (Large) */}
          <Link href="/test" className="col-span-2 row-span-2 relative bg-white rounded-[2rem] p-8 shadow-sm border border-white/50 overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-wider mb-4">
                  Secret of Mind
                </div>
                <h2 className="text-3xl font-black font-serif-kr text-gray-900 leading-none mb-2">
                  무의식<br />반응 검사
                </h2>
                <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-[180px]">
                  내면의 열정,<br />
                  <span className="text-gray-900 underline decoration-gray-300 hover:decoration-black transition-colors">그림자</span>를 확인해보세요.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-400">
                      ?
                    </div>
                  ))}
                </div>
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center group-hover:bg-gray-800 transition-colors shadow-lg">
                  <Play className="w-5 h-5 text-white fill-white ml-1" />
                </div>
              </div>
            </div>
          </Link>

          {/* Sub Card 1 (Small) */}
          <div className="relative bg-white rounded-[2rem] p-6 shadow-sm border border-white/50 flex flex-col justify-between overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-yellow-100/50 to-orange-50/50 rounded-full blur-2xl -mr-8 -mb-8"></div>

            <div className="relative z-10">
              <Lock className="w-5 h-5 text-gray-300 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">관계 심리</h3>
              <p className="text-[11px] text-gray-400 font-medium">나와 타인의 연결고리</p>
            </div>
          </div>

          {/* Sub Card 2 (Small) */}
          <div className="relative bg-white rounded-[2rem] p-6 shadow-sm border border-white/50 flex flex-col justify-between overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-green-100/50 to-emerald-50/50 rounded-full blur-2xl -mr-8 -mb-8"></div>

            <div className="relative z-10">
              <Lock className="w-5 h-5 text-gray-300 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">커리어</h3>
              <p className="text-[11px] text-gray-400 font-medium">무의식이 이끄는 직업</p>
            </div>
          </div>

          {/* Wide Bottom Card */}
          <Link href="/report" className="col-span-2 relative bg-[#1c1c1e] rounded-[2rem] p-6 shadow-lg overflow-hidden group">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Premium Report</h3>
                <p className="text-gray-400 text-xs">심층 분석 리포트 전체 보기</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
            </div>
          </Link>
        </div>

      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="absolute inset-0 glass border-t border-white/20"></div>
        <div className="relative max-w-md mx-auto flex justify-around items-center h-20 pb-4">
          <NavItem icon={<Calendar className="w-6 h-6" />} label="홈" active />
          <NavItem icon={<Search className="w-6 h-6" />} label="리포트" />
          <NavItem icon={<User className="w-6 h-6" />} label="프로필" />
        </div>
      </div>
    </div>
  );
}

function TimelineItem({
  number,
  status,
  title,
  subtitle,
  isDone,
  isHighlight,
  href,
}: {
  number: string;
  status: string;
  title: string;
  subtitle: string;
  isDone: boolean;
  isHighlight: boolean;
  href?: string;
}) {
  const content = (
    <div className={`relative p-7 rounded-[2rem] transition-all duration-500 border ${isHighlight ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-transparent scale-[1.02]' : 'bg-white/40 border-white/60 hover:bg-white/60'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-6">
          {/* Big Number */}
          <div className={`text-4xl font-black leading-none tracking-tight font-serif-kr ${isHighlight ? 'text-black' : 'text-gray-200'}`}>
            {number}
          </div>

          <div className="flex-1 pt-0.5">
            {/* Status Badge */}
            <div className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-2 ${isHighlight ? 'text-blue-600' : 'text-gray-400'}`}>
              {status === "LOCKED" ? (
                <span className="flex items-center gap-1.5"><Lock className="w-3 h-3" /> LOCKED</span>
              ) : (
                <span className="flex items-center gap-1.5"><Star className="w-3 h-3 fill-current" /> {status}</span>
              )}
            </div>

            {/* Title */}
            <h3 className={`text-lg font-bold mb-1.5 font-sans-kr ${isDone || isHighlight ? 'text-gray-900' : 'text-gray-400'}`}>
              {title}
            </h3>

            {/* Subtitle */}
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Arrow for active item */}
        {isHighlight && (
          <div className="mt-3 text-gray-900 animate-pulse">
            <ChevronRight className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block group">
        {content}
      </Link>
    );
  }

  return <div className="block cursor-not-allowed opacity-60 grayscale-[0.5]">{content}</div>;
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-300 ${active ? "text-black scale-105" : "text-gray-300 hover:text-gray-500"}`}>
      {icon}
      <span className="text-[10px] font-bold mt-1.5 tracking-tight font-sans-kr">{label}</span>
    </button>
  );
}
