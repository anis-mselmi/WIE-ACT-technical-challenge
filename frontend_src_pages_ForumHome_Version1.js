import { Link } from 'react-router-dom';

const categories = ['pests','irrigation','markets','tools','weather'];

export default function ForumHome(){
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Forum</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map(c=> (
          <Link key={c} to={`/forum/category/${c}`} className="p-4 border rounded bg-white">{c}</Link>
        ))}
      </div>
    </div>
  );
}
