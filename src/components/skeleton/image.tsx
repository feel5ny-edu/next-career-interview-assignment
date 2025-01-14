import { useState } from 'react';

type ImageLoaderProps = {
  src: string;
  alt: string;
  skeletonHeight?: string;
  skeletonWidth?: string;
  className?: string;
};

export const SkeletonImageLoader = ({
  src,
  alt,
  skeletonHeight = '400px',
  skeletonWidth = '100%',
  className,
}: ImageLoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={`${className} relative overflow-hidden`}
      style={{ height: skeletonHeight, width: skeletonWidth }}
    >
      {/* Skeleton Loader */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200"></div>
      )}

      {/* Main image */}
      <img
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        data-testid="movie-poster"
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
      />
    </div>
  );
};
