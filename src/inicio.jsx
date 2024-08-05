import { useState } from 'react'

import Header from './components/headerblog'
import Contenido from './components/cuerpo'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'


function Inicio() {
    const [count, setCount] = useState(0)

    return (
        <>

            <div className="container-fluid">
                <div className="row">


                    <Header></Header>

                </div>


                <div className="row d-flex justify-content-center mt-5">

                    <div className="col-7">
                        <Contenido></Contenido>
                    </div>



                </div>



            </div>


        </>
    )
}

export default Inicio
