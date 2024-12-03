# Rock Paper Scissors Frontend

This is the React-based frontend for a multiplayer Rock Paper Scissors game. It allows players to create or join game rooms, play the game, and see the results of each round.

## 🚀 Features

- **Room Management**: Create or join rooms using unique room codes.
- **Player Identification**: Players are assigned unique names upon connecting.
- **Gameplay**: Choose between Rock, Paper, or Scissors to play against opponents in real-time.
- **Game Results**: Displays the winner of each round or declares a tie.
- **Dynamic UI**: Updates game state and player lists in real-time.

---

## 🛠️ Technologies Used

- **React.js**: For building the user interface.
- **Socket.IO**: For real-time communication with the backend server.
- **CSS**: For styling the application.

---

## 🔧 Prerequisites

- **Node.js** (v14+ recommended)
- A running backend server (Socket.IO endpoint) at `http://localhost:4000`.

---

## 📦 Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd rock-paper-scissors-frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Application**:

   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`.

---

## 🖥️ Usage

1. **Create a Room**:
   - Click the **"Create Room"** button to generate a unique room code.
   - Share the room code with a friend.

2. **Join a Room**:
   - Enter a valid room code and click **"Join Room"**.

3. **Play the Game**:
   - Select "Rock", "Paper", or "Scissors" during the game phase.
   - View the result after all players have made their moves.

4. **Leave the Room**:
   - Click **"Leave Room"** to exit the room.

---

## 📂 Project Structure

```plaintext
src/
├── App.js             # Main application component
├── App.css            # Styling for the app
└── index.js           # Entry point for the React app
```

---

## 🛠️ Environment Variables

You can customize the backend URL by setting an environment variable in a `.env` file:

```env
REACT_APP_SOCKET_URL=http://localhost:4000
```

Use `process.env.REACT_APP_SOCKET_URL` in your code instead of hardcoding the URL.

---

## 📝 Future Enhancements

- Add animations for game results.
- Display player avatars.
- Support for multiple simultaneous games in a single room.
- A scoreboard to track overall wins and losses.

---

## 📧 Contact

For any inquiries or feedback, please contact [Loki] at [lokekumyew@gmail.com].

---
