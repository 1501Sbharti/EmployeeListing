import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addEmployee, updateEmployee } from '../app/employeeSlice';
import { RootState } from '../app/store';

const EmployeeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employeeToEdit = useSelector((state: RootState) =>
    state.employees.list.find((emp) => emp.id === Number(id))
  );

  const [formData, setFormData] = useState({
    id: employeeToEdit ? employeeToEdit.id : Date.now(),
    name: employeeToEdit ? employeeToEdit.name : '',
    role: employeeToEdit ? employeeToEdit.role : '',
    department: employeeToEdit ? employeeToEdit.department : '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (employeeToEdit) {
      dispatch(updateEmployee(formData));
    } else {
      dispatch(addEmployee(formData));
    }
    navigate('/');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {employeeToEdit ? 'Edit Employee' : 'Add Employee'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          >
            <option value="" disabled>Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {employeeToEdit ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
