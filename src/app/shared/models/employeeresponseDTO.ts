export interface EmployeeResponseDTO {
  id: number;
  name: string;
  position: string;
  hireDate: string; // or Date
  departments: string[];
}