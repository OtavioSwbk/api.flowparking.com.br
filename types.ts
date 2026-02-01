
export interface Vehicle {
  id: string;
  plate: string;
  nickname: string;
}

export interface ActiveParking {
  vehicleId: string;
  startTime: number;
  endTime: number;
  totalDurationMinutes: number;
  creditsSpent: number;
}

export interface UserState {
  balance: number;
  vehicles: Vehicle[];
  activeParking: ActiveParking | null;
  history: any[];
}
