// Comprehensive device data collection utility
import UAParser from 'ua-parser-js';

const getDeviceFingerprint = () => {
  const parser = new UAParser();
  const result = parser.getResult();
  
  const deviceData = {
    // Browser information
    browser: {
      name: result.browser.name,
      version: result.browser.version,
      engine: result.engine.name,
      engineVersion: result.engine.version
    },
    
    // Operating system
    os: {
      name: result.os.name,
      version: result.os.version,
      platform: navigator.platform
    },
    
    // Device details
    device: {
      type: result.device.type || 'desktop',
      vendor: result.device.vendor,
      model: result.device.model,
      touch: ('ontouchstart' in window) || navigator.maxTouchPoints > 0
    },
    
    // Screen and window information
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
      orientation: screen.orientation?.type
    },
    
    // System information
    system: {
      language: navigator.language,
      languages: navigator.languages,
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: navigator.deviceMemory,
      platform: navigator.userAgentData?.platform || navigator.platform,
      mobile: navigator.userAgentData?.mobile
    },
    
    // Time and locale
    locale: {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      language: navigator.language,
      languages: navigator.languages,
      dateFormat: new Intl.DateTimeFormat().resolvedOptions()
    },
    
    // Feature detection
    features: {
      cookies: navigator.cookieEnabled,
      localStorage: !!window.localStorage,
      sessionStorage: !!window.sessionStorage,
      webGL: !!window.WebGLRenderingContext,
      webWorkers: !!window.Worker,
      serviceWorkers: 'serviceWorker' in navigator,
      notifications: 'Notification' in window,
      geolocation: 'geolocation' in navigator,
      bluetooth: 'bluetooth' in navigator,
      usb: 'usb' in navigator,
      nfc: 'nfc' in navigator
    },
    
    // Network information
    network: {
      connection: navigator.connection ? {
        type: navigator.connection.type,
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt,
        saveData: navigator.connection.saveData
      } : null,
      online: navigator.onLine
    }
  };

  return {
    ...deviceData,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    fingerprint: generateFingerprint(deviceData)
  };
};

// Generate a unique device fingerprint
const generateFingerprint = (data) => {
  const values = [
    data.browser.name,
    data.os.name,
    data.screen.width,
    data.screen.height,
    data.system.hardwareConcurrency,
    data.locale.timezone,
    data.features.webGL,
    navigator.userAgent
  ].join('|');
  
  return btoa(values).replace(/[/+=]/g, '').substr(0, 32);
};

export { getDeviceFingerprint };