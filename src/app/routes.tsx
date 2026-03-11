import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { HomePage } from './pages/HomePage';
import { CreateLessonPage } from './pages/CreateLessonPage';
import { EditLessonPage } from './pages/EditLessonPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "admin/lessons/create",
        Component: CreateLessonPage,
      },
      {
        path: "admin/lessons/:lessonId/edit",
        Component: EditLessonPage,
      },
      {
        path: "student/:userId",
        Component: StudentDashboardPage,
      },
    ],
  },
]);