import React, { useState } from "react";
import styles from "./createuser.module.css";
import Api from "../../../services/api"

function CreateUser() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');





    return (
        <div className={styles.container}>

            {/* ESCRITAS JAPONESAS DO FUNDO */}

            <span className={`${styles.japanese} ${styles.japaneseOne}`}>
                アニメ
            </span>

            <span className={`${styles.japanese} ${styles.japaneseTwo}`}>
                日本
            </span>

            <span className={`${styles.japanese} ${styles.japaneseThree}`}>
                物語
            </span>


            {/* CARD DE CADASTRO */}

            <div className={styles.createUserBox}>

                {/* TÍTULO */}

                <div className={styles.titleContainer}>

                    <div className={styles.redCircle}></div>

                    <h1 className={styles.title}>
                        CADASTRO
                    </h1>

                </div>


                <p className={styles.subtitle}>
                    Crie sua conta
                </p>


                {/* FORMULÁRIO */}

                <form className={styles.form}>

                    {/* NOME COMPLETO */}

                    <label className={styles.label}>
                        Nome completo
                    </label>

                    <input
                        type="text"
                        placeholder="Digite seu nome completo"
                        className={styles.input}
                        value = {name}
                        onChange={(e) => {setName (e.target.value)}}

                    />


                    {/* CPF E DATA DE NASCIMENTO */}

                    <div className={styles.row}>

                        <div className={styles.field}>

                            <label className={styles.label}>
                                CPF
                            </label>

                            <input
                                type="text"
                                placeholder="000.000.000-00"
                                className={styles.input}
                                value = {cpf}
                                onChange={(e) => {setCPF (e.target.value)}}
                            />

                        </div>


                        <div className={styles.field}>

                            <label className={styles.label}>
                                Data de nascimento
                            </label>

                            <input
                                type="date"
                                className={styles.input}
                            />

                        </div>

                    </div>


                    {/* E-MAIL */}

                    <label className={styles.label}>
                        E-mail
                    </label>

                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        className={styles.input}
                    />


                    {/* TELEFONE */}

                    <label className={styles.label}>
                        Telefone
                    </label>

                    <input
                        type="tel"
                        placeholder="(00) 00000-0000"
                        className={styles.input}
                    />


                    {/* SENHA E CONFIRMAR SENHA */}

                    <div className={styles.row}>

                        <div className={styles.field}>

                            <label className={styles.label}>
                                Senha
                            </label>

                            <input
                                type="password"
                                placeholder="Digite sua senha"
                                className={styles.input}
                            />

                        </div>


                        <div className={styles.field}>

                            <label className={styles.label}>
                                Confirmar senha
                            </label>

                            <input
                                type="password"
                                placeholder="Confirme sua senha"
                                className={styles.input}
                            />

                        </div>

                    </div>


                    {/* BOTÃO */}

                    <button
                        type="submit"
                        className={styles.button}
                    >
                        Cadastrar
                    </button>

                </form>


                {/* LINK PARA LOGIN */}

                <p className={styles.login}>
                    Já possui uma conta?{" "}
                    <a href="/login">
                        Faça login
                    </a>
                </p>

            </div>

        </div>
    );
}

export default CreateUser;