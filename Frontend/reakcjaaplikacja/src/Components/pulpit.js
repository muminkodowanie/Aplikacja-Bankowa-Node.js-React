import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../styles/layouts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function Pulpit() {
    const [budzetDane, ustawBudzetDane] = useState([]);
    const [miesieczneWydatki, ustawMiesieczneWydatki] = useState(0);
    const [miesiecznePrzychody, ustawMiesiecznePrzychody] = useState(0);
    const [operacje, ustawOperacje] = useState([]);

    useEffect(() => {
        const pobierzWydatki = axios.get('http://localhost:4441/api/v1/get_wydatek');
        const pobierzPrzychody = axios.get('http://localhost:4441/api/v1/get_przychod');

        Promise.all([pobierzWydatki, pobierzPrzychody])
            .then(([odpowiedzWydatki, odpowiedzPrzychody]) => {
                const wydatki = odpowiedzWydatki.data;
                const przychody = odpowiedzPrzychody.data;

                console.log('Otrzymane wydatki:', wydatki);
                console.log('Otrzymane przychody:', przychody);

                const dziennyBudzet = {};
                const obecnaData = new Date();
                const obecnyMiesiac = obecnaData.getMonth();
                const obecnyRok = obecnaData.getFullYear();

                let sumaMiesiecznychWydatkow = 0;
                let sumaMiesiecznychPrzychodow = 0;

                wydatki.forEach(wydatek => {
                    const data = new Date(wydatek.data);
                    const dataStr = data.toISOString().split('T')[0];
                    const kwota = parseFloat(wydatek.ilość) || 0;
                    
                    if (!dziennyBudzet[dataStr]) {
                        dziennyBudzet[dataStr] = { data: dataStr, wartosc: 0 };
                    }
                    dziennyBudzet[dataStr].wartosc -= kwota;

                    console.log(obecnyMiesiac, obecnyRok, data.getMonth(), data.getFullYear(),"aha umpa lumpa");
                    if (data.getMonth() === obecnyMiesiac && data.getFullYear() === obecnyRok) {
                        sumaMiesiecznychWydatkow += kwota;
                    }
                });


                przychody.forEach(przychod => {
                    const data = new Date(przychod.data);
                    const dataStr = data.toISOString().split('T')[0];
                    const kwota = parseFloat(przychod.ilość) || 0;
                    
                    if (!dziennyBudzet[dataStr]) {
                        dziennyBudzet[dataStr] = { data: dataStr, wartosc: 0 };
                    }
                    dziennyBudzet[dataStr].wartosc += kwota;

                    if (data.getMonth() === obecnyMiesiac && data.getFullYear() === obecnyRok) {
                        sumaMiesiecznychPrzychodow += kwota;
                    }
                });

                console.log('Suma wydatków w tym miesiącu:', sumaMiesiecznychWydatkow);
                console.log('Suma przychodów w tym miesiącu:', sumaMiesiecznychPrzychodow);

                const wszystkieOperacje = [
                    ...wydatki.map(w => ({ 
                        ...w, 
                        typ: 'wydatek', 
                        wartosc: -parseFloat(w.ilość) || 0 
                    })),
                    ...przychody.map(p => ({ 
                        ...p, 
                        typ: 'przychód', 
                        wartosc: parseFloat(p.ilość) || 0 
                    }))
                ].sort((a, b) => new Date(b.data) - new Date(a.data));

                const sformatowaneBudzetDane = Object.values(dziennyBudzet)
                    .sort((a, b) => new Date(a.data) - new Date(b.data));

                ustawBudzetDane(sformatowaneBudzetDane);
                ustawMiesieczneWydatki(sumaMiesiecznychWydatkow);
                ustawMiesiecznePrzychody(sumaMiesiecznychPrzychodow);
                ustawOperacje(wszystkieOperacje.slice(0, 7));
            })
            .catch((error) => {
                console.error('Błąd podczas pobierania danych:', error);
                console.error('Szczegóły błędu:', error.response);
            });
    }, []);

    return (
        <PulpitStyled>
            <InnerLayout>
                <div className="DashboardKontener">
                    <div className="sekcjaWykresu">
                        <h2>Wykres budżetu</h2>
                        <div>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={budzetDane}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis 
                                        dataKey="data" 
                                        tick={{ fontSize: 12, fill: '#694242' }}
                                        tickLine={false}
                                    />
                                    <YAxis 
                                        tick={{ fontSize: 12, fill: '#694242' }}
                                        tickLine={false}
                                    />
                                    <Tooltip />
                                    <Line 
                                        type="monotone" 
                                        dataKey="wartosc" 
                                        stroke="#694242" 
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="summary-section">
                        <div className="summary-box expenses">
                            <h3>Wydatki</h3>
                            <p className="amount">{miesieczneWydatki.toFixed(2)} zł</p>
                            <p className="subtitle">w tym miesiącu</p>
                        </div>
                        <div className="summary-box income">
                            <h3>Przychody</h3>
                            <p className="amount">{miesiecznePrzychody.toFixed(2)} zł</p>
                            <p className="subtitle">w tym miesiącu</p>
                        </div>
                        <div className="summary-box savings">
                            <h3>Oszczędności</h3>
                            <p className="amount">{(miesiecznePrzychody + miesieczneWydatki).toFixed(2)} zł</p>
                            <p className="subtitle">w tym miesiącu</p>
                        </div>
                    </div>

                    <div className="operations-section">
                        <h2>Ostatnie operacje</h2>
                        <div className="operations-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tytuł</th>
                                        <th>Kategoria</th>
                                        <th>Kwota</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {operacje.map((operacja, index) => (
                                        <tr key={index} className={operacja.typ}>
                                            <td>{operacja.Tytuł}</td>
                                            <td>{operacja.Kategoria}</td>
                                            <td className = {operacja.typ === "wydatek" ? "mniejniz0" : "wiecejniz0"}> {operacja.wartosc} zł </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </PulpitStyled>
    );
}



const PulpitStyled = styled.div`
    .DashboardKontener {
        margin-top: -4rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .sekcjaWykresu {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        h2 {
            color: #694242;
            margin-bottom: 1rem;
        }
    }

    .summary-section {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }

    .summary-box {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        text-align: center;

        h3 {
            color: #694242;
            margin-bottom: 0.5rem;
        }

        .amount {
            font-size: 1.8rem;
            font-weight: bold;
            margin: 0.5rem 0;
        }

        .subtitle {
            color: #666;
            font-size: 0.9rem;
        }

        &.expenses .amount {
            color: #ff7675;
        }

        &.income .amount {
            color: #00b894;
        }

        &.savings .amount {
            color: #0984e3;
        }
    }

    .operations-section {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        h2 {
            color: #694242;
            margin-bottom: 1rem;
        }

        .operations-table {
            overflow-x: auto;

            table {
                width: 100%;
                border-collapse: collapse;

                th, td {
                    padding: 1rem;
                    text-align: left;
                    border-bottom: 1px solid #eee;
                }

                th {
                    color: #694242;
                    font-weight: 600;
                }

                td {
                    color: #666;

                    &.mniejniz0 {
                        color: #ff7675;
                    }

                    &.wiecejniz0 {
                        color: #00b894;
                    }
                }

                tr:hover {
                    background-color: #f8f9fa;
                }
            }
        }
    }
`;

export default Pulpit;