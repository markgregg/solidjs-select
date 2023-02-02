type CacheEntry<T extends object | string> = {
  created: Date;
  items: T[];
};

export interface Cache<T extends object | string> {
  itemCache: Map<string, CacheEntry<T>>;
  getCachedItems: (text: string) => T[] | undefined;
  cacheItems: (text: string, items: T[]) => void;
  dispose: () => void;
}

const cacheMap = new Map<string, Cache<any>>();

export const createCache = <T extends object | string>(
  id: string,
  timeToLive?: number,
  delay?: number
): Cache<T> => {
  //check if cache already exists and return
  const existingCache = cacheMap.get(id);
  if (existingCache) {
    return existingCache;
  }

  //create new map to store items
  const itemCache = new Map<string, CacheEntry<T>>();

  //create expiry check
  const checkCacheEntries = (timeToLive: number) => {
    const expiryTime = new Date(Date.now());
    expiryTime.setSeconds(expiryTime.getSeconds() - timeToLive);

    Array.from(itemCache)
      .filter((kvp) => kvp[1].created < expiryTime)
      .forEach((kvp) => itemCache.delete(kvp[0]));
  };

  //run expiry check on specified interval or default to every 5 minutes
  const expireCacheItemsTimerId = timeToLive
    ? setInterval(
        checkCacheEntries,
        delay ? delay * 1000 : 5 * 60 * 1000,
        timeToLive
      )
    : undefined;

  //create cache
  const cache = {
    itemCache,
    getCachedItems: (text: string): T[] | undefined => {
      return itemCache.get(text)?.items;
    },
    cacheItems: (text: string, items: T[]) => {
      itemCache.set(text, { created: new Date(Date.now()), items });
    },
    dispose: () => {
      if (expireCacheItemsTimerId) {
        clearInterval(expireCacheItemsTimerId);
      }
      itemCache.clear();
    },
  };
  cacheMap.set(id, cache);
  return cache;
};
