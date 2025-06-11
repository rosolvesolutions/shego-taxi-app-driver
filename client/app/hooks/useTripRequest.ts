import { useEffect, useState, useRef } from 'react';
import { Vibration } from 'react-native';

type Trip = {
  id: string;
  name: string;
  rating: number;
  photo: string;
  pickup: string;
  dropoff: string;
  eta: string;
  fare: string;
};

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5001';
const DRIVER_ID = 'YOUR_DRIVER_ID'; // ✅ 替换为实际 driverId

// ✅ 映射后端 Trip 数据为前端 Trip 类型
function transformTrip(data: any): Trip {
  return {
    id: data._id || data.id || 'unknown-id',
    name: `${data.passengerFirstName ?? 'Unknown'} ${data.passengerLastName ?? ''}`,
    rating: 4.8, // 可替换为 data.rating 如后端支持
    photo: 'https://randomuser.me/api/portraits/women/75.jpg', // 可替换为 data.passengerPhoto
    pickup: data.pickupAddress ?? 'Unknown Pickup',
    dropoff: data.dropoffAddress ?? 'Unknown Dropoff',
    eta: '•',
    fare: '€25.75',
  };
}

export function useTripRequest(isOnline: boolean) {
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [pending, setPending] = useState<Trip[]>([]);
  const [cooldown, setCooldown] = useState(false);
  const [countdown, setCountdown] = useState<number>(10);
  const memory = useRef<Set<string>>(new Set());

  const fetchTripRequest = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/trip/next?driverId=${DRIVER_ID}`);
      const data = await res.json();

      const backendTrip = data.trip;
      const backendTripId = backendTrip?._id || backendTrip?.id;

      if (res.ok && backendTrip && backendTripId && !memory.current.has(backendTripId)) {
        const transformedTrip = transformTrip(backendTrip);
        setActiveTrip(transformedTrip);
        setCountdown(10);
        memory.current.add(transformedTrip.id);
        Vibration.vibrate();
        console.log('📦 Received trip:', transformedTrip);
      } else {
        console.log('ℹ️ No new trip received or already handled.');
      }
    } catch (err) {
      console.error('❌ Error fetching trip:', err);
    }
  };

  // 拉取逻辑：每 8 秒轮询一次
  useEffect(() => {
    if (!isOnline || activeTrip || cooldown) return;

    const timeout = setTimeout(() => {
      fetchTripRequest();
    }, 8000);

    return () => clearTimeout(timeout);
  }, [isOnline, activeTrip, cooldown]);

  // 倒计时逻辑
  useEffect(() => {
    if (!activeTrip || countdown <= 0) return;

    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, activeTrip]);

  // 倒计时结束后，将 trip 加入 pending
  useEffect(() => {
    if (activeTrip && countdown === 0) {
      setPending((prev) => [...prev, activeTrip]);
      setActiveTrip(null);
      triggerCooldown();
    }
  }, [countdown]);

  const triggerCooldown = () => {
    setCooldown(true);
    setTimeout(() => setCooldown(false), 7000);
  };

  const acceptTrip = async () => {
    if (!activeTrip) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/trip/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripId: activeTrip.id,
          driverId: DRIVER_ID,
        }),
      });

      if (!res.ok) throw new Error('Server rejected accept');

      console.log('✅ Trip accepted:', activeTrip.id);
    } catch (err) {
      console.error('❌ Failed to accept trip:', err);
    }

    setActiveTrip(null);
    setCountdown(0);
    triggerCooldown();
  };

  const hideTrip = () => {
    if (!activeTrip) return;

    setPending((prev) => [...prev, activeTrip]);
    setActiveTrip(null);
    setCountdown(0);
    triggerCooldown();
  };

  return {
    activeTrip,
    pending,
    countdown,
    acceptTrip,
    hideTrip,
    setPending, // 外部可用来手动清除或替换 pending
  };
}
