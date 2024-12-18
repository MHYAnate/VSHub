import Image from "next/image";
import RateUs from "@/components/btn/rateUs";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

type VendorComponentValue = {
  docid:string;
	name: string;
	address: string;
	number: string;
	src: string;
  specialty:string;
  raterImg:string;
  raterId:string;
  raterName:string;
};


const VendorsComponent: React.FC<VendorComponentValue>= ({ docid, name, address, number, src, specialty, raterImg, raterId, raterName }) => {

  const searchParams = useSearchParams();

  const router = useRouter();

  const set = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);
			return params.toString();
		},
		[searchParams]
	);

	return (
	<>
  		<div className="p-6">
					<h2 className="text-xl font-semibold mb-2">{name}</h2>
					<div className="relative h-48 mb-4">
						<Image
							className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
							src={src || "/service/u1.jpg"}
							alt={`${name}'s image`}
							layout="fill"
							quality={100}
						/>
					</div>
					<RateUs
						rateeId={`${docid}`}
						raterId={raterId || ""}
						raterName={raterName  || ""}
						raterImg={ raterImg || ""}
					/>
					<p className="text-lg font-semibold mt-4 mb-2">{specialty}</p>
					<div className="space-y-2">
						<div>
							<p className="font-medium text-gray-600">Address</p>
							<p className="font-semibold">{address}</p>
						</div>
						<div>
							<p className="font-medium text-gray-600">Contact</p>
							<p className="font-semibold">{number}</p>
						</div>
					</div>
				</div>
				<button
					onClick={() =>
						router.push(
							`/vendorWorkSpace` +
								"?" +
								set("docid", `${docid}`)
						)
					}
					className="w-full py-3 px-4 bg-zinc-900 text-white font-bold rounded-b-lg hover:bg-zinc-950 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900"
				>
					Enter Work Space
				</button>
  </>
	);
};

VendorsComponent.displayName = "VendorsComponent";
export default VendorsComponent;
