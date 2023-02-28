import { useEffect, useState } from 'react'
import { Formulario } from './components/Formulario'
import { ListadoImagenes } from './components/ListadoImagenes';

function App() {

  //State de la app
  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPagina, setTotalPagina] = useState(1);
  
  useEffect(() => {
    const consultarApi = async () =>{
      if (busqueda.trim() === '') return;
    
      const imagenesPorPagina = 30;
      const key = '34018037-379b36083c7247d131da7f397';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta =  await fetch(url);
      const resultado =  await respuesta.json();
      setImagenes(resultado.hits);

      //Calcular el total de paginas para mostrar
      setTotalPagina(Math.ceil(resultado.totalHits / imagenesPorPagina));
    }

    //Mover la pantalla hacia arriba
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({behavior: 'smooth'})
    consultarApi()
  }, [busqueda,paginaActual])
  
  //Definir la pagina anterior
  const paginaAnterior = () =>{
    const nuevaPaginaActual = paginaActual - 1;
    if (nuevaPaginaActual === 0) return
    setPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () =>{
    const nuevaPaginaActual = paginaActual + 1;
    if (nuevaPaginaActual > totalPagina) return
    setPaginaActual(nuevaPaginaActual)
  }

  return (
    <div className='container'>
      <div className='jumbotron'>
        <p className='lead text-center'>Buscador de imagenes</p>
        <Formulario 
          setBusqueda={setBusqueda}
        />
      </div>
      <div className='row justify-content-center'>
        <ListadoImagenes 
        imagenes={imagenes}
        />
        {paginaActual === 1 ? null : 
        <button
          type='button'
          className='btn btn-info mr-1'
          onClick={paginaAnterior}
          >&laquo; Anterior</button>}
        {paginaActual === totalPagina ? null :
        <button
          type='button'
          className='btn btn-info'
          onClick={paginaSiguiente}>Siguiente &raquo;</button>}
      </div>
    </div>
  )
}

export default App
