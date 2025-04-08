import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../styles/layouts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function Wydatki() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4441/api/v1/get_wydatek')
            .then((response) => {
                const groupedData = response.data.reduce((acc, item) => {
                    const date = new Date(item.data).toISOString().split('T')[0];
                    if (!acc[date]) {
                        acc[date] = { date, value: 0 };
                    }
                    acc[date].value += -item.ilość;
                    return acc;
                }, {});
                const formattedData = Object.values(groupedData).sort((a, b) => new Date(a.date) - new Date(b.date));
                setData(formattedData);
            })
            .catch((error) => console.error('Błąd podczas pobierania danych:', error));
    }, []);

    return (
        <WydatekStyled>
            <InnerLayout>
                <h2>Wykres wydatków:</h2>

                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="date" 
                                tick={{ fontSize: 12, fill: '#694242' }} 
                                tickLine={false} 
                                axisLine={{ stroke: '#694242' }} 
                            />
                            <YAxis 
                                tick={{ fontSize: 12, fill: '#694242' }} 
                                tickLine={false} 
                                axisLine={{ stroke: '#694242' }} 
                            />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #DDD', borderRadius: '8px' }} 
                                labelStyle={{ color: '#694242' }} 
                                itemStyle={{ color: '#694242' }} 
                            />
                            <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#694242" 
                                strokeWidth={2} 
                                dot={{ r: 5, fill: '#694242' }} 
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="wydatki-lista">
                    <h3>Wydatki lista:</h3>
                    {data.length > 0 ? (
                        <div className="wydatki-container">
                            {data.map((item, index) => (
                                <div key={index} className="wydatek-item">
                                    {item.value} zł
                                    <p>{item.date}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Brak wydatków do wyświetlenia.</p>
                    )}
                </div>
            </InnerLayout>
        </WydatekStyled>
    );
}

const WydatekStyled = styled.div`
    margin-top: -2rem;

    h2 {
    margin-top: -2rem;
    margin-bottom: 1rem;
        color: rgb(219, 113, 113);
    }

    .chart-container {
        background-color: #FFFFFF;
        border: 1px solid #DDD;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 2rem;
    }

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

    h3 {
        color: rgb(219, 113, 113);
        margin-bottom: 1rem;}

        .wydatek-item {
            background-color: #F9F9F9;
            border: 1px solid #DDD;
            border-radius: 8px;
            padding: 1rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            color: rgb(219, 113, 113);

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

export default Wydatki;