import { Box } from '@mui/material'
import {  Header } from './components'

import { CardList } from './components/cardDoument/CardList'

export const RegistroCofepris = () => {
  const handleVer = (id: number) => {
    console.log('Ver registro:', id)
  }

  const handleEditar = (id: number) => {
    console.log('Editar registro:', id)
  }

  const handleBorrar = (id: number) => {
    console.log('Borrar registro:', id)
  }

  return (
    <Box>
      <Header />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
          },
          gap: 3,
          mt: 3
        }}
      >
     

        <CardList  handleBorrar={handleBorrar} handleEditar={handleEditar} handleVer={handleVer}/>
      </Box>
    </Box>
  )
}
