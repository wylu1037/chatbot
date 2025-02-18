export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* 左侧装饰面板 */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 lg:flex">
        {/* 渐变背景网格 */}
        <div className="bg-grid-white/[0.05] bg-grid absolute inset-0 h-full w-full" />

        {/* 动态光效装饰 - 增加更多光斑和动画效果 */}
        <div className="absolute -left-4 top-0 h-96 w-96 animate-blob rounded-full bg-purple-500/30 opacity-20 mix-blend-multiply blur-3xl filter" />
        <div className="animation-delay-2000 absolute -bottom-8 left-20 h-96 w-96 animate-blob rounded-full bg-blue-500/30 opacity-20 mix-blend-multiply blur-3xl filter" />
        <div className="animation-delay-4000 absolute -right-4 top-1/2 h-96 w-96 animate-blob rounded-full bg-teal-500/30 opacity-20 mix-blend-multiply blur-3xl filter" />

        {/* 额外的小光斑 */}
        <div className="absolute right-1/4 top-1/4 h-24 w-24 animate-pulse rounded-full bg-yellow-500/20 blur-xl" />
        <div className="animation-delay-2000 absolute bottom-1/4 right-1/3 h-16 w-16 animate-pulse rounded-full bg-rose-500/20 blur-xl" />

        {/* 动态线条背景 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 animate-[move_8s_linear_infinite] bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] bg-[length:8px_100%]" />
          <div className="animation-delay-2000 absolute inset-0 animate-[move_12s_linear_infinite] bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] bg-[length:12px_100%]" />
        </div>

        <div className="absolute flex h-full w-full items-center justify-center">
          <div className="relative flex flex-col items-center space-y-8 text-white">
            {/* 标题添加悬浮动画 */}
            <div className="animate-float bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-500 bg-clip-text text-7xl font-bold text-transparent">
              Magic ✨
            </div>
            <p className="max-w-sm text-center text-neutral-400 [text-wrap:balance]">
              Built with cutting-edge technology for the ultimate user
              experience
            </p>
            {/* 装饰性指示器 - 改进动画效果 */}
            <div className="mt-8 flex gap-4">
              <div className="h-2 w-2 animate-glow rounded-full bg-blue-500" />
              <div className="animation-delay-200 h-2 w-2 animate-glow rounded-full bg-green-500" />
              <div className="animation-delay-500 h-2 w-2 animate-glow rounded-full bg-red-500" />
            </div>
          </div>
        </div>

        {/* 底部渐变光效 */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-900/90 via-zinc-900/50 to-transparent" />
      </div>

      {/* 右侧内容区 */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">{children}</div>
      </div>
    </div>
  );
}
