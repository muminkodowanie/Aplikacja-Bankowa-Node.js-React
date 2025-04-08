import React from 'react';
import styled from 'styled-components';
import { menuItems } from '../../utilities/menuItems';
import { menuItems2 } from '../../utilities/menuItems';

function Navigation({active, setActive}) { //jezeli tutaj nie dam {} to nie bedzie zmienialo sie active
    
    return (

            <NawigacjaStyled>
                {/* <div className="user">
                    <h2 className="username">John Doe</h2>


                </div> */}
                <div className="Elementy_Menu">Menu</div>

                <ul className="menu">
             {menuItems.map((item) => (
                 <li
                     key={item.id}
                     onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active' : ''}
                 >
                      {item.icon}
                     <span>{item.title}</span>
                    </li>
                    ))}    
                </ul>

                <div className="Historia_Operacji">Historia</div>

                    <ul className="menu">
                        {menuItems2.map((item)=>(
                            <li
                                key={item.id}
                                onClick={() => setActive(item.id)}
                                className={active === item.id ? 'active' : ''}
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </li>
                        ))}

                    </ul>
                


            </NawigacjaStyled>


    )
}

const NawigacjaStyled = styled.div`
    display: flex; //flexuje menu
    flex-direction: column; 
    justify-content: flex-start; 
    align-items: flex-start; 
    padding: 1.5rem 0; //odstepy wewnetrzne od kontenreta
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 13%; 
    height: calc(100vh - 7%); //rozciaga na dol
    position: fixed; //popzycja  zafixowana
    top: 7%;
    left: 0;
    z-index: 500; //z-index zeby nie zaslanialo innych elementow


    .Elementy_Menu {
        margin-bottom: 1rem; // Dodaj odstęp poniżej 
        font-size: 1.2rem;
        font-weight: bold;
        color: #482E2E;
        padding: 0 2rem; // Dodaj odstęp po bokach
        
    }

    .menu {
        list-style: none; // Usuń kropki z listy 
        padding: 0;
        margin: 0;
        width: 100%; // Ustaw szerokość na 100%
    }

    .menu li {
        display: grid;
        grid-template-columns: 40px auto;
        align-items: center;
        cursor: pointer; 
        transition: background-color 0.3s ease; // Dodaj efekt przejścia
        gap: 10px; /* Odstęp między ikoną a tekstem */
        padding: 10px 2rem;
        color: #694242;
        width: 100%;
        position: relative; //to naprawilo wysweitklanie actiove
    }

    .menu img {
        width: 24px; /* Ustaw szerokość ikony */
        height: 24px; /* Ustaw wysokość ikony */
    }
    .Historia_Operacji {
        margin-top: 1rem;
        color: #694242;
        padding: 0 2rem;
        
    }

 .active {
    color: rgb(169, 230, 4); // Zmiana koloru tekstu na ciemniejszy odcień
    i {
        color: rgb(169, 230, 4); // Zmiana koloru ikony na ciemniejszy odcień
    }
    &:before {
        content: '';
        position: absolute;
        left: 5%;
        top: 50%;
        transform: translateY(-50%);
        width: 5px; // Szerokość linii
        height: 70%; // Wysokość linii
        background-color:rgb(117, 67, 67); // Kolor linii
    }
}
`;

export default Navigation;
export {NawigacjaStyled};