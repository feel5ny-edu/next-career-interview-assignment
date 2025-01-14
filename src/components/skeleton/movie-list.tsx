export const MovieListSkeleton = () => {
  return (
    <section className="px-8 py-4 bg-slate-100 rounded-3xl">
      <div className="animate-pulse">
        <div className="h-12 bg-slate-200 rounded-full w-96 mb-4"></div>

        <div className="grid grid-cols-2 gap-4">
          <div className="h-[600px] bg-slate-200 rounded-[36px]"></div>
          <div className="h-[600px] bg-slate-200 rounded-[36px]"></div>
          <div className="h-[600px] bg-slate-200 rounded-[36px]"></div>
          <div className="h-[600px] bg-slate-200 rounded-[36px]"></div>
        </div>
      </div>
    </section>
  );
};
