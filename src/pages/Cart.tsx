import { useState } from 'react';
import { Minus, Plus, Trash2, Package } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setOrderStatus('processing');
    
    // Simulate order processing stages
    setTimeout(() => {
      setOrderStatus('confirmed');
      setTimeout(() => {
        setOrderStatus('preparing');
        setTimeout(() => {
          setOrderStatus('shipped');
          clearCart();
          toast.success('Order placed successfully!');
          setIsCheckingOut(false);
          setOrderStatus('');
        }, 1000);
      }, 1000);
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to your cart to get started.</p>
        <a 
          href="/products" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition-all transform hover:scale-105"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="p-6 flex items-center transform transition-all hover:bg-gray-50"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain rounded-lg"
              />
              <div className="ml-6 flex-1">
                <h3 className="text-lg font-medium text-gray-900 hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 text-lg font-medium text-emerald-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="ml-6 flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Minus className="h-4 w-4 text-gray-600" />
                </button>
                <span className="mx-3 text-gray-600 min-w-[2rem] text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Plus className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-6 p-2 rounded-full hover:bg-red-100 transition-colors group"
                >
                  <Trash2 className="h-5 w-5 text-red-500 group-hover:text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50">
          <div className="flex justify-between text-xl font-medium text-gray-900 mb-4">
            <span>Total</span>
            <span className="text-emerald-600">${totalPrice.toFixed(2)}</span>
          </div>

          {orderStatus && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ 
                        width: 
                          orderStatus === 'processing' ? '25%' :
                          orderStatus === 'confirmed' ? '50%' :
                          orderStatus === 'preparing' ? '75%' :
                          orderStatus === 'shipped' ? '100%' : '0%'
                      }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 capitalize">
                {orderStatus === 'processing' ? 'Processing your order...' :
                 orderStatus === 'confirmed' ? 'Order confirmed!' :
                 orderStatus === 'preparing' ? 'Preparing your order...' :
                 'Order shipped!'}
              </p>
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
          >
            {isCheckingOut ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Package className="h-5 w-5" />
                <span>Checkout</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}