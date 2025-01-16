// import { useState } from "react";

// interface TicketEditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (quantity: number, category: string) => void;
//   currentQuantity: number;
//   currentCategory: string;
// }

// export const TicketEditModal: React.FC<TicketEditModalProps> = ({ 
//   isOpen, 
//   onClose, 
//   onSave, 
//   currentQuantity, 
//   currentCategory 
// }) => {
//   const [quantity, setQuantity] = useState(currentQuantity);
//   const [category, setCategory] = useState(currentCategory);

//   const handleSave = () => {
//     onSave(quantity, category);
//     onClose();
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <div className="p-6">
//         <h2 className="text-2xl font-semibold mb-6">Edit Ticket Details</h2>
//         <div className="space-y-4">
//           <div>
//             <label className="block">Quantity</label>
//             <input
//               type="number"
//               value={quantity}
//               min={1}
//               onChange={(e) => setQuantity(parseInt(e.target.value))}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div>
//             <label className="block">Category</label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//             >
//               <option value="General">General</option>
//               <option value="VIP">VIP</option>
//               <option value="Student">Student</option>
//               {/* Add more categories as needed */}
//             </select>
//           </div>
//         </div>
//         <div className="mt-6 flex justify-end gap-4">
//           <button
//             className="text-gray-500"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="text-purple-600"
//             onClick={handleSave}
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// };
