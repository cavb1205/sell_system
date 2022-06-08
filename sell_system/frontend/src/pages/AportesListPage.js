import React, { useEffect, useState } from "react";
import AporteItem from "../components/AporteItem";

const AportesListPage = () => {

    let [aportes, setAportes] = useState([])

    useEffect(() => {
        getAportes();
    },[])

    let getAportes = async () => {
        let response = await fetch('/aportes/')
        let data = await response.json();
        setAportes(data);

    }

    return (
        <div>
            <div>
                <h2>Lista de aportes</h2>
                {aportes.map((aporte, index) => (
                    <AporteItem key={index} aporte={aporte} />
                ))}
            </div>
        </div>
    );
}


export {AportesListPage};