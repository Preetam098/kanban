import React from 'react'
import Header from "./components/Header/Header";
import Board from './components/Board/Board.jsx'
import EmptyBoard from './components/Board/EmptyBoard'
import { useSelector } from "react-redux";
import './index.css'


const App = () => {
  const boards = useSelector((state) => state?.boards?.boards);
  const theme = useSelector((state) => state?.theme);  

  console.log(boards ,'boad')
  return (
    <div className="app" data-theme={theme.theme}>
      {/* Head */}
      <Header /> 
      {/* Board */}
      {boards.length > 0 ? <Board /> : <EmptyBoard />}{" "}
    </div>
  );
}

export default App
