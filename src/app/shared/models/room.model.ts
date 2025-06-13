export interface RoomRequestDTO {
  roomTypeId: number;
  availability: boolean;
}

export interface RoomResponseDTO {
roomNo: number;
  availability: boolean;
  roomTypeId: number;
  roomTypeName: string;
  canDelete: boolean;
}