interface SimpleLoaderProps {
  loaderText?: string;
}

const SimpleLoader = ({ loaderText }: SimpleLoaderProps) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
      <p className="text-xs font-extralight">{loaderText}</p>
    </div>
  );
};

export default SimpleLoader;
