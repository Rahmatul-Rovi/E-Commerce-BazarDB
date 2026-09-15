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
         <div className="border-l border-gray-200 pl-4">
          <p className="text-sm text-gray-600">
            Based on {count} review{count !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Write a review */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6">
        <p className="text-sm font-semibold text-gray-800 mb-2">Write a Review</p>
        <StarRating rating={myRating} size={22} interactive onChange={setMyRating} />
        <textarea
          value={myComment}
          onChange={(e) => setMyComment(e.target.value)}
          placeholder="Share your experience with this product (optional)"
          rows={3}
          className="w-full mt-3 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
        />

        <button
          onClick={handleSubmitReview}
          disabled={submitting}
          className="mt-3 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>

      {/* Reviews list */}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500 text-sm">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                {review.user.image ? (
                  <img
                    src={review.user.image}
                    alt={review.user.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary text-white text-sm font-semibold flex items-center justify-center">
                    {review.user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                  <div>
                  <p className="text-sm font-medium text-gray-800">{review.user.name}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
  )
}