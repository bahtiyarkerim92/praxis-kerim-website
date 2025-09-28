import React from "react";

type ServiceCardProps = {
	title: string;
	description: string;
};

export default function ServiceCard({ title, description }: ServiceCardProps) {
	return (
		<div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center min-w-[220px] min-h-[180px]">
			<h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
			<p className="text-gray-600">{description}</p>
		</div>
	);
}
