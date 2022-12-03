import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";

const CLIENT_ID = "85968f2456d94dabbea2c158a400eb8d";
const CLIENT_SECRET = "44266b0d0d6a44f2a6c64452fad76d96";

function App() {
  const [search, setSearch] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    let authOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };

    fetch("https://accounts.spotify.com/api/token", authOptions)
      .then((response) => response.json())
      .then((data) => {
        setAccessToken(data.access_token);
      });
  }, []);

  async function searchArtist() {
    let searchParams = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    let artistID = await fetch(
      `https://api.spotify.com/v1/search?q=${search}&type=artist`,
      searchParams
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    let albumsParams = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=FR&limit=50`,
      searchParams
    )
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data.items);
      });
  }

  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Chercher un artiste"
            type="input"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchArtist();
              }
            }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button onClick={() => searchArtist()}>Chercher</Button>
        </InputGroup>
      </Container>

      <Container>
        <Row className="mx-2 row row-cols-4">
          {albums.map((album) => (
            <Card>
              <Card.Img variant="top" src={album.images[0].url} />
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
