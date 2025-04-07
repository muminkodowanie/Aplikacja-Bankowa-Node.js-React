

import React from 'react';
import styled from 'styled-components';

function Navitop() {
    return (
        <NavitopStyled>

            <h1>muminkodowanie</h1>
            <div className="zprawejNavitop">
            <h2>...</h2>
            <h3>Dodaj wpływ</h3>
            <h4>Uzytkownika</h4>
            </div>

        </NavitopStyled>

      
    )
}



const NavitopStyled = styled.div`
    display: flex;
    flex-direction: row; //elementy rozstawiaja sie po bokach 
    justify-content: space-between;  //rozkjlada elelemnty rownomiernie
    align-items: center;     //wyronwuje lelemnnty w pione w centrum
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
        display:flex;
        flex-direction: row;
        justify-content:space-between;
        align-items: center;
        right: 0;

`;

export default Navitop;

export { NavitopStyled };