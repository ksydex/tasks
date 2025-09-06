import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import { DesignTokenTest } from "@/components/DesignTokenTest";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DetailedTaskForm } from "@/components/DetailedTaskForm";

function AppContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const taskId = searchParams.get('taskId');

  const handleCloseTaskForm = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('taskId');
    setSearchParams(newParams);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/design-tokens" element={<DesignTokenTest />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {taskId && (
        <DetailedTaskForm
          taskId={taskId}
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              handleCloseTaskForm();
            }
          }}
        />
      )}
      <Toaster />
    </>
  );
}

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;
