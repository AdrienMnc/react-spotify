import logo from "./logo.svg";
import "./App.css";
import "bootsrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Chercher un artiste"
            type="input"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                console.log("Enter was pressed");
              }
            }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </InputGroup>
      </Container>
    </div>
  );
}

export default App;
