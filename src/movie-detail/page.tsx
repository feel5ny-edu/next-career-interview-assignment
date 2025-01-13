import { useParams } from 'react-router-dom';
import { useGetMovie } from '../api/get-movie';
import { useRef, useState } from 'react';
import { InputWithButton } from '../components/input-button';

const storageKey = 'movie-comment';

export const MovieDetail = () => {
  const { id } = useParams();
  if (!id) throw new Error('required parameter');

  const commentRef = useRef<HTMLInputElement>(
    JSON.parse(localStorage.getItem(storageKey) || '{}')[id] || null
  );
  const { data, isLoading } = useGetMovie({ id: Number(id) });
  const [showCommentInput, setShowCommentInput] = useState(
    Boolean(commentRef.current?.value)
  );

  const handleToggle = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleSubmitComment = () => {
    handleToggle();

    const prevData = JSON.parse(localStorage.getItem(storageKey) || '{}');
    const newData = { ...prevData, [id]: commentRef.current?.value };
    localStorage.setItem(storageKey, JSON.stringify(newData));
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
        <div data-testid="movie-comment-item">{commentRef.current?.value}</div>
        {!commentRef.current?.value && !showCommentInput && (
          <button data-testid="movie-comment-button" onClick={handleToggle}>
            한줄평 작성하기 +
          </button>
        )}
        {!commentRef.current?.value && showCommentInput && (
          <InputWithButton data-testid="movie-comment-form">
            <InputWithButton.Input
              ref={commentRef}
              dataTestId="movie-comment-input"
              placeholder="영화를 검색해주세요"
            />
            <InputWithButton.Button
              onClick={handleSubmitComment}
              dataTestId="movie-comment-submit-button"
            >
              제출
            </InputWithButton.Button>
          </InputWithButton>
        )}
      </div>
    </div>
  );
};
