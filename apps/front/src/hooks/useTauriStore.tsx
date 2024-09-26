import { Store } from "@tauri-apps/plugin-store";
import { appDataDir } from "@tauri-apps/api/path";

export const useTauriStore = () => {
  let store: Store | null = null;

  async function initStore() {
    if (!store) {
      const dataDir = await appDataDir();
      store = new Store(`${dataDir}/.infos.dat`);
      try {
        await store.load();
      } catch (error) {
        console.log("Store doesn't exist yet, will be created on first save");
      }
    }
  }

  async function setSessionId(sessionId: string) {
    await initStore();
    if (store) {
      await store.set("sessionId", sessionId);
      await store.save();
      console.log("Session ID saved:", sessionId);
    }
  }

  async function getSessionId(): Promise<string | null> {
    await initStore();
    if (store) {
      const sessionId = await store.get("sessionId");
      console.log("Retrieved session ID:", sessionId);
      return sessionId;
    }
    return null;
  }

  async function clearSessionId() {
    await initStore();
    if (store) {
      await store.delete("sessionId");
      await store.save();
      console.log("Session ID cleared");
    }
  }

  return { setSessionId, getSessionId, clearSessionId };
};
