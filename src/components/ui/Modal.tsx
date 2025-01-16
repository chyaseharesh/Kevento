// components/ui/modal.tsx
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-1/2">
        <button
          className="absolute top-2 right-2 text-white font-extrabold bg-primary p-1 rounded-full w-10 h-10 hover:bg-primary-hover"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};
