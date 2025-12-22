// import { ReactNode } from 'react';
// import { Button } from '@/components/ui/button';

// interface ModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     title?: string;
//     children: ReactNode;
// }

// export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
//                 {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

//                 <Button
//                     className="absolute top-2 right-2 text-gray-500"
//                     onClick={onClose}
//                 >
//                     ✕
//                 </Button>

//                 <div>{children}</div>
//             </div>
//         </div>
//     );
// }
