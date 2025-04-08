import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../styles/layouts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function Pulpit() {
    const [data, setData] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:4441/api/v1/get_przychod')
            .then((response) => {
                const groupedData = response.data.reduce((acc, item) => {
                    const date = new Date(item.data).toISOString().split('T')[0];
                    if (!acc[date]) {
                        acc[date] = { date, value: 0 }; 
                    }
                    acc[date].value += item.ilość; 
                    return acc;
                }, {});
                const formattedData = Object.values(groupedData).sort((a, b) => new Date(a.date) - new Date(b.date));
                setData(formattedData);
            })
            .catch((error) => console.error('Błąd podczas pobierania danych:', error));
    }, []);

    return (
        <PulpitStyled>
            <InnerLayout>
                <h1>Pulpit</h1>
                
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#694242" strokeWidth={2} dot={{ r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Wyświetlanie przychodów */}
                <div className="przychody-lista">
                    <h2>Lista przychodów:</h2>
                    {data.length > 0 ? (
                        <ul>
                            {data.map((item, index) => (
                                <li key={index}>
                                    <strong>{item.tytul}</strong>: {item.value} zł (Data: {item.date})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Brak przychodów do wyświetlenia.</p>
                    )}
                </div>
            </InnerLayout>
        </PulpitStyled>
    );
}

const PulpitStyled = styled.div`
    .chart-container {
        background-color: #FFFFFF;
        border: 1px solid #DDD;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-top: 1rem;
    }

    .przychody-lista {
        margin-top: 2rem;
        background-color: #FFFFFF;
        border: 1px solid #DDD;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        ul {
            list-style-type: none;
            padding: 0;
        }

        li {
            margin-bottom: 0.5rem;
        }
    }
`;

export default Pulpit;