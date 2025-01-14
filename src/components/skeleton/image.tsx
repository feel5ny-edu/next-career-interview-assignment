import { useState } from 'react';

type ImageLoaderProps = {
  src: string;
  alt: string;
  skeletonHeight?: string;
  skeletonWidth?: string;
  className?: string;
  fallbackSrc?: string;
};

export const SkeletonImageLoader = ({
  src,
  alt,
  skeletonHeight = '400px',
  skeletonWidth = '100%',
  className,
  fallbackSrc = 'https://dummyimage.com/300x200/cccccc/000000&text=image+load+error',
}: ImageLoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
  };

  const currentSrc = hasError ? fallbackSrc : src;

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
        src={currentSrc}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
};
