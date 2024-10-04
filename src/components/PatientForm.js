import React, { useState, useEffect } from 'react';

const PatientForm = ({ patient = {}, refreshPatients }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (patient && patient.id) {
      setName(patient.name || '');
      setAge(patient.age || '');
      setIsEditing(true);
    } else {
      // Reset form when no patient is selected or creating new
      setName('');
      setAge('');
      setIsEditing(false);
    }
  }, [patient]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? `http://localhost:5000/api/patients/${patient.id}`
      : 'http://localhost:5000/api/patients';

    const method = isEditing ? 'PUT' : 'POST';
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Authorization token not found, please log in again.');
      return;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, age: Number(age) }),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        refreshPatients(); // Refresh patient list after save/update
        setName('');
        setAge('');
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        console.error('Failed to save patient:', errorData);
        alert('Failed to save patient');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Network error occurred');
    }
  };

  return (
    <form className="mb-8 p-6 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {isEditing ? 'Edit Patient' : 'Register New Patient'}
      </h2>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2" htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter patient name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 mb-2" htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          placeholder="Enter patient age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className={`w-full py-3 text-white font-semibold rounded-lg ${
          isEditing
            ? 'bg-yellow-500 hover:bg-yellow-600'
            : 'bg-green-500 hover:bg-green-600'
        } transition duration-300`}
      >
        {isEditing ? 'Update Patient' : 'Register Patient'}
      </button>
    </form>
  );
};

export default PatientForm;
