interface SectionSkeletonProps {
  heightClassName?: string;
}

export function SectionSkeleton({
  heightClassName = "h-64",
}: SectionSkeletonProps) {
  return (
    <div
      className={`w-full animate-pulse rounded-[3px] border border-slate-300/80 bg-slate-100/80 ${heightClassName}`}
    />
  );
}
