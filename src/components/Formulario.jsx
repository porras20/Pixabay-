import { useState } from "react"
import { Error } from "./Error";

export const Formulario = ({setBusqueda}) =>{

    const [termino, setTermino] = useState('');
    const [error, setError] = useState(false);

    const buscarImagenes = (e) =>{
        e.preventDefault();

        //Validar
        if (termino.trim() === '') {
            setError(true);
            return;
        }
        setError(false);
        //enviar el termino de busqueda hacia el componente principal
        setBusqueda(termino)
    }

    return(
            <form 
                onSubmit={buscarImagenes}>
                <div className="row">
                    <div className="form-group col-md-8">
                        <input 
                            type="text" 
                            className="form-control form-control-lg"
                            placeholder="Busca una imagen, ej: futbol"
                            onChange={e => {setTermino(e.target.value)}}
                            />
                    </div>
                    <div className="form-group col-md-4">
                        <input 
                            type="submit" 
                            className="btn btn-lg btn-danger btn-block"
                            />
                    </div>
                </div>
                {error ? <Error mensaje="Ingresa un término de busqueda valido"/> : null}
            </form>
        )
}