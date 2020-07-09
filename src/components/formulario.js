import React,{Fragment,useState} from "react";
import {v4 as uuid} from 'uuid'
import PropTypes from 'prop-types'

const  Formulario= ({crearCita}) => {
    //Crear state citas
    const [cita,actualizarCita]= useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });
    const [error,actualizarError] = useState(false)
    //Funcion que se ejecuta cada que el usuario escribe un un input
    const actualizarState= e =>{
        actualizarCita({
            ...cita,
            [e.target.name]:e.target.value
        })
    }
    const {mascota,propietario,fecha,hora,sintomas}=cita;

    //cuando el usuario presione enviar
    const submitCita= e => {
        e.preventDefault();
        //validar
        if (mascota.trim()==='' ||propietario.trim()==='' ||fecha.trim()==='' ||hora.trim()==='' ||sintomas.trim()==='' ){
            actualizarError(true);
            return;
        }
        // eliminar mensjaje previo
        actualizarError(false);

        //asignar id
        cita.id=uuid();
        console.log(cita)
        // crear cita
        crearCita(cita);
        //reiniciar form
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }



    return(
        <Fragment>
            <h2> Crear cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> :null}
            <form
                onSubmit={submitCita}
            >
                <label>Nombre mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueno</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueno de la Mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha </label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>hora </label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Sintomas</label>
                <textarea
    className="u-full-width"
    name="sintomas"
    onChange={actualizarState}
    value={sintomas}
    />
                <button
                type="Submit"
                className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
    );
}

Formulario.propTypes={
    crearCita: PropTypes.func.isRequired
}

export default Formulario;