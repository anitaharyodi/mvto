import { useEffect, useState } from 'react';

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(null);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

    if (isAndroid) {
      setDeviceType('Android');
    } else if (isIOS) {
      setDeviceType('iOS');
    } else {
      setDeviceType('Other');
    }
  }, []);

  return deviceType;
};

export default useDeviceType;