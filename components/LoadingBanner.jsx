const LoadingBanner = () => {
  return (
    <div className="flex items-center justify-center gap-6 text-gray-500">
      <strong>Loading images...</strong>
      <div
        className="ml-auto inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
};
export default LoadingBanner;
