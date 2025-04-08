import styled from 'styled-components';
import React from 'react';
import {MainLayout} from './styles/layouts';
import Navigation from './Components/Navigation/navigation';
import Navitop from './Components/Navigation/navitop';
import Pulpit from './Components/pulpit';
import Wydatki from './Components/wydatki';
import Okno from './Components/okno';
import Przychody from './Components/przychody';
import Wplywy from './Components/wplywy';


function App() {
  const [active,setActive] = React.useState(1);
  const wyswietDane =() => {


    
    switch(active){
    case 1:
      return <Pulpit/>

    case 2:
      return <Przychody/>

    case 3:
      return <Przychody/>
    
    case 4:
      return <Wydatki/>

    case 5:
      return <Przychody/>

    case 6:
      return <Wplywy/>


    default:
      return <Pulpit/>
    }


  }


  return (
    <AppStyled className="App">
      <MainLayout>
        <Navitop/>
        
        <Navigation  active = {active} setActive={setActive}/>
        <Okno>
        {wyswietDane()} 
        </Okno>
         
      </MainLayout>
    </AppStyled>
  );
}


const AppStyled = styled.div`
  height: 100vh;
  background-color: #F5EBEB;
  main {
    marin-top: 10%;

    width: 100%;
    height: 100%;
    background-color: #F5EBEB;
    overflow-y: auto;
    left: 13%;
  }
`;
export default App;
