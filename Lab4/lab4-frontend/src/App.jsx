import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NotFoundPage from "pages/NotFoundPage";
import ProductViewPage from "pages/ProductViewPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/:productId" element={<ProductViewPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
