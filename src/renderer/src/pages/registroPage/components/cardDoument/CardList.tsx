import { CardRegistro, registrosEjemplo } from "./CardRegistro"


interface CardRegistroProps {
    handleVer?: (id: number) => void
    handleEditar?: (id: number) => void
    handleBorrar?: (id: number) => void
}

export const CardList = ({ handleVer, handleEditar, handleBorrar }: CardRegistroProps) => {
    return (
        <>
         {
            registrosEjemplo.map((registro) => (
                <CardRegistro
                    key={registro.id}
                    registro={registro}
                    onVer={handleVer}
                    onEditar={handleEditar}
                    onBorrar={handleBorrar}
                />
            ))
        }
        </>
       
    )
}
