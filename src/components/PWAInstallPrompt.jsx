import React from 'react';
import { usePWAInstallPrompt } from '../service-worker/usePWAInstallPrompt';

const PWAInstallPrompt = () => {
  const { isInstallable, promptInstall } = usePWAInstallPrompt();

  const handleInstallClick = async () => {
    const result = await promptInstall();
    console.log(`User response to the install prompt: ${result.outcome}`);
  };

  return (
    <>
      {isInstallable && (
        <button onClick={handleInstallClick}>Install PWA</button>
      )}
      <span>Hello</span>
    </>
  );
};

export default PWAInstallPrompt;
