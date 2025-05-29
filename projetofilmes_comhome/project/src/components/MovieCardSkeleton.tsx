const MovieCardSkeleton = () => {
  return (
    <div className="bg-card rounded-lg overflow-hidden h-full flex flex-col">
      <div className="w-full h-64 shimmer"></div>
      <div className="p-4 flex-grow">
        <div className="h-6 w-3/4 mb-2 shimmer rounded"></div>
        <div className="h-4 w-1/3 shimmer rounded"></div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;