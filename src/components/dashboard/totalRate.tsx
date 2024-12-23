"use client";
import React ,{useEffect}from "react";
import {useAppSelector,useAppDispatch } from '@/lib/store/store';
import { fetchRatings, type RateValue } from "@/lib/store/features/ratingSlice";
interface PropsValues {
	id:string;
}


export default function TotalRate({ id }:PropsValues) {

  const dispatch = useAppDispatch();

  useEffect(() => {
		dispatch(fetchRatings(id));
	
	}, [dispatch, id]);


  const cardRatings = useAppSelector((state) => 
  state.rating.ratingsByCard[id] || {
    ratings: [] as RateValue[],
    totalRate: 0,
    loading: false,
    error: null,
  }
);

const { totalRate, ratings } = cardRatings;

const finalRate = Math.round(ratings.length ? totalRate / ratings.length : 0);

  

	return <>{finalRate}</>;
}
