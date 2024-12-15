import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';

const EmployeeProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const employee = useSelector((state: RootState) =>
    state.employees.list.find((emp) => emp.id === Number(id))
  );

  if (!employee) {
    return <div>Employee not found!</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Employee Profile</h1>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => navigate('/')}
      >
        Back to List
      </button>
    </div>
  );
};

export default EmployeeProfile;
