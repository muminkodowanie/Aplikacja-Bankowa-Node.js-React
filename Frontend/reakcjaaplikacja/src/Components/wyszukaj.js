import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/layouts";


function Wyszukiwanie () {
    //const [operacje,ustawOperacje] = useState([]);
    return (
    
        

    
        <WyszukiwanieStyled>
            <InnerLayout>
                <p>Testowik</p>
                <div className= "DashboardKontener">

                    <div className="sekcjaWyszukiwania">
                        <h1>Wyszukiwanie</h1>

                        <table className="TabelaWyszukiwania">
                            <thead>
                                <tr>
                                    <th>Tytuł</th>
                                    <th>Kategoria</th>
                                    <th>Typ</th>
                                    <th>Kwota</th>
                                    <th>Data</th>
                                    <th>Opis</th>

                                </tr>
                            </thead>
                            <tbody>



                            </tbody>




                        </table>
                    </div>





                </div>







            </InnerLayout>


        </WyszukiwanieStyled>



    )





}



const WyszukiwanieStyled = styled.div`


.DashboardKontener {
display: flex;
flex-direction: column;
padding: 2rem;



}
 .sekcjaWyszukiwania {
    background: white;
    padding: 2.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    

}
.TabelaWyszukiwania {
    width:100%;
    align-items: center;
    justify-content: center;



`;


export default Wyszukiwanie;