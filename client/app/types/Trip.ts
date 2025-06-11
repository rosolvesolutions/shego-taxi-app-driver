export type Trip = {
  id: string;             // for FlatList key or frontend rendering
  bookingId: string;      // required to send to backend
  name: string;
  rating: number;
  photo: string;
  pickup: string;
  dropoff: string;
  eta: string;
  fare: string;
};

export default Trip;
