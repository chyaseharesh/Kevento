import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/input";

interface TicketEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quantity: number, ticketId: string, price: number) => void;
  currentQuantity: number;
  currentTicketId: string;
  selectedPrice: number;
}

export const TicketEditModal: React.FC<TicketEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentQuantity,
  currentTicketId,
  selectedPrice,
}) => {
  const [quantity, setQuantity] = useState(currentQuantity);
  const [error, setError] = useState<string | null>(null);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value < 1) {
      setError("Quantity must be greater than 0.");
    } else {
      setError(null);
    }
    setQuantity(value);
  };

  const handleSave = () => {
    if (quantity < 1) {
      setError("Quantity must be greater than 0.");
      return;
    }
    onSave(quantity, currentTicketId, selectedPrice);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Edit Ticket Quantity</h2>
        {error && <p className="text-red-500">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="block">Quantity</label>
            <Input
              type="number"
              value={quantity}
              min={1}
              onChange={handleQuantityChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <div>
            <label className="block">Price: ${selectedPrice}</label>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            className="text-gray-500"
            onClick={onClose}
            aria-label="Close"
          >
            Cancel
          </button>
          <button
            className="text-purple-600"
            onClick={handleSave}
            disabled={quantity < 1}
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};
