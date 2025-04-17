import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/layouts";


function Wyszukiwanie () {
    //const [operacje,ustawOperacje] = useState([]);
    return (
    
        

    
        <WyszukiwanieStyled>
            <h2>Panel Wyszukiwania</h2>
            <InnerLayout>
                
                <div className= "DashboardKontener">

                    <div className="sekcjaWyszukiwania">


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


margin-top: -2rem;

h2 {
    margin-top: -2rem;
    color: rgb(219, 113, 113);
    margin-left: 1.5rem;
    margin-bottom: -1rem;
    
   
}


.DashboardKontener {
 background-color: #FFFFFF;
        border: 1px solid #DDD;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 2rem;




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