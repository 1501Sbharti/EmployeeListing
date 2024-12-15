import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
}

interface EmployeeState {
  list: Employee[];
}

const initialState: EmployeeState = {
  list: [
    { id: 1, name: 'John Doe', role: 'Developer', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', role: 'Designer', department: 'Design' },
    { id: 3, name: 'Brown Smith', role: 'Business Analyst', department: 'Marketing' },
    { id: 4, name: 'J Brown', role: 'Backend Dev', department: 'Engineering' },
    { id: 5, name: 'Brent Reed', role: 'Business Analyst', department: 'Engineering' },
    { id: 6, name: 'Brian', role: 'Developer', department: 'Engineering' },
    { id: 7, name: 'Hendrik', role: 'Designer', department: 'Design' },
    { id: 8, name: 'Shren Jk', role: 'Business Analyst', department: 'Marketing' },
    { id: 9, name: 'Harry Potter', role: 'UI/UX', department: 'Design'},
    { id: 10, name: 'Tim', role: 'Business Analyst', department: 'Marketing' }
  ],
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.list.push(action.payload);
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.list.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(emp => emp.id !== action.payload);
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
