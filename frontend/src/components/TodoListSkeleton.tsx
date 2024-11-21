import { Skeleton } from "./ui/skeleton";

const items = Array.from({ length: 5 });
export default function TodoListSkeleton() {
  return (
    <section className="space-y-5">
      {items.map((_, i) => (
        <article className="p-3 flex gap-10" key={i}>
          {/* Text */}
          <div className="space-y-2 flex-1">
            <Skeleton className="w-[90%] h-5 bg-secondary/10 rounded-full" />
            <Skeleton className="w-[70%] h-5 bg-secondary/10 rounded-full" />
          </div>
          {/* Buttons */}
          <div className="flex gap-2">
            <Skeleton className="w-[6rem] h-[2rem] bg-secondary/10 rounded-md" />
            <Skeleton className="w-[6rem] h-[2rem] bg-secondary/10 rounded-md" />
          </div>
        </article>
      ))}
    </section>
  );
}
