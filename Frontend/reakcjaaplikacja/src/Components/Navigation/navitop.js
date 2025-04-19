import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function Navitop() {
    const [menuWidoczne, setMenuVisible] = useState(false);
    const [modalWidoczny, ustawModalWidoczny] = useState(false);
    const [typOperacji, ustawTypOperacji] = useState(null);
    const [daneFormularza, ustawDaneFormularza] = useState({
        Tytuł: '',
        ilość: '',
        data: '',
        Kategoria: '',
        Opis: ''
    });

    const wysuwaneMenu = () => setMenuVisible(!menuWidoczne);
    const wyloguj = () => console.log("Wylogowano");
    const otworzModal = () => ustawModalWidoczny(true);
    const zamknijModal = () => {
        ustawModalWidoczny(false);
        ustawTypOperacji(null);
        ustawDaneFormularza({
            Tytuł: '',
            ilość: '',
            data: '',
            Kategoria: '',
            Opis: ''
        });
    };

    const obsluzZmianeInputu = (e) => {
        const { name, value } = e.target;
        ustawDaneFormularza({ ...daneFormularza, [name]: value });
    };

    const dodajOperacje = async () => {
        try {
            const endpoint = typOperacji === 'wydatek' ? '/api/v1/wydatek' : '/api/v1/przychod';
            await axios.post(endpoint, daneFormularza);
            console.log(`Dodano operację: ${typOperacji}`);
            zamknijModal();
        } catch (error) {
            console.error('Błąd podczas dodawania operacji:', error);
        }
    };

    return (
        <NavitopStyled>
            <h1>muminkodowanie</h1>
            <div className="zprawejNavitop">
                <h3 onClick={otworzModal}>Dodaj operację</h3>
                <div className="konto-menu">
                    <h4 onClick={wysuwaneMenu}>Moje konto</h4>
                    {menuWidoczne && (
                        <div className="dropdown-menu">
                            <button onClick={wyloguj}>Wyloguj</button>
                        </div>
                    )}
                </div>
            </div>

            {modalWidoczny && (
                <div className="modal">
                    <div className="modal-content">
                        {!typOperacji ? (
                            <>
                                <h2>Wybierz typ operacji</h2>
                                <button onClick={() => ustawTypOperacji('wydatek')}>Wydatek</button>
                                <button onClick={() => ustawTypOperacji('przychod')}>Wpływ</button>
                                <button onClick={zamknijModal}>Anuluj</button>
                            </>
                        ) : (
                            <>
                                <h2>Dodaj {typOperacji === 'wydatek' ? 'wydatek' : 'wpływ'}</h2>
                                <form>
                                    <input
                                        type="text"
                                        name="Tytuł"
                                        placeholder="Tytuł"
                                        value={daneFormularza.Tytuł}
                                        onChange={obsluzZmianeInputu}
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="ilość"
                                        placeholder="Kwota"
                                        value={daneFormularza.ilość}
                                        onChange={obsluzZmianeInputu}
                                        required
                                    />
                                    <input
                                        type="date"
                                        name="data"
                                        value={daneFormularza.data}
                                        onChange={obsluzZmianeInputu}
                                        required
                                    />
                                    <select
                                        name="Kategoria"
                                        value={daneFormularza.Kategoria}
                                        onChange={obsluzZmianeInputu}
                                        required
                                    >
                                        <option value="">Wybierz kategorię</option>
                                        <option value="Jedzenie">Jedzenie</option>
                                        <option value="Transport">Transport</option>
                                        <option value="Mieszkanie">Mieszkanie</option>
                                        <option value="Rozrywka">Rozrywka</option>
                                        <option value="Inne">Inne</option>
                                    </select>
                                    <textarea
                                        name="Opis"
                                        placeholder="Opis"
                                        value={daneFormularza.Opis}
                                        onChange={obsluzZmianeInputu}
                                    />
                                    <button type="button" onClick={dodajOperacje}>
                                        Dodaj
                                    </button>
                                    <button type="button" onClick={zamknijModal}>
                                        Anuluj
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </NavitopStyled>
    );
}

const NavitopStyled = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 7%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;

    h1 {
        font-size: 1.5rem;
        color: #694242;
    }

    .zprawejNavitop {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 2.5rem;

        h3 {
            font-size: 1rem;
            color: #FFFFFF;
            cursor: pointer;
            background-color: #FFB7BA;
            border-radius: 8px;
            padding: 0.5rem 1rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s ease;

            &:hover {
                background-color: #FF9AA2;
            }
        }

        .konto-menu {
            position: relative;

            h4 {
                font-size: 1rem;
                color: #694242;
                cursor: pointer;
            }

            .dropdown-menu {
                position: absolute;
                top: 100%;
                right: 0;
                background-color: white;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                padding: 0.5rem;
                z-index: 10;

                button {
                    background: none;
                    border: none;
                    color: #694242;
                    font-size: 1rem;
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    text-align: left;
                    width: 100%;

                    &:hover {
                        background-color: #f5ebeb;
                    }
                }
            }
        }
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;

        .modal-content {
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;

            h2 {
                margin-bottom: 1rem;
            }

            button {
                margin: 0.5rem;
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                background-color: #FFB7BA;
                color: white;
                font-size: 1rem;

                &:hover {
                    background-color: #FF9AA2;
                }
            }

            form {
                display: flex;
                flex-direction: column;
                gap: 1rem;

                input, select, textarea {
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    font-size: 1rem;
                }

                button {
                    margin-top: 1rem;
                }
            }
        }
    }
`;

export default Navitop;