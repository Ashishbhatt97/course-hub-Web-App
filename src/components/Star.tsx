import React from "react";

interface StarRatingProps {
  value: number;
}

const StarRating: React.FC<StarRatingProps> = ({ value }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-xl ${
            star <= value ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
