import React, { useState } from 'react';
import Modal from './Modal';

interface EditPostModalProps {
  isOpen: boolean;
  post: { id: number; title: string; text: string } | null;
  onClose: () => void;
  onSave: (id: number, title: string, text: string) => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ isOpen, post, onClose, onSave }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [text, setText] = useState(post?.text || '');

  React.useEffect(() => {
    if (post) {
      setTitle(post.title);
      setText(post.text);
    }
  }, [post]);

  const handleSave = () => {
    if (post && title.trim() && text.trim()) {
      onSave(post.id, title.trim(), text.trim());
      onClose();
    }
  };

  const isButtonDisabled = !title.trim() || !text.trim();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-header">
        <h2>Edit item</h2>
      </div>
      <div className="modal-body">
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="edit-title">Title</label>
            <input
              type="text"
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Hello world"
            />
          </div>
          <div>
            <label htmlFor="edit-content">Content</label>
            <textarea
              id="edit-content"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Content here"
            />
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button onClick={onClose} className="cancel-btn">
          Cancel
        </button>
        <button 
          onClick={handleSave} 
          disabled={isButtonDisabled}
          className="save-btn"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default EditPostModal;