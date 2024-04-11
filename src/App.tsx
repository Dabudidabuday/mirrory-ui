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
import { SingleNote } from "./pages/Notes/SingleNote";
import { Calendar } from "./pages/Calendar/Calendar";
import { Complete } from "./pages/templates/Complete";
import { NoteLayout } from "./layouts/NoteLayout";
import { client } from "./api/apolloClient";
import { gql } from "@apollo/client";

function App() {
  client
    .query({
      query: gql(`
      query {
        template {
          id
          name
        }
      }
    `),
    })
    .then((result) => console.log(result));
  return (
    <>
      <Routes>
        <Route path="signin" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Login />} />

        <Route element={<NoteLayout />}>
          <Route
            path="notes/:id"
            element={
              <PrivateRoute>
                <SingleNote />
              </PrivateRoute>
            }
          />
        </Route>

        <Route element={<MainLayout />}>
          <Route
            path="Home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

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
            path={`templates/:id`}
            element={
              <PrivateRoute>
                <SingleTemplate />
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
