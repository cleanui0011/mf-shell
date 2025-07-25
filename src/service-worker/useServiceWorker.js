import { useEffect, useRef } from "react";

export const useServiceWorker = () => {
  const serviceWorker = useRef(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const registerSW = async () => {
      try {
        const existingRegistration = await navigator.serviceWorker.getRegistration();

        if (existingRegistration) {
          console.log("SW already registered:", existingRegistration);
          serviceWorker.current = existingRegistration;
          return;
        }

        const newRegistration = await navigator.serviceWorker.register("/service-worker.js");
        console.log("SW newly registered:", newRegistration);
        serviceWorker.current = newRegistration;
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    };

    registerSW();
  }, []);

  return { serviceWorker };
};
