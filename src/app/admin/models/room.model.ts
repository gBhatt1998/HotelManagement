export interface RoomRequestDTO {
  roomTypeId: number;
  roomNo: number;              // ✅ Added this
  availability: boolean;
}
export interface RoomResponseDTO {
roomNo: number;
  availability: boolean;
  roomTypeId: number;
  roomTypeName: string;
  canDelete: boolean;
}