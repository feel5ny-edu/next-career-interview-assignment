import { useParams } from 'react-router-dom';
import { useGetMovie } from '../api/get-movie';
import { useState } from 'react';

export const MovieDetail = () => {
  const { id } = useParams();
  // TODO
  const COMMENT = '';
  const { data, isLoading } = useGetMovie({ id: Number(id) });
  const [showCommentInput, setShowCommentInput] = useState(Boolean(COMMENT));

  const handleToggle = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleSubmitComment = () => {
    handleToggle();
  };

  if (isLoading) return <>Loading..</>;
  if (!data) return null;

  return (
    <div className="text-center">
      <h1 data-testid="movie-title" className="text-4xl p-8">
        {data.title}
      </h1>
      <img
        data-testid="movie-poster"
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        className="rounded-lg"
      />
      <div data-testid="movie-vote" className="text-xl py-4">
        평점 {data.vote_average}
      </div>
      <div data-testid="movie-comment">
        {COMMENT}
        {!COMMENT && !showCommentInput && (
          <button data-testid="movie-comment-button" onClick={handleToggle}>
            한줄평 작성하기 +
          </button>
        )}
        {!COMMENT && showCommentInput && (
          <div className="flex" data-testid="movie-comment-form">
            <input data-testid="movie-comment-input" />
            <button
              data-testid="movie-comment-submit-button"
              onClick={handleSubmitComment}
            >
              제출
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
