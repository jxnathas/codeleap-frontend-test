import React, { useState } from 'react';

interface PostFormProps {
  onSubmit: (title: string, text: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && text.trim()) {
      onSubmit(title, text);
      setTitle('');
      setText('');
    }
  };

  const isButtonDisabled = !title.trim() || !text.trim();

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Hello world"
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Content here"
        />
      </div>
      <div className="button-container">
        <button type="submit" disabled={isButtonDisabled}>
          CREATE
        </button>
      </div>
    </form>
  );
};

export default PostForm;