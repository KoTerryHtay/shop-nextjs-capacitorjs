import { App } from "@capacitor/app";
import { useEffect } from "react";

export function useAppBack(id: number, setId: (id: number) => void) {
  useEffect(() => {
    App.addListener("backButton", () => {
      if (id === 0) {
        window.history.back();
      } else {
        setId(0);
      }
    });

    return () => {
      App.removeAllListeners(); // Cleanup
    };
  }, [id, setId]);
}
