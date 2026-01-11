import { type ReactNode } from "react";
import { Button } from "../Button";
import SpinnerLoading from "../SpinnerLoading";
import { X } from "lucide-react";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  children?: ReactNode;
  confirmText?: string;
  isLoading?: boolean;
  isForm?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText,
  isLoading,
  isForm = false,
}: IModal) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg m-4 sm:m-0">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          {title && (
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          )}

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            aria-label="Fechar modal"
          >
            <X />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="text-sm text-gray-700">{children}</div>

        {/* Footer */}
        {isForm ? null : (
          <div className="mt-6 flex justify-end gap-[1rem]">
            <Button textButton="text" onClick={onClose} className="w-max">
              Fechar
            </Button>
            <Button disabled={isLoading} onClick={onConfirm} className="w-max">
              {" "}
              {isLoading ? (
                <SpinnerLoading width="5" height="5" />
              ) : (
                confirmText
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
