import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Login } from "./pages/login";
import { Registration } from "./pages/registration";
import Header from "./components/header";
import { Dashboard } from "./pages/dashboard";
import ProtectedRoute from "./components/protected-route";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Header />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
