"use client";
import React from "react";
import {
	type RateValue,
} from "@/lib/store/features/ratingSlice";

interface PropsValues {
  ratings: RateValue[];
	id:string;
}


export default function ClientFeedBack({ratings,id }:PropsValues) {


	const value = ratings.find((value) => value.docid === `${id}`);
  

	return <>{value?.feedback}</>;
}
