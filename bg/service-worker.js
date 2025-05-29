// 版本控制 - 每次更新时修改这个版本号
const VERSION = '1.0.2';
const CACHE_NAME = `cute-tea-shop-v${VERSION}`;

// 开发模式检测 - 扩展检测范围，包括局域网IP和端口号
const isDevelopment = location.hostname === 'localhost' ||
                     location.hostname === '127.0.0.1' ||
                     location.protocol === 'file:' ||
                     location.hostname.startsWith('192.168.') ||
                     location.hostname.startsWith('10.') ||
                     location.hostname.startsWith('172.') ||
                     location.port === '8080' ||
                     location.port === '8000' ||
                     location.port === '3000';

const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json'
];

console.log(`🍵 可爱茶铺 Service Worker v${VERSION} ${isDevelopment ? '(开发模式)' : '(生产模式)'}`);

// 开发模式下的缓存策略：总是从网络获取最新内容
const DEVELOPMENT_STRATEGY = 'network-first';
// 生产模式下的缓存策略：优先使用缓存
const PRODUCTION_STRATEGY = 'cache-first';

self.addEventListener('install', event => {
  console.log('🍵 可爱茶铺 Service Worker 安装中...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 缓存文件中...');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ 所有文件已缓存');
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', event => {
  console.log('🔄 可爱茶铺 Service Worker 激活中...');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('🗑️ 删除旧缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker 激活完成');
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', event => {
  // 开发模式：总是从网络获取最新内容
  if (isDevelopment) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          console.log(`🔄 开发模式：从网络获取 ${event.request.url}`);
          return response;
        })
        .catch(() => {
          // 网络错误时，尝试返回缓存
          return caches.match(event.request);
        })
    );
    return;
  }

  // 生产模式：优先使用缓存
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果找到缓存的响应，返回缓存
        if (response) {
          console.log(`📦 生产模式：从缓存获取 ${event.request.url}`);
          return response;
        }

        // 否则，获取并缓存新内容
        return fetch(event.request)
          .then(response => {
            // 检查是否收到有效响应
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            console.log(`🌐 生产模式：从网络获取并缓存 ${event.request.url}`);

            // 克隆响应，因为它是流
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // 网络错误时，尝试返回缓存的首页
            if (event.request.destination === 'document') {
              return caches.match('./index.html');
            }
          });
      })
  );
});

// 监听消息
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  // 强制清除缓存
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('🗑️ 强制清除所有缓存...');
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            console.log('🗑️ 删除缓存:', cacheName);
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        console.log('✅ 所有缓存已清除');
        // 通知主线程缓存已清除
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({ type: 'CACHE_CLEARED' });
          });
        });
      })
    );
  }
});
