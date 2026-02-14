import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";

const SPLASH_DURATION_MS = 2000;

export function useSplashRedirection() {
  const router = useRouter();

  const redirectToHome = useCallback(() => {
    router.replace("/match");
  }, [router]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      redirectToHome();
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timeout);
  }, [redirectToHome]);
}
