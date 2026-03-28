import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import HeroSection from "./components/layouts/HeroSection";
import SelectMCQ from "./components/Screens/SelectMCQ";
import Quiz from "./components/Screens/Quiz";
import QuizResultsTable from "./components/Screens/Table";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import NotFound404 from "./components/Screens/404Page";
import ServerError500 from "./components/Screens/ServerError";
import ErrorBoundary from "./components/Screens/ErrorBoundary";
export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="*" element={<NotFound404 />} />
          <Route path="/500" element={<ServerError500 />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/select" element={<SelectMCQ />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result/past" element={<QuizResultsTable />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
