import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";

const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_github" | "oauth_apple") => {
    if (loadingStrategy) return; // guard againts concurrent flows

    setLoadingStrategy(strategy);

    try {
      const result = await startSSOFlow({ strategy });
      const { createdSessionId, setActive, signIn, signUp, authSessionResult } = result;

      console.log("🔐 SSO result:", JSON.stringify({
        createdSessionId,
        authSessionType: authSessionResult?.type,
        signInStatus: signIn?.status,
        signUpStatus: signUp?.status,
        signUpMissingFields: signUp?.missingFields,
        signUpUnverifiedFields: signUp?.unverifiedFields,
      }, null, 2));

      if (!createdSessionId || !setActive) {
        Alert.alert("Sign-in incomplete", "Sign-in did not complete. Please try again.");
        return;
      }

      await setActive({ session: createdSessionId });
    } catch (error) {
      console.log("💥 Error in social auth:", error);
      Alert.alert("Error", "Failed to sign in. Please try again.");
    } finally {
      setLoadingStrategy(null);
    }
  };

  return { handleSocialAuth, loadingStrategy };
};

export default useSocialAuth;
