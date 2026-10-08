import style from './contador.module.css'
import { useState } from "react"

function Index() {

    const [numero, setNumero] = useState(0)

    return(
        <>
            <h>CONTADOR</h>
            <h3>{numero}</h3>
            <button onClick={() => setNumero(numero + 1)} className={style.botao}>+</button>
            <button onClick={() => setNumero(numero - 1)} className={style.botao}>-</button>
        </>
    )
}

export default Index;