// import { createContext, useContext, useState, ReactNode } from 'react';

// interface CartItem {
//   id: number;
//   title: string;
//   price: number;
//   image: string;
//   quantity: number;
// }

// interface CartContextType {
//   items: CartItem[];
//   addToCart: (product: any) => void;
//   removeFromCart: (productId: number) => void;
//   updateQuantity: (productId: number, quantity: number) => void;
//   clearCart: () => void;
//   totalItems: number;
//   totalPrice: number;
// }

// const CartContext = createContext<CartContextType | null>(null);

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [items, setItems] = useState<CartItem[]>([]);

//   const addToCart = (product: any) => {
//     setItems(currentItems => {
//       const existingItem = currentItems.find(item => item.id === product.id);
//       if (existingItem) {
//         return currentItems.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...currentItems, { ...product, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (productId: number) => {
//     setItems(currentItems => currentItems.filter(item => item.id !== productId));
//   };

//   const updateQuantity = (productId: number, quantity: number) => {
//     setItems(currentItems =>
//       currentItems.map(item =>
//         item.id === productId
//           ? { ...item, quantity: Math.max(0, quantity) }
//           : item
//       ).filter(item => item.quantity > 0)
//     );
//   };

//   const clearCart = () => {
//     setItems([]);
//   };

//   const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
//   const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <CartContext.Provider value={{
//       items,
//       addToCart,
//       removeFromCart,
//       updateQuantity,
//       clearCart,
//       totalItems,
//       totalPrice
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// }