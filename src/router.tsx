import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "./routes/auth/_layout";
import LoginPage from "./routes/auth/login";
import CreatePage from "./routes/auth/create";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="auth" />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate replace to="login" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="create" element={<CreatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
