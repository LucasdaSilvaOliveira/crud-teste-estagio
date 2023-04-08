import styles from '../styles/cadastrados.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Cadastrados() {

    const [users, setUsers] = useState([])
    const [formEdit, setFormEdit] = useState(false)

    useEffect(() => {
        fetch('http://localhost:3001/cadastrados').then(resp => resp.json())
            .then(data => {
                console.log(data)
                setUsers(data)
            })
    }, [])

    const router = useRouter()

    function voltarCadastro() {
        router.push('/')
    }

    function deletar(id) {
        fetch(`http://localhost:3001/deletar/${id}`, {
            method: 'DELETE'
        })
        window.location.reload();
    }

    function showFormEdit(id) {
        setFormEdit(!formEdit)
    }

    function atualizar(id) {

        if(document.getElementById(`${id}`).value.length == 0) {
            window.alert('Coloque um novo nome!')
            return
        }

        fetch(`http://localhost:3001/atualizar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: document.getElementById(`${id}`).value })
        })

        window.location.reload();

    }


    return (
        <div className={styles.main}>
            <button onClick={voltarCadastro}>Cadastrar novamente</button>
            <button onClick={showFormEdit}>Editar</button>
            <div className={styles.cadastrados_container}>
                {users.length == 0 && (
                    <div>Não há cadastrados!</div>
                )}
                {users.length > 0 && (
                    users.map((user) => {
                        return (<div>
                            <h1>{user.nome}</h1>
                            <p>{user.email}</p>
                            {formEdit && (
                                <>
                                    <label htmlFor="novoNome">Novo nome</label>
                                    <input type="text" name='nome' id={`${user.id}`} />
                                    <button onClick={() => atualizar(user.id)}>Atualizar</button>
                                </>
                            )}
                            <button onClick={() => deletar(user.id)}>Deletar</button>
                        </div>)
                    })
                )}

            </div>

        </div>
    )
}