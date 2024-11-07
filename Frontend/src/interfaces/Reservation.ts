//Reservation.ts
export interface Reservation {
    id: string;
    apartmentId: string;
    userId: string;
    startDate: string; 
    endDate: string;
    totalAmount: number;
  }
  