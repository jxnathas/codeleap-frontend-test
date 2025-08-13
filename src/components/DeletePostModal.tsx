import React from 'react';
import Modal from './Modal';

interface DeletePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-header">
        <h2>Are you sure you want to delete this item?</h2>
      </div>
      <div className="modal-footer">
        <button onClick={onClose} className="cancel-btn">
          Cancel
        </button>
        <button onClick={onConfirm} className="delete-confirm-btn">
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeletePostModal;