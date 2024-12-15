import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Employee {
  id: number;
  name: string;
  role: string;
  age: number;
}

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
};

export const fetchEmployees = createAsyncThunk("employees/fetchEmployees", async () => {
  const response = await fetch("/api/employees");
  return response.json();
});

export const addEmployee = createAsyncThunk("employees/addEmployee", async (employee: Omit<Employee, "id">) => {
  const response = await fetch("/api/employees", {
    method: "POST",
    body: JSON.stringify(employee),
  });
  return response.json();
});

export const updateEmployee = createAsyncThunk("employees/updateEmployee", async (employee: Employee) => {
  const response = await fetch(`/api/employees/${employee.id}`, {
    method: "PUT",
    body: JSON.stringify(employee),
  });
  return response.json();
});

export const deleteEmployee = createAsyncThunk("employees/deleteEmployee", async (id: number) => {
  await fetch(`/api/employees/${id}`, { method: "DELETE" });
  return id;
});

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload.employees;
        state.loading = false;
      })
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload.employee);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex((e) => e.id === action.payload.employee.id);
        if (index >= 0) state.employees[index] = action.payload.employee;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter((e) => e.id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;
