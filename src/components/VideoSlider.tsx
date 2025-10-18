

import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";


const VIDEO_SRC = "/videos/slider_combined.mp4";
const SLIDER_IMAGES = [
	"/images/slider-poster.png",
	"/images/slider-poster2.png",
	"/images/slider-poster3.png",
];

export default function VideoSlider() {
	const [autoplayFailed, setAutoplayFailed] = useState(false);
	const [imgIdx, setImgIdx] = useState(0);
	const [autoplayChecked, setAutoplayChecked] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

		// Only check autoplay after mount, but do not render <video> until after check
		useEffect(() => {
			console.log('[VideoSlider] Checking video autoplay support...');
			const testVideo = document.createElement('video');
			testVideo.src = VIDEO_SRC;
			testVideo.muted = true;
			testVideo.playsInline = true;
			testVideo.autoplay = true;
			testVideo.loop = true;
			testVideo.controls = false;
			testVideo.poster = SLIDER_IMAGES[0];
			const playPromise = testVideo.play();
			if (playPromise !== undefined) {
				playPromise
					.then(() => {
						console.log('[VideoSlider] Autoplay supported!');
						setAutoplayChecked(true);
					})
					.catch(() => {
						console.warn('[VideoSlider] Autoplay failed, fallback to image slider.');
						setAutoplayFailed(true);
						setAutoplayChecked(true);
					});
			} else {
				console.log('[VideoSlider] No playPromise, assuming autoplay supported.');
				setAutoplayChecked(true);
			}
			// Clean up
			return () => {
				testVideo.src = '';
			};
		}, []);

	// Fallback: If autoplay fails, show a simple image slider
	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (autoplayFailed) {
			interval = setInterval(() => {
				setImgIdx((prev) => (prev + 1) % SLIDER_IMAGES.length);
			}, 3500); // 3.5 seconds
		}
		return () => clearInterval(interval);
	}, [autoplayFailed]);

		if (!autoplayChecked) {
			console.log('[VideoSlider] Waiting for autoplay check...');
			return <div className="w-full h-full flex justify-center items-center bg-black" />;
		}

		if (autoplayFailed) {
			console.warn('[VideoSlider] Rendering image slider fallback!');
			return (
				<div className="w-full aspect-video bg-black flex items-center justify-center">
					<div className="relative w-full h-0" style={{paddingBottom: '56.25%'}}>
						<Image
							src={SLIDER_IMAGES[imgIdx]}
							alt={`Slider ${imgIdx + 1} – Hausarztpraxis Offenbach`}
							fill
							className="object-cover transition-all duration-700"
							priority={imgIdx === 0}
							quality={85}
							sizes="100vw"
							placeholder="blur"
							blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
						/>
					</div>
				</div>
			);
		}

		console.log('[VideoSlider] Rendering video!');

		// Only show video if autoplay succeeded and after check
		return (
			<div className="w-full h-full flex justify-center items-center bg-black">
				<video
					ref={videoRef}
					src={VIDEO_SRC}
					className="w-full h-full object-cover rounded-none"
					autoPlay
					muted
					loop
					playsInline
					controls={false}
					poster={SLIDER_IMAGES[0]}
					style={{ width: '100%', height: '100%' }}
				/>
			</div>
		);
}
