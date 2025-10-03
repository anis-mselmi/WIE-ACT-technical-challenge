export default function ModalForm({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <button className="float-right text-red-500" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
}