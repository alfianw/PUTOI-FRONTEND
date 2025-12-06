interface DeleteConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void; // bisa disesuaikan dengan data yang akan dihapus
    title: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ open, onClose, onConfirm, title }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white p-6 rounded shadow-md text-center">
                <p className="mb-4 text-gray-800">{title}</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="px-4 py-2 rounded red-custom"
                        onClick={onConfirm}
                    >
                        Ya
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                        onClick={onClose}
                    >
                        Tidak
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
