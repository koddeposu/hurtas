interface SectionSkeletonProps {
  heightClassName?: string;
}

export function SectionSkeleton({
  heightClassName = "h-64",
}: SectionSkeletonProps) {
  return (
    <div
      className={`w-full animate-pulse rounded-[2rem] border border-slate-200/70 bg-slate-100/80 ${heightClassName}`}
    />
  );
}
