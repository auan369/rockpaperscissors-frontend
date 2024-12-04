import './App.css';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL; // Backend URL

//async function to ping server
async function pingServer() {
  try {
    const response = await axios.get(SOCKET_URL);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}


function App() {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [inRoom, setInRoom] = useState(false);
  const [move, setMove] = useState("");
  const [gameState, setGameState] = useState({});
  const [socket, setSocket] = useState(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    //Ping server to wake it up
    // axios.get(SOCKET_URL);
    pingServer();
    // Connect to the WebSocket server
    const socket = io(SOCKET_URL);
    setSocket(socket);

    // Handle connection event
    socket.on('connect', () => {
        console.log('Connected to server', socket.id);
    });

    // Clean up on unmount
    return () => {
        socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // Handle events from the server
      socket.on('name', (name) => {
        setName(name);
        console.log(name);
      });
  
      socket.on('joined-room', (room) => {
        console.log('Joined room: ' + room);
        setInRoom(true);
        setRoomCode(room);
      });
  
      socket.on("failed-join", (msg) => {
        alert(msg);
        setRoomCode('');
      });

      socket.on("game-start", (room) => {
        setGameState(room);
        setResult('');
        setMove('');
      });

      socket.on("all-moves-made", ({room, winnerID, winnerName}) => {
        setGameState(room);
        console.log('All moves made, winner is: ' + winnerID + ' ' + winnerName);
        if (winnerID === socket.id) {
          setResult('You won!');
        }
        else if (winnerID === '') {
          setResult('It\'s a tie!');
        }
        else
        setResult('Winner is: ' + winnerName);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });
      return () => {
        socket.off('name');
        socket.off('joined-room');
        socket.off('failed-join');
        socket.off('game-start');
        socket.off('all-moves-made');
        socket.off('disconnect');
      };
    }
  },[socket]);

  const createRoom = () => {
    console.log('Creating room');
    // const socket = io(SOCKET_URL);
    socket.emit('make-new-room');
  };

  const joinRoom = () => {
    if (roomCode.length !== 4 || /[^0-9 ^A-z]/.test(roomCode)) {
      alert('Please enter a valid room code');
      setRoomCode('');
    } else {
      console.log('Joining room');
      socket.emit('join-room', roomCode);
    }
  };
  const leaveRoom = () => {
    console.log('Leaving room');
    socket.emit('leave-room', roomCode);
    setInRoom(false);
    setRoomCode('');
    setMove('');
    setResult('');
    setGameState({});
  }

  const sendMove = (move, roomCode) => {
    setMove(move);
    socket.emit('make-move', {move:move, roomCode:roomCode});
    console.log('Sent message: ' + move + ' in room ' + roomCode);
  }

  const playAgain = (roomCode) => {
    socket.emit('play-again', roomCode);
    setResult('');
    setMove('');
  }

  return (
    <div className="App">
      {/* Header Bar */}
      <header className="App-header-bar">
        <div className="header-content">
          <div className="room-info">
            <p>Room: </p><p><strong>{roomCode  || 'Not joined'}</strong></p>
          </div>
          <div className="player-info">
            <p>Player: </p><p><strong>{name || 'Connecting...'}</strong></p>
          </div>
        </div>
      </header>

      <main className="App-main">
        <h1>Rock Paper Scissors</h1>

        {inRoom? gameState.isGameActive ? (
          <p>Game in progress...</p>
        ) : (
          <p>Waiting for players to join...</p>
        ) : (<p>Make or join a room!</p>)
        }


        {inRoom ? 
          (<div>
            <input type="button" value='Leave Room'
              onClick={leaveRoom}
            />
          </div>): 
          (<div>
          <input type="button" value='Create Room'
            onClick={createRoom}/>
          <br/>
          <input type="text" placeholder="Enter room code" value={roomCode} 
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <input type="button" value='Join Room'
            onClick={joinRoom}
          />
          </div>)
        }
        
        
        {gameState.isGameActive && (
          <div>
            <p>Playing against:&nbsp;
              {gameState.players
              .filter((player) => player.socketId !== socket.id)
              .map((player) => (
                <strong key={player.socketId}>{player.userName}</strong>
              ))}
            </p>
            <p>Make your move:</p>
            <input type="button" value='Rock' onClick={() => sendMove("rock",roomCode)}/>
            <input type="button" value='Paper' onClick={() => sendMove("paper",roomCode)}/>
            <input type="button" value='Scissors' onClick={() => sendMove("scissors",roomCode)}/>
            
          {move && (<p>Your move: {move}</p>)}
          {/* <p>{result}</p> */}
          {result && (
            <div>
              <p>{result}</p>
              <input type="button" value='Play again' onClick={() => playAgain(roomCode)}/>  
            </div>
          )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
