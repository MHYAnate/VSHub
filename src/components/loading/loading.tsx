"use client";
import styles from "./styles.module.css";
 



export default function Loading() {



	return (
		<div className={styles.loaderContainer}>
			<svg  viewBox="0 0 400 160" className={styles.svg}>
			  <text x="50%" y="50%" dy=".23em" textAnchor="middle" className={styles.svgText}>
				  VsHub
			  </text>
			</svg>
		</div>
	);
}