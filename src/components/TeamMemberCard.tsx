import React from "react";

type TeamMemberCardProps = {
	name: string;
	specialty: string;
};

export default function TeamMemberCard({ name, specialty }: TeamMemberCardProps) {
	return (
		<div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center min-w-[220px] min-h-[140px]">
			<h3 className="text-lg font-semibold mb-1 text-gray-900">{name}</h3>
			<p className="text-gray-600">{specialty}</p>
		</div>
	);
}
