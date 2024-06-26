import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SignUp, Login } from "./pages/auth";
import { SingleTemplate } from "./pages/templates/SingleTemplate";
import { PrivateRoute } from "./router/PrivateRoute";
import { TemplatesPage } from "./pages/templates/TemplatesPage";
import { MainLayout } from "./layouts/MainLayout";
import { AddEditTemplate } from "./pages/templates/AddEditTemplate";
import { Home } from "./pages/Home/Home";
import { Profile } from "./pages/Profile/Profile";
import { MyNotes } from "./pages/Notes/MyNotes";
import { Calendar } from "./pages/Calendar/Calendar";
import { Complete } from "./pages/templates/Complete";
import { WideLayout } from "./layouts/WideLayout";
import { NotFound } from "./pages/auth/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="signin" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<WideLayout />}>
          <Route
            path=""
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="notes/:id"
            element={
              <PrivateRoute>
                <SingleTemplate />
              </PrivateRoute>
            }
          />

          <Route
            path="templates/:id"
            element={
              <PrivateRoute>
                <SingleTemplate />
              </PrivateRoute>
            }
          />
        </Route>
        <Route element={<MainLayout />}>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="templates"
            element={
              <PrivateRoute>
                <TemplatesPage />
              </PrivateRoute>
            }
          />

          <Route
            path={`templates/:id/complete`}
            element={
              <PrivateRoute>
                <Complete />
              </PrivateRoute>
            }
          />

          <Route
            path={`templates/add`}
            element={
              <PrivateRoute>
                <AddEditTemplate />
              </PrivateRoute>
            }
          />

          <Route
            path="notes"
            element={
              <PrivateRoute>
                <MyNotes />
              </PrivateRoute>
            }
          />
          <Route
            path="calendar"
            element={
              <PrivateRoute>
                <Calendar />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
