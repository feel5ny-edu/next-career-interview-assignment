/**
 * @link https://developer.themoviedb.org/docs/image-basics
 */
export const getImageUrl = (imageName: string) => {
  return import.meta.env.VITE_IMAGE_HOST + '/t/p/w500' + imageName;
};
