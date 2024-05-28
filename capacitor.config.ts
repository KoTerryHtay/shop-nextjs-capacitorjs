import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.foodshop.app",
  appName: "food-shop-nextjs",
  webDir: "out",
  server: {
    androidScheme: "https",
    // url: "http://192.168.100.153:3000",
    // 192.168.100.153
    // cleartext: true,
  },
};

export default config;
