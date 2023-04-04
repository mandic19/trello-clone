import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./routes/home/HomePage";
import BoardPage from "./routes/board/BoardPage";
import PageNotFound from "./routes/PageNotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/board/:board_id" element={<BoardPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
