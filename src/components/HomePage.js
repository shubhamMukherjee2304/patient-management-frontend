import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 flex flex-col">
      {/* Hero Section */}
      <header className="text-center py-12 bg-gradient-to-r from-green-300 via-blue-400 to-teal-400">
        <h1 className="text-5xl font-bold text-white mb-4">
          Welcome to Our Hospital Portal
        </h1>
        <p className="text-lg text-white mb-8">
          Manage patient records, schedule appointments, and ensure efficient healthcare services.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/login">
            <button className="bg-white text-blue-500 font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-blue-100 transition">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-white text-green-500 font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-green-100 transition">
              Register
            </button>
          </Link>
        </div>
      </header>

      {/* Information Section */}
      <section className="flex flex-col md:flex-row justify-between items-center py-16 px-8 md:px-16">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <img
            src="https://img.freepik.com/free-vector/health-professional-team-cartoon-style_23-2148484771.jpg?t=st=1728042842~exp=1728046442~hmac=5063cab9ed847be70748a708f68f1a68cbd8b94cc6a16ac0dee37a16b842a918&w=1060" // replace with relevant hospital image link
            alt="Hospital"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">
            About Our Medical Portal
          </h2>
          <p className="text-gray-600 mb-4">
            Our platform is designed to streamline your healthcare management,
            making it easier for doctors and receptionists to work efficiently.
            Register or log in today to gain access to a powerful, secure, and
            user-friendly medical system.
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Easy patient registration and management</li>
            <li>Secure access for doctors and staff</li>
            <li>Real-time updates on appointments and patient status</li>
          </ul>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-500 text-white py-16 px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Join Us and Revolutionize Healthcare
        </h2>
        <p className="text-lg mb-8">
          Whether you're a doctor or receptionist, our system will help you
          provide better healthcare services. Sign up today!
        </p>
        <Link to="/register">
          <button className="bg-white text-blue-500 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition">
            Get Started Now
          </button>
        </Link>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-200 py-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">Contact Us</h3>
            <p className="text-sm">
              123 Health St, Medical City, India
            </p>
            <p className="text-sm">Email: contact@hospitalportal.com</p>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Hospital Portal. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
