"use client";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/authContext";
import Spinner from "@/components/spinner/Spinner";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { state } = useContext(AuthContext);
  const { user } = state;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : !user ? (
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
    </div>
  );
};

export default LayoutProvider;
