import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/employeeList';
import EmployeeProfile from './components/employeeProfile';
import EmployeeForm from './components/employeeForm';


const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employee/:id" element={<EmployeeProfile />} />
          <Route path="/employee/new" element={<EmployeeForm />} />
          <Route path="/employee/edit/:id" element={<EmployeeForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
