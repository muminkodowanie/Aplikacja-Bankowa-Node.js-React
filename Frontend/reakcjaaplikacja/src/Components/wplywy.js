import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../styles/layouts';
import axios from 'axios';

function Wplywy() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4441/api/v1/get_wydatek')
            .then((response) => {
                const formattedData = response.data.map((item) => ({
                    date: new Date(item.data).toLocaleDateString('pl-PL'),
                    value: item.ilość,
                    tytul: item.Tytuł,
                }));
                console.log('Sformatowane dane:', formattedData);
                setData(formattedData);
            })
            .catch((error) => console.error('Błąd podczas pobierania danych:', error));
    }, []);

    return (
        <WydatkiStyled>
            <InnerLayout>
                <div className="wydatki-lista">
                    <h2>Lista wydatków:</h2>
                    {data.length > 0 ? (
                        <div className="wydatki-container">
                            {data.map((item, index) => (
                                <div key={index} className="wydatek-item">
                                    <strong>{item.tytul}</strong>{item.value} zł
                                    <p>{item.date}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Brak wydatków do wyświetlenia.</p>
                    )}
                </div>
            </InnerLayout>
        </WydatkiStyled>
    );
}

const WydatkiStyled = styled.div`
    margin-top: -2rem;
    h2 {
        color:rgb(219, 113, 113);}

    .wydatki-lista {
        background-color: #FFFFFF;
        border: 1px solid #DDD;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        .wydatki-container {
            margin-top: 1rem;
            display: flex;
            flex-direction: column; 
            gap: 1rem; 
        }

        .wydatek-item {
            background-color: #F9F9F9;
            border: 1px solid #DDD;
            border-radius: 8px;
            padding: 1rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            color:rgb(236, 135, 135); 

            strong {
                font-size: 1.2rem;
                color: #694242;
            }


            p {
                margin: 0;
                font-size: 0.9rem;
                color: #555;
            }
        }
    }
`;

export default Wplywy;