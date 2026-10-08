import  Styles from './Login.module.css'


export default function Index() { 
    return (
        <div className={Styles.mainContainer}>
            <div className={Styles.content}>
                <div className={Styles.form}>
                    <form>
                        <div className={Styles.inputContainer}>
                            <input placeholder='Email' type="email" id="email" />
                            <input placeholder='Password' type="password" id="password" />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}