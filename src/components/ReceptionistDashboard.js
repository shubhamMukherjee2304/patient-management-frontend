import React, { useState, useEffect } from 'react';
import PatientForm from './PatientForm';
import { useNavigate } from 'react-router-dom';

const ReceptionistDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const fetchPatients = async () => {
    const response = await fetch('http://localhost:5000/api/patients', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setPatients(data);
    }
    setLoading(false);
  };

  const deletePatient = async (id) => {
    const response = await fetch(`http://localhost:5000/api/patients/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      fetchPatients();
    } else {
      alert('Failed to delete patient');
    }
  };

  const editPatient = (patient) => {
    setSelectedPatient(patient);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="bg-white shadow-xl rounded-lg p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Receptionist Dashboard</h1>
          <p className="text-gray-500">Manage patient registrations, updates, and deletions.</p>
        </header>

        {/* Patient Form */}
        <div className="bg-gray-100 p-6 rounded-lg mb-8 shadow-md">
          <PatientForm patient={selectedPatient} refreshPatients={fetchPatients} />
        </div>

        {/* Registered Patients */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Registered Patients</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Age</th>
                    <th className="p-4 text-left">Date Registered</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-100 transition-all">
                      <td className="p-4 border-b">{patient.name}</td>
                      <td className="p-4 border-b">{patient.age}</td>
                      <td className="p-4 border-b">
                        {new Date(patient.dateRegistered).toLocaleDateString()}
                      </td>
                      <td className="p-4 border-b text-center">
                        <button
                          className="bg-yellow-400 text-white font-semibold py-1 px-3 rounded-lg mr-2 hover:bg-yellow-500 transition"
                          onClick={() => editPatient(patient)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-red-600 transition"
                          onClick={() => deletePatient(patient.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
