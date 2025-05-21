import axios from 'axios';

const GOOGLE_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace this with real key

export async function fetchDirections(origin: string, destination: string) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json`,
      {
        params: {
          origin,
          destination,
          key: GOOGLE_API_KEY,
        },
      }
    );

    const data = response.data;

    if (data.routes.length === 0) throw new Error('No routes found');

    const route = data.routes[0];
    const leg = route.legs[0];

    return {
      duration: leg.duration.text,
      distance: leg.distance.text,
      polyline: route.overview_polyline.points,
    };
  } catch (err) {
    console.error('Directions API Error:', err);
    throw err;
  }
}
