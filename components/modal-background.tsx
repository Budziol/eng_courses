import { CircleX } from "lucide-react";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

const ModalBackground = ({ children, onClose }: Props) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onMouseDown={handleOverlayClick}
      className="fixed inset-0 w-full h-full bg-black/30 flex items-center justify-center p-8 z-50"
    >
      <div
        className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-1 absolute top-0 right-0">
          <button
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-main/10 hover:text-main cursor-pointer w-10 h-10"
            onClick={() => onClose()}
          >
            <CircleX size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
export default ModalBackground;
