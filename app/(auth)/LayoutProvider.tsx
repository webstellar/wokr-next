"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/authContext";
import Spinner from "@/components/spinner/Spinner";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { state } = useContext(AuthContext);
  const { user, isAuthenticating } = state;

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    };
    checkAuthentication();
  }, [user]);

  if (isAuthenticating) {
    return <Spinner />;
  }

  return (
    <>
      {!user ? (
        <>{children}</>
      ) : (
        <ProtectedRoute
          error="403"
          title="We are Sorry..."
          description="The page you're trying to access has restricted access."
          url="/my-profile"
          urlText="Access my profile"
        />
      )}
    </>
  );
};

export default LayoutProvider;
