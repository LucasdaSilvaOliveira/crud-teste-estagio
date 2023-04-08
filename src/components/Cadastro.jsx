import styles from '../styles/Cadastro.module.css';
import { useRouter } from 'next/router';
import { useRef } from 'react';

export default function cadastro() {

    const nomeRef = useRef()
    const emailRef = useRef()

    const router = useRouter()

    function submit(e) {
        e.preventDefault()

        if(nomeRef.current.value.length == 0 || emailRef.current.value.length == 0) {
            window.alert('Preencha os campos!')

            return
        }

        fetch('http://localhost:3001/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nomeRef.current.value,
                email: emailRef.current.value})
        })

        router.push('/cadastrados')

    }

    function ListaUsuarios(e) {
        e.preventDefault()

        router.push('/cadastrados')

    }

    return (
        <div className={styles.cadastro_container}>
            <form action="http://localhost:3001/cadastrar" method="post">
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input ref={nomeRef} type="text" name="nome" id="nome" />
                </div>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input ref={emailRef} type="text" name="email" id="email" />
                </div>
                <button type='submit' onClick={submit}>Cadastrar</button>
                <button onClick={ListaUsuarios}>Lista dos usuários</button>
            </form>
        </div>
    )
}