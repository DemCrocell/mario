// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

import { NOT_FOUND } from './constants/api';

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
	// [::1] is the IPv6 localhost address.
	window.location.hostname === '[::1]' ||
	// 127.0.0.0/8 are considered localhost for IPv4.
	/^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})){3}$/.exec(window.location.hostname)
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

const onstatechange = (
  installingWorker: ServiceWorker,
  registration: ServiceWorkerRegistration,
  config?: Config,
) => () => {
  if (installingWorker.state === 'installed') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let consoleMessage = `New content is available and will be used when all 
							tabs for this page are closed. See https://bit.ly/CRA-PWA.`;
    if (navigator.serviceWorker.controller) {
      // At this point, the updated precached content has been fetched,
      // but the previous service worker will still serve the older
      // content until all client tabs are closed.

      // Execute callback
      if (config?.onUpdate) {
        config.onUpdate(registration);
      }
    } else {
      // At this point, everything has been precached.
      // It's the perfect time to display a
      // "Content is cached for offline use." message.
      consoleMessage = 'Content is cached for offline use.';
      // Execute callback
      if (config?.onSuccess) {
        config.onSuccess(registration);
      }
    }
  }
};

const registerValidSW = async (swUrl: string, config?: Config): Promise<void> => {
  try {
    const registration = await navigator.serviceWorker.register(swUrl);
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (installingWorker === null) {
        return;
      }
      installingWorker.onstatechange = onstatechange(installingWorker, registration, config);
    };
  } catch (error) {
    throw new Error(`Error during service worker registration: ${error}`);
  }
};

const checkValidServiceWorker = async (swUrl: string, config?: Config): Promise<void> => {
  // Check if the service worker can be found. If it can't reload the page.
  try {
    const response = await fetch(swUrl, {
      headers: { 'Service-Worker': 'script' },
    });
    const contentType = response.headers.get('content-type');
    if (
      response.status === NOT_FOUND ||
			!contentType?.includes('javascript')
    ) {
      // No service worker found. Probably a different app. Reload the page.
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      window.location.reload();
    } else {
      // Service worker found. Proceed as normal.
      registerValidSW(swUrl, config);
    }
  } catch (e) {
    throw new Error('No internet connection found. App is running in offline mode.');
  }
};

export const register = (config?: Config): void => {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(
      process.env.PUBLIC_URL || './',
      window.location.href
    );
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => async (): Promise<void> => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        await navigator.serviceWorker.ready;
        // eslint-disable-next-line no-console
        console.log(
          `This web app is being served cache-first by a service 
					worker. To learn more, visit https://bit.ly/CRA-PWA`
        );
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
};

export const unregister = async (): Promise<void> => {
  try {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      registration.unregister();
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
