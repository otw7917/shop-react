import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

type Props = {
  children: React.ReactNode;
  requireAdmin?: boolean;
};
function ProtectedRoute({ children, requireAdmin }: Props) {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  // 유저가 아니거나,
  if (!user) navigate("/", { replace: true });

  // 유저인데 어드민인경우
  if (requireAdmin && user && !user.isAdmin) navigate("/", { replace: true });
  return <>{children}</>;
}

export default ProtectedRoute;
