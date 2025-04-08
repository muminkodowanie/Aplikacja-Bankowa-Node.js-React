import React from 'react';
import styled from 'styled-components';

function Okno({ children }) {
    return <OknoStyled>{children}</OknoStyled>;
}

const OknoStyled = styled.div`
    background-color: #F5EBEB; 
    width: calc(100% - 13%);
    height: calc(100vh - 7%); 
    margin-left: 13%; 
    margin-top: 7%; 
    padding: 2rem; 
    overflow-y: auto; 
`;

export default Okno;