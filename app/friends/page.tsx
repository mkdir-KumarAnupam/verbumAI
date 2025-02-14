import Navbar from '../components/Navbar';

export default function FriendsPage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Friends
        </h1>
        <p className="text-center text-gray-400">Coming soon...</p>
      </div>
    </div>
  );
}