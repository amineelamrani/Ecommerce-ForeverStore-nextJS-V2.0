import { Star, StarHalf } from "lucide-react";

interface fiveStarsProps {
  rating: number;
  size?: number;
}

export default function FiveStarsFeedback({
  rating,
  size = 15,
}: fiveStarsProps) {
  const rate = Math.floor(rating);
  return (
    <div className="app">
      <div className="relative">
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, index) => (
            <Star fill="#FBD8AE" size={size} strokeWidth={0} key={index} />
          ))}
        </div>
        <div className="flex gap-1 absolute top-0">
          {Array.from({ length: rate }, (_, index) => (
            <Star fill="#FF8900" size={size} strokeWidth={0} key={index} />
          ))}
          {rating !== rate && (
            <StarHalf fill="#FF8900" size={size} strokeWidth={0} key={445555} />
          )}
        </div>
      </div>
    </div>
  );
}
