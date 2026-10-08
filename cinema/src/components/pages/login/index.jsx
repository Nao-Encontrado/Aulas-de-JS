import React from "react";
import styles from "./login.module.css";
import animeLogin from "../../../assets/animeLogin.png";

function Login() {
    return (
        <div
            className={styles.container}
            style={{ backgroundImage: `url(${animeLogin})` }}
        >
            <div className={styles.loginContainer}>
                <div className={styles.loginBox}>

                    <div className={styles.titleContainer}>
                        <div className={styles.redCircle}></div>

                        <h1 className={styles.title}>
                            LOGIN
                        </h1>
                    </div>

                    <p className={styles.subtitle}>
                        Bem-vindo de volta!
                    </p>

                    <form className={styles.form}>

                        <label className={styles.label}>
                            E-mail
                        </label>

                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                            className={styles.input}
                        />

                        <label className={styles.label}>
                            Senha
                        </label>

                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            className={styles.input}
                        />

                        <button
                            type="submit"
                            className={styles.button}
                        >
                            Entrar
                        </button>

                    </form>

                    <p className={styles.register}>
                        Não possui uma conta?{" "}
                        <a href="/cadastro">
                            Cadastre-se
                        </a>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Login;