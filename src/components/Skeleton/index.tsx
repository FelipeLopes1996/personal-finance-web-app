type SkeletonProps = {
  className?: string;
};
export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded-[4px] bg-gray-100 ${className}`} />
  );
}
