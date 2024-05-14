import React, { useState } from "react";

type Review = {
  name: string;
  desc: string;
  review: number;
};

const GameReview = ({
  name,
  desc,
  review,
  onClick,
  onDelete,
}: {
  name: string;
  desc: string;
  review: number;
  onClick: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="m-10">
      <div className="border w-80 h-40 flex-col p-5 text-center bg-slate-500 text-white">
        <h2 className="font-bold">{name}</h2>
        <div className="">
          <div>Description: {desc}</div>
          <div>Score: {review}</div>
        </div>
        <button className="text-white hover:text-red-500" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<Review>({
    name: "",
    desc: "",
    review: 0,
  });
  const [showReview, setShowReview] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setNewReview({ name: "", desc: "", review: 0 });
    setShowReview(false);
  };

  const handleReviewClick = (review: Review) => {
    if (selectedReview && selectedReview.name === review.name) {
      setSelectedReview(null);
    } else {
      setSelectedReview(review);
      setShowReview(false);
    }
  };

  const handleDelete = (reviewToDelete: Review) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review !== reviewToDelete)
    );
  };

  return (
    <div className="flex justify-center">
      <div className="flex">
        <div className="flex flex-col">
          {reviews.map((review, index) => (
            <GameReview
              key={index}
              name={review.name}
              desc={review.desc}
              review={review.review}
              onClick={() => handleReviewClick(review)}
              onDelete={() => handleDelete(review)}
            />
          ))}
        </div>
        <div className="ml-10">
          {showReview && (
            <div className="border mt-10 bg-slate-500 text-white w-80 h-40">
              <div className="m-5">
                <div className="flex justify-between">
                  Name:
                  <input
                    className="border  text-black"
                    type="text"
                    name="name"
                    value={newReview.name}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="flex justify-between">
                  Desc:{" "}
                  <input
                    className="border text-black"
                    type="text"
                    name="desc"
                    value={newReview.desc}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="flex justify-between">
                  Score:{" "}
                  <input
                    className="border  text-black"
                    type="number"
                    name="review"
                    value={newReview.review.toString()}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="flex justify-evenly mt-4">
                  <button
                    className="border p-1 hover:bg-slate-600"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="border p-1 hover:bg-slate-600"
                    onClick={() => setShowReview(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          {selectedReview && (
            <div className="border bg-slate-500 text-white w-80 h-40 m-10">
              <div className="m-6">
                <h2 className="font-bold flex justify-center m-4">
                  {selectedReview.name}
                </h2>
                <div className="">
                  <div className="">Description: {selectedReview.desc}</div>
                  <div>Review: {selectedReview.review}</div>
                </div>
              </div>
            </div>
          )}
          {!showReview && !selectedReview && (
            <button
              className="border p-4 font-bold bg-slate-500 text-white m-24"
              onClick={() => setShowReview(true)}
            >
              New review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
