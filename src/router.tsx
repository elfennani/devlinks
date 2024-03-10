import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "./routes/auth/_layout";
import LoginPage from "./routes/auth/login";
import CreatePage from "./routes/auth/create";
import RootLayout from "./routes/_root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./routes";
import HomeLayout from "./routes/_layout";
import ProfilePage from "./routes/profile";
import PreviewPage from "./routes/preview";

const queryClient = new QueryClient();

const AppRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/link/:uid" Component={PreviewPage} />
          <Route path="/" Component={RootLayout}>
            <Route path="/" element={<HomeLayout />}>
              <Route index Component={HomePage} />
              <Route path="profile" Component={ProfilePage} />
            </Route>
            <Route path="auth" element={<AuthLayout />}>
              <Route index element={<Navigate replace to="login" />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="create" element={<CreatePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppRouter;
