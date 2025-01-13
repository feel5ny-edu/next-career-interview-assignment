import { useRef, useState } from 'react';
import { useLocalStorage } from '../../hooks/use-localstorage';
const storageKey = 'movie-comment';

export const useComment = ({ id }: { id: string }) => {
  const { getValue, setValue } = useLocalStorage<{ [index: string]: string }>(
    storageKey,
    {}
  );
  const commentInputRef = useRef<HTMLInputElement>(null);

  const [comment, setComment] = useState(() => getValue()[id]);

  const handleSubmitComment = () => {
    const newComment = commentInputRef.current?.value || '';
    setComment(newComment);

    setValue({ ...getValue(), [id]: newComment });
  };
  return {
    comment,
    commentInputRef,
    onSubmit: handleSubmitComment,
  };
};
