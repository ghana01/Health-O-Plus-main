import React, { useEffect } from "react";

const AIConsult = () => {
  useEffect(() => {
    // Redirect to WebMD Symptom Checker
    window.location.replace("https://symptoms.webmd.com");
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl font-semibold">Redirecting to AI Consult...</p>
    </div>
  );
};

export default AIConsult;

