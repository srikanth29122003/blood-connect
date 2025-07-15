const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 to-red-700 text-white">
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
          Welcome to Blood Connect
        </h1>
        <p className="text-lg md:text-xl text-red-100 mb-8 max-w-xl mx-auto">
          Your one-stop platform to find and connect with blood donors instantly.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="/register"
            className="bg-white text-red-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-red-50 transition-all"
          >
            Become a Donor
          </a>
          <a
            href="/find-donors"
            className="bg-white text-red-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-red-50 transition-all"
          >
            Find Donors
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
