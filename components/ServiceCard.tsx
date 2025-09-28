interface ServiceCardProps {
  title: string;
  description: string;
}

export default function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex-1 min-w-[250px] max-w-[350px] m-2">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
