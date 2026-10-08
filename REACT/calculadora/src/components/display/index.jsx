import style from './display.module.css'

export default function Index({value}) {
    return (
        <div className={style.display}>
            <p>{value}</p>
        </div>
    )
}