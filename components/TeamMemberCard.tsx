interface TeamMemberCardProps {
  name: string;
  specialty: string;
}

export default function TeamMemberCard({ name, specialty }: TeamMemberCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex-1 min-w-[250px] max-w-[350px] m-2 text-center">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-700">{specialty}</p>
    </div>
  );
}
