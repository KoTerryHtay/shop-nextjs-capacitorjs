import { App } from "@capacitor/app";
import { useEffect } from "react";

export default function useAppExit() {
  useEffect(() => {
    App.addListener("backButton", ({ canGoBack }) => {
      if (!canGoBack) {
        const exit = confirm("Are you sure want to exit?");
        if (exit) App.exitApp();
      } else {
        window.history.back();
      }
    });

    return () => {
      App.removeAllListeners(); // Cleanup
    };
  }, []);
}
