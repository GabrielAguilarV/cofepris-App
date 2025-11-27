
import { createBrowserRouter } from 'react-router'
import { HomePage } from './pages/HomePage/HomePage'
import { RootLayout } from './layouts/RootLayout'
import { AboutPage } from './pages/AboutPage/AboutPage'
import { RegistroCofepris } from './pages/registroPage/RegistroCofepris'
import { FormularioPage } from './pages/FormularioPage'
// import RootLayout from './layouts/RootLayout'
// import HomePage from './pages/HomePage'
// import TasksPage from './pages/TasksPage'
// import AboutPage from './pages/AboutPage'
// import NotFoundPage from './pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'tasks',
        element: <RegistroCofepris />
      },
      {
        path: 'formulario',
        element: <FormularioPage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
    
    ]
  }
])