import React from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

type JwtPayload = {
  email: string;
  name: string;
  picture: string;
  sub: string; // Google UID
};

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (credentialResponse.credential) {
        const decoded = jwtDecode<JwtPayload>(credentialResponse.credential);
        console.log("✅ Decoded user:", decoded);

        const email = decoded.email.toLowerCase();

        localStorage.setItem("google_token", credentialResponse.credential);
        localStorage.setItem("email", email);

        const userRef = doc(db, "users", email);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const group = userData.group || "UNKNOWN";

          // 🔁 Map AD group to app role
          let role = "Viewer"; // default fallback
          switch (group) {
            case "GRP_Warehouse_Admin":
              role = "Admin";
              break;
            case "GRP_Maintenance":
              role = "Technician";
              break;
            case "GRP_Leadership":
              role = "Manager";
              break;
            case "GRP_Support_Staff":
              role = "Support";
              break;
            case "GRP_Supervisor":
              role = "Supervisor";
              break;
            case "GRP_Operator":
              role = "Operator";
              break;
            case "GRP_Safety_Officer":
              role = "Safety";
              break;
            default:
              console.warn("⚠️ Unknown group:", group);
          }

          // 💾 Store in localStorage
          localStorage.setItem("role", role);
          localStorage.setItem("group", group);

          console.log("✅ Assigned Role:", role);
        } else {
          alert("🚫 User not found in Firestore.");
          localStorage.setItem("role", "Viewer");
        }

        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Please try again.");
    }
  };

  const handleError = () => {
    console.error("❌ Google login failed");
    alert("Google login failed");
  };

  return (
    <div style={{ marginTop: "50px", textAlign: "center" }}>
      <h2>Login with Google</h2>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default Login;
