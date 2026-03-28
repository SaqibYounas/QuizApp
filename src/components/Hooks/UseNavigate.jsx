import { useNavigate } from "react-router-dom";

export default function useAppNavigation() {
  const navigate = useNavigate();
  const go500 = () => navigate("/500");

  return { go500 };
}
