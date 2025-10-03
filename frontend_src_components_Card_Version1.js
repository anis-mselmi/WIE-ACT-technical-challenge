export default function Card({ title, subtitle, image, children }) {
  return (
    <div className="border rounded-lg shadow p-4 mb-4 flex flex-col md:flex-row items-center bg-white">
      {image && <img src={image} alt={title} className="w-24 h-24 object-cover mr-4" />}
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="text-gray-600">{subtitle}</div>
        {children}
      </div>
    </div>
  );
}