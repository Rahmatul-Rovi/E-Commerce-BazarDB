"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <CheckCircle size={64} className="text-primary mb-4" />
      <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900">
        Order Placed Successfully!
      </h1>
      <p className="text-gray-500 mt-2 max-w-sm">
        Thank you for your order. We&apos;ll deliver it to you soon.
      </p>
      {orderId && (
        <p className="text-sm text-gray-400 mt-2">
          Order ID: <span className="font-mono">{orderId}</span>
        </p>
      )}

      <div className="flex gap-3 mt-6">
        <Link
          href="/"
          className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={null}>
      <OrderSuccessContent />
    </Suspense>
  );
}