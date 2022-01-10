import { useAuth } from "./context/AuthContext";
import AuthenticatedApp from "./pages/AuthenticatedApp ";
import UnauthenticatedApp from "./pages/UnauthenticatedApp ";
// const AuthenticatedApp = lazy(() => import("./pages/AuthenticatedApp "));
// const UnauthenticatedApp = lazy(() => import("./pages/UnauthenticatedApp "));

function App() {
  const { user } = useAuth();
  // console.log({ user });
  return <>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</>;
}

export default App;
