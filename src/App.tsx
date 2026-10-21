import React, { useState, useEffect } from "react";
import { Navigation, NavModule } from "./components/Navigation";
import { FormView } from "./components/FormView";
import { ProposalView } from "./components/ProposalView";
import { AdminView } from "./components/AdminView";
import { AnalyticsView } from "./components/AnalyticsView";
import { MethodologyView } from "./components/MethodologyView";
import { getInterviews, initStorage } from "./lib/storage";
import { AuthProvider } from "./context/AuthContext";
import { Interview } from "./types";

function MainApp() {
  const [currentModule, setCurrentModule] = useState<NavModule>("form");
  const [interviews, setInterviews] = useState<Interview[]>([]);

  const loadLocalData = () => {
    const list = getInterviews();
    setInterviews(list);
  };

  useEffect(() => {
    // Initialize local storage cache with sample data if empty
    initStorage();
    loadLocalData();

    // Listen for storage changes across windows/actions
    const handleStorageUpdated = () => {
      loadLocalData();
    };

    window.addEventListener("storage_updated", handleStorageUpdated);
    window.addEventListener("storage", handleStorageUpdated);

    return () => {
      window.removeEventListener("storage_updated", handleStorageUpdated);
      window.removeEventListener("storage", handleStorageUpdated);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F8FB] text-[#1E252D] flex flex-col lg:flex-row font-['Inter']">
      {/* Navigation Sidebar */}
      <Navigation
        currentModule={currentModule}
        onSelectModule={setCurrentModule}
        interviewCount={interviews.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {currentModule === "form" && <FormView />}
          {currentModule === "proposal" && <ProposalView interviews={interviews} />}
          {currentModule === "admin" && (
            <AdminView interviews={interviews} onRefresh={loadLocalData} />
          )}
          {currentModule === "analytics" && (
            <AnalyticsView interviews={interviews} onRefresh={loadLocalData} />
          )}
          {currentModule === "methodology" && <MethodologyView />}
        </main>
      </div>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
