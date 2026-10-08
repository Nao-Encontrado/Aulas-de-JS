import styles from './button.module.css'

function Index({label, type, action}) { 
    return (
        <p onClick={action} className={`${styles.buttons} ${styles[type]}` }>
            {label}
        </p>
    )
}

export default Index;