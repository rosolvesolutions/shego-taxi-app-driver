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

export function useTripRequest(isOnline: boolean) {
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [pending, setPending] = useState<Trip[]>([]);
  const [cooldown, setCooldown] = useState(false);
  const [countdown, setCountdown] = useState<number>(10);
  const memory = useRef<Set<string>>(new Set());

  // Simulate incoming trip requests
  useEffect(() => {
    if (!isOnline || activeTrip || cooldown) return;

    const timeout = setTimeout(() => {
      const id = Math.random().toString(36).substring(2);
      if (memory.current.has(id)) return;

      const newTrip: Trip = {
        id,
        name: 'April',
        rating: 4.9,
        photo: 'https://randomuser.me/api/portraits/women/44.jpg',
        pickup: '743 Verigrene Terrace, Dublin',
        dropoff: 'The Spire, O’Connell Street',
        eta: '5 min',
        fare: (Math.random() * 20 + 10).toFixed(2),
      };

      setActiveTrip(newTrip);
      setCountdown(10);
      memory.current.add(id);
      Vibration.vibrate();
    }, 8000); // Delay between offers

    return () => clearTimeout(timeout);
  }, [isOnline, activeTrip, cooldown]);

  // Handle countdown timer
  useEffect(() => {
    if (!activeTrip || countdown <= 0) return;

    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, activeTrip]);

  // Auto-hide when time expires
  useEffect(() => {
    if (activeTrip && countdown === 0) {
      setPending((p) => [...p, activeTrip]);
      setActiveTrip(null);
      triggerCooldown();
    }
  }, [countdown]);

  const triggerCooldown = () => {
    setCooldown(true);
    setTimeout(() => setCooldown(false), 7000);
  };

  const acceptTrip = () => {
    if (!activeTrip) return;
    setActiveTrip(null);
    setCountdown(0);
    triggerCooldown();
  };

  const hideTrip = () => {
    if (activeTrip) {
      setPending((p) => [...p, activeTrip]);
      setActiveTrip(null);
      setCountdown(0);
      triggerCooldown();
    }
  };

  return {
    activeTrip,
    pending,
    countdown,
    acceptTrip,
    hideTrip,
    setPending,
  };
}
