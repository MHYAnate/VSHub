"use client";
import React from "react";
import {useAppSelector } from '@/lib/store/store';
import { type RateValue } from '@/lib/store/features/ratingSlice';
interface PropsValues {
	id:string;
}


export default function TotalRate({ id }:PropsValues) {

  const cardRatings = useAppSelector((state) => 
  state.rating.ratingsByCard[id] || {
    ratings: [] as RateValue[],
    totalRate: 0,
    loading: false,
    error: null,
  }
);

const { totalRate } = cardRatings;

  

	return <>{totalRate}</>;
}
