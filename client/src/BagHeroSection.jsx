import React from "react";

const BagHeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-purple-300 via-purple-200 to-pink-100 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-5xl bg-white rounded-[2rem] shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm text-gray-500 uppercase mb-2 tracking-wide">Personalize</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Favorite <span className="text-purple-700">Handbag</span>
          </h1>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.
          </p>
          <button className="bg-purple-700 text-white px-6 py-3 rounded-full hover:bg-purple-800 transition duration-300">
            Order Now
          </button>
          <div className="flex space-x-4 mt-6 justify-center md:justify-start">
            <i className="fab fa-facebook-f text-gray-600"></i>
            <i className="fab fa-twitter text-gray-600"></i>
            <i className="fab fa-instagram text-gray-600"></i>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src="/Screenshot (18).png" // Adjust the path if necessary
            alt="Handbag"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default BagHeroSection;
