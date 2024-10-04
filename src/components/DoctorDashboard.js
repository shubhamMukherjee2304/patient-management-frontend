import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required Chart.js components for the Bar graph
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DoctorDashboard = () => {
  const [chartData, setChartData] = useState({});
  const [doctorName, setDoctorName] = useState(''); // State for doctor's name
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatientData();
    fetchDoctorData(); // Fetch doctor's data on mount
  }, []);

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  const fetchPatientData = async () => {
    const response = await fetch('http://localhost:5000/api/patients', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      const patients = await response.json();
      const dataByDate = patients.reduce((acc, patient) => {
        const date = new Date(patient.dateRegistered).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const dates = Object.keys(dataByDate);
      const counts = Object.values(dataByDate);

      setChartData({
        labels: dates,
        datasets: [
          {
            label: 'Patients Registered',
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  };

  const fetchDoctorData = async () => {
    const response = await fetch('http://localhost:5000/api/auth/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      const doctor = await response.json();
      setDoctorName(doctor.username); // Set the doctor's name from the response
    } else {
      console.error('Failed to fetch doctor data');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-400">Welcome, {doctorName || 'Doctor'}</h1> {/* Display doctor's name */}
        <p className="text-lg text-gray-600 mt-2">Here is your patient registration overview</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"> {/* Container for the chart */}
        {chartData.labels ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Date',
                    color: '#4B5563',
                  },
                  grid: {
                    display: false,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Number of Patients',
                    color: '#4B5563',
                  },
                  min: 0, // Set minimum value for y-axis to 0
                  max: Math.max(...chartData.datasets[0].data) + 1, // Set max value dynamically with padding
                  grid: {
                    color: '#E5E7EB',
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                  labels: {
                    color: '#4B5563', // Change legend color
                  },
                },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Tooltip color
                  titleColor: '#FFFFFF',
                  bodyColor: '#FFFFFF',
                },
              },
            }}
            height={300} // Set a medium size for the chart
          />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-3 mt-6 rounded-lg transition duration-300 hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default DoctorDashboard;
