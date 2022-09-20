import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { PushData } from "./types/pushTypes";

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("push", function (event) {
  if (event.data) {
    console.log("This push event has data: ", event.data.text());
    const pushData: PushData = event.data.json();
    if (Notification.permission === "granted") {
      event.waitUntil(
        self.registration.showNotification(pushData.title, {
          body: pushData.body,
          icon: "/notification_icon.png",
          image: pushData.image,
          badge: "/notification_badge.png",
          tag: pushData.tag,
          silent: pushData.silent,
          data: { href: pushData.href },
        })
      );
    }
  } else {
    console.log("This push event has no data.");
  }
});

self.addEventListener("notificationclick", function (event) {
  const clickedNotification = event.notification;
  clickedNotification.close();
  if (event.notification.data?.href) {
    event.waitUntil(openOrRefocusWindow(event.notification.data.href));
  }
});

async function openOrRefocusWindow(url: string): Promise<WindowClient | null> {
  const windowClients = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });
  for (const windowClient of windowClients) {
    if (windowClient.url === url) {
      return windowClient.focus();
    }
  }
  return self.clients.openWindow(url);
}
