import { useState } from 'react';
import { InputWithButton } from '../../components/input-button';
import { useComment } from '../hooks/use-comment';
import { useParams } from 'react-router-dom';

export const CommentSection = () => {
  const { id } = useParams();
  if (!id) throw new Error('required parameter');

  const { comment, onSubmit, commentInputRef } = useComment({ id });
  const [showCommentInput, setShowCommentInput] = useState(Boolean(comment));

  const handleToggle = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleSubmitComment = () => {
    handleToggle();
    onSubmit();
  };
  if (comment) return <div data-testid="movie-comment-item">{comment}</div>;

  if (!showCommentInput)
    return (
      <button
        data-testid="movie-comment-button"
        className="min-w-52 p-4 rounded-lg hover:bg-blue-100"
        onClick={handleToggle}
      >
        한줄평 작성하기 +
      </button>
    );

  return (
    <InputWithButton data-testid="movie-comment-form">
      <InputWithButton.Input
        ref={commentInputRef}
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
  );
};
