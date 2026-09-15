"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Review = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: { name: string; image: string | null };
};

function StarRating({
  rating,
  size = 16,
  interactive = false,
  onChange,
}: {
  rating: number;
  size?: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
}) {

     return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          className={interactive ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            size={size}
            className={star <= rating ? "fill-accent text-accent" : "text-gray-300"}
          />
        </button>
      ))}
    </div>
  );
}

export default function ProductReviews({ productId }: { productId: string }) {
    const { data:session } = useSession();
    const [reviews, setReviews] = useState<Review[]>([]);
     const [avgRating, setAvgRating] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [myRating, setMyRating] = useState(0);
  const [myComment, setMyComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadReviews = () => {
    fetch(`/api/reviews?productId=${productId}`)
    .then((res)=> res.json())
    .then((data)=> {
      setReviews(data.reviews || []);
      setAvgRating(data.avgRating || 0);
      setCount(data.count || 0);
      setLoading(false);
    });
  };

  useEffect(()=> {
    loadReviews();
  } , [productId]);

  const handleSubmitReview = async () => {
    if (!session?.user) {
      Swal.fire({
        icon: "info",
        title: "Please Log In",
        text: "You need to be logged in to write a review.",
        customClass: { popup: "rounded-2xl" },
      });
      return;
    }

    if (myRating === 0) {
      Swal.fire({
        icon: "warning",
        title: "Select a rating",
        text: "Please select at least 1 star.",
        customClass: { popup: "rounded-2xl" },
      });
      return;
    }

    setSubmitting(true);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, rating: myRating, comment: myComment }),
    });

    setSubmitting(false);

    if (res.ok) {
      setMyRating(0);
      setMyComment("");
      loadReviews();
      Swal.fire({
        icon: "success",
        title: "Review Submitted",
        showConfirmButton: false,
        timer: 1300,
        customClass: { popup: "rounded-2xl" },
      });
    } else {
      const data = await res.json();
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: data.error || "Something went wrong",
        customClass: { popup: "rounded-2xl" },
      });
    }
  };

  return(
     <section className="mt-16 max-w-3xl">
      <h2 className="font-heading text-xl md:text-2xl font-semibold text-gray-900 mb-4">
        Reviews & Ratings
      </h2>

      {/* Summary */}
      <div className="flex items-center gap-4 bg-surface rounded-2xl p-5 mb-6">
        <div className="text-center">
          <p className="text-3xl font-heading font-bold text-gray-900">
            {avgRating.toFixed(1)}
          </p>
          <StarRating rating={Math.round(avgRating)} size={14} />
        </div>
  )
}