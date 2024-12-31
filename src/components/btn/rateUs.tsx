'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { fetchRatings, addRating, updateRating, resetCardRating, type RateValue } from '@/lib/store/features/ratingSlice';


interface RateUsProps {
  rateeId: string;
  raterId: string;
  raterName: string;
  raterImg: string;
}

interface FormValue {
  feedback: string;
}

const StarIcon: React.FC<{ className?: string; fill?: string }> = ({ className = "w-6 h-6", fill = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
    />
  </svg>
);

const RateUs: React.FC<RateUsProps> = ({ rateeId, raterId, raterName, raterImg }) => {
  const dispatch = useAppDispatch();
  
  const cardRatings = useAppSelector((state) => 
    state.rating.ratingsByCard[rateeId] || {
      ratings: [] as RateValue[],
      totalRate: 0,
      loading: false,
      error: null,
    }
  );
  
  const { ratings, totalRate, loading, error } = cardRatings;
  const { register, handleSubmit, reset } = useForm<FormValue>();
  const [rate, setRate] = useState(0);
  const [openRateUs, setOpenRateUs] = useState(false);

  useEffect(() => {
    dispatch(fetchRatings(rateeId));
    return () => {
      dispatch(resetCardRating(rateeId));
    };
  }, [dispatch, rateeId]);

  const finalRate = Math.round(ratings.length ? totalRate / ratings.length : 0);

  const handleNewRate = async (data: FormValue) => {
    if (!rate) return;
    
    try {
      await dispatch(addRating({
        data,
        finalRate,
        rateeId,
        raterId,
        rate,
        raterImg,
        raterName,
      })).unwrap();
      reset();
      setRate(0);
      setOpenRateUs(false);
    } catch (error) {
      console.error('Failed to add rating:', error);
    }
  };

  const handleUpdateRate = async (data: FormValue) => {
    if (!rate) return;

    const target = ratings.find((rating) => rating.raterId === raterId);
    if (target) {
      try {
        await dispatch(updateRating({
          target,
          data,
          finalRate,
          rateeId,
          rate,
          raterImg,
          raterName,
        })).unwrap();
        reset();
        setRate(0);
        setOpenRateUs(false);
      } catch (error) {
        console.error('Failed to update rating:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 rounded-lg bg-red-50 border border-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <span className="text-2xl font-bold">{finalRate}</span>
          <StarIcon fill="gold" className="w-6 h-6" />
        </div>
        <span className="text-gray-500">({ratings.length} reviews)</span>
        <button
          onClick={() => setOpenRateUs(!openRateUs)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Rate
        </button>
      </div>

      {openRateUs && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <p className="font-semibold text-gray-700">Please rate your experience:</p>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRate(star)}
                className={`focus:outline-none transition-colors ${
                  rate >= star ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-400`}
              >
                <StarIcon className="w-8 h-8" />
              </button>
            ))}
          </div>
          <form 
            onSubmit={handleSubmit(
              ratings.some((rating) => rating.raterId === raterId) ? handleUpdateRate : handleNewRate
            )} 
            className="space-y-4"
          >
            <textarea
              {...register('feedback', { required: true })}
              placeholder="Leave your feedback"
              className="w-full min-h-[100px] p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={raterId === "undefined" && rate === 0 }
              className={`w-full py-2 px-4 rounded-md transition-colors ${
                raterId === "undefined"
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {raterId === "undefined" ? 'Register or log in to rate' : 'Submit Rating'}
            </button>
          </form>
        </div>
      )}

      {/* <button
        onClick={() => setOpenFeedBack(!openFeedBack)}
        className={`text-blue-500 hover:text-blue-600 transition-colors ${
          ratings.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={ratings.length === 0}
      >
        {ratings.length === 0 ? 'No Feedback Available' : openFeedBack ? 'Hide Feedbacks' : 'Show Feedbacks'}
      </button> */}

      {/* {openFeedBack && (
        <div className="space-y-4">
          {ratings.map((rating) => (
            <div key={rating.raterId} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <Image
                src={rating.raterImg || "/service/u1.jpg"}
                alt={rating.raterName}
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{rating.raterName}</p>
                <div className="flex items-center space-x-1 my-1">
                  <span>{rating.rate}</span>
                  <StarIcon fill="gold" className="w-4 h-4" />
                </div>
                <p className="text-gray-600 mt-2">{rating.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default RateUs;