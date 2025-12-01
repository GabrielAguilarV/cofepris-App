
import { createHashRouter } from 'react-router'
import { RootLayout } from './layouts/RootLayout'
import { RegistroCofepris } from './pages/registroPage/RegistroCofepris'
import { FormularioPage } from './pages/FormularioPage/FormularioPage'

export const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <RegistroCofepris />
      },
      {
        path: 'formulario',
        element: <FormularioPage />
      }
    ]
  }
])