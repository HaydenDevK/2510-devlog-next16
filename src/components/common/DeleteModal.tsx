import { X } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded hover:bg-gray-800 transition-colors"
        >
          <X size={18} className="text-gray-400" />
        </button>

        <div className="space-y-4">
          <h2 className="text-xl font-light">{title}</h2>
          <p className="text-gray-400 text-sm leading-relaxed">{message}</p>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-colors text-sm"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
