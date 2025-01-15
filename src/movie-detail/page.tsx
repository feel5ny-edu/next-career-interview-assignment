import { useParams } from 'react-router-dom';
import { useGetMovie } from '../api/get-movie';
import { CommentSection } from './components/comment-section';
import { SkeletonImageLoader } from '../components/skeleton/image';
import { getImageUrl } from '../api/image-url';

export const MovieDetail = () => {
  const { id } = useParams();
  if (!id) throw new Error('required parameter');

  const { data, isLoading } = useGetMovie({ id: Number(id) });

  if (isLoading) return <>Loading..</>;
  if (!data) return null;

  return (
    <div className="text-center">
      <h1 data-testid="movie-title" className="text-4xl p-8">
        {data.title}
      </h1>
      <SkeletonImageLoader
        src={getImageUrl(data.poster_path)}
        className="rounded-lg"
        skeletonHeight="700px"
        alt={data.title}
      />
      <div data-testid="movie-vote" className="text-xl py-4">
        평점 {data.vote_average}
      </div>
      <div data-testid="movie-comment">
        <CommentSection />
      </div>
    </div>
  );
};
