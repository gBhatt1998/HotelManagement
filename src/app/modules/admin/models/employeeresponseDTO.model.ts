export interface EmployeeResponseDTO {
  id: number;
  name: string;
  position: string;
  hireDate: string; // or Date
  departments: string[];
}


export interface EmployeeRequestDTO {
  name: string;
  position: string;
  hireDate: string; // ISO string
  departments: string[];
}

export interface CredentialsResponse {
  email: string;
  password: string;
}