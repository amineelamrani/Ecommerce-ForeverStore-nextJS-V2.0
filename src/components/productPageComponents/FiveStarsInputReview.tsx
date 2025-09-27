import { Star } from "lucide-react";

interface inputProps {
  size?: number;
  setReviewItem: (reviewItem: { content: string; rating: number }) => void;
  reviewItem: {
    content: string;
    rating: number;
  };
}

export default function FiveStarsInputReview({
  size = 25,
  setReviewItem,
  reviewItem,
}: inputProps) {
  const rate = reviewItem.rating;
  return (
    <div className="app flex items-center gap-2">
      <div className="relative">
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              fill="#FBD8AE"
              size={size}
              strokeWidth={0}
              id={`empty ${index}`}
              key={`empty-${index}`}
              className="hover:cursor-pointer"
              onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                if (!isNaN(Number(e.currentTarget.id.split(" ")[1]))) {
                  setReviewItem({
                    ...reviewItem,
                    ["rating"]: Number(e.currentTarget.id.split(" ")[1]) + 1,
                  });
                }
              }}
            />
          ))}
        </div>

        <div className="flex gap-1 absolute top-0">
          {Array.from({ length: rate }, (_, index) => (
            <Star
              fill="#FF8900"
              size={size}
              id={`full ${index}`}
              strokeWidth={0}
              key={index}
              className="hover:cursor-pointer"
              onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                if (!isNaN(Number(e.currentTarget.id.split(" ")[1]))) {
                  setReviewItem({
                    ...reviewItem,
                    ["rating"]: Number(e.currentTarget.id.split(" ")[1]) + 1,
                  });
                }
              }}
            />
          ))}
        </div>
      </div>
      <p>{rate} stars</p>
    </div>
  );
}
