// App.js
import React from "react";
import './index.css'; // tailwind should be here
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WorkflowDetailPage from "./pages/WorkFlowDetailPage";
export default function App() {
  return (
    <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/workflow" element={<WorkflowDetailPage/>} />
          {/* Add more routes as needed */}
    
    </Routes>
  );
}

