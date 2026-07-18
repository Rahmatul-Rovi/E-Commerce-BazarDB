"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";

export default function AddToCartBox({stock}: {stock: number}){
    const [qty, setQty] = useState(1);

    const decrease = () => setQty((q)=> Math.max(1 , q-1));
    const increase = () => setQty((q)=> Math.min(stock , q+1 ));

    if(stock === 0 ){
    return (
      <button
        disabled
        className="w-full bg-gray-200 text-gray-500 font-semibold py-3.5 rounded-full cursor-not-allowed"
      >
        Out of Stock
      </button>
    );
  }
  
 return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
        <button
          onClick={decrease}
          className="w-10 h-11 flex items-center justify-center text-gray-600 hover:bg-surface"
        >
          <Minus size={16} />
        </button>
        <span className="w-10 text-center font-semibold text-gray-900">{qty}</span>
        <button
          onClick={increase}
          className="w-10 h-11 flex items-center justify-center text-gray-600 hover:bg-surface"
        >
          <Plus size={16} />
        </button>
      </div>

      <button className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-full flex items-center justify-center gap-2 transition-colors">
        <ShoppingCart size={18} />
        Add to Cart
      </button>
    </div>
  );
}


