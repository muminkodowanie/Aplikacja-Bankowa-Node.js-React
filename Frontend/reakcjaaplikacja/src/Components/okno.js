import React from 'react';
import styled from 'styled-components';

function Okno({ children }) {
    return <OknoStyled>{children}</OknoStyled>;
}

const OknoStyled = styled.div`
    background-color: #F5EBEB; /* Różowe tło */
    width: calc(100% - 13%); /* Szerokość ekranu minus szerokość menu */
    height: calc(100vh - 7%); /* Wysokość ekranu minus wysokość topbara */
    margin-left: 13%; /* Przesunięcie w prawo o szerokość menu */
    margin-top: 7%; /* Przesunięcie w dół o wysokość topbara */
    padding: 2rem; /* Odstęp wewnętrzny */
    overflow-y: auto; /* Dodaj przewijanie, jeśli zawartość jest za duża */
`;

export default Okno;