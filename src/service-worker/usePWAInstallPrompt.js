import { useRef, useEffect, useState } from 'react';

export const usePWAInstallPrompt = () => {
  const deferredPrompt = useRef(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log("before prompty install", e);
      e.preventDefault();
      deferredPrompt.current = e;
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt.current) return { outcome: "unknown" };

    deferredPrompt.current.prompt();
    const result = await deferredPrompt.current.userChoice;

    deferredPrompt.current = null;
    setIsInstallable(false);

    return result; // { outcome: 'accepted' | 'dismissed', platform: string }
  };

  return { isInstallable, promptInstall };
};
