import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export function MoveList(){
  const pokemonMoveList = pokemon["moves"];
  pokemonMoveList.map((moveObject) => {
    //return (<p>{moveObject["move"]["name"]}</p>
            //<p>{moveObject["move"]["url"]}</p>);
  });
}
export default function Pokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const [moveList, setMoveList] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  function GetMoves(urlPrompt) {
    //lists all moves, need to run a map .......................................
    fetch(`${urlPrompt}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json, "test");
        return json;
      });
    };
    //return (pokemon["moves"]);
  

  useEffect(() => {
    if (!router.isReady) return;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setIsloading(false);
        setPokemon(json);
        // console.log(json);
        // console.log("test", json["name"]);
      });
  }, [router.isReady]);

  return (
    <>
      {pokemon == null ? (
        <p>Blanks</p>
      ) : (
        <div className="card mx-auto" style={{ width: "50vw" }}>
          <img
            className="card-img-top"
            style={{ width: "18rem" }}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">Name: {pokemon["name"]}</h5>
            <h5 className="card-title">Weight: {pokemon["weight"]}</h5>
            <h5>Abilities:</h5>
            {(pokemon["moves"]).map((moveObject) => {
              const fetechedMoves = GetMoves(moveObject["move"]["url"]);
              console.log(fetechedMoves, "testtt");
              return <div className="card-text">{moveObject["move"]["name"]}{fetechedMoves}</div>
              

            })}
            
            <Link href="/" className="btn btn-primary">
              Home
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
/* 
      <div class="card" style={{ width: "18rem" }}>
        <img
          class="card-img-top"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">Name: {pokemon["name"]}</h5>
          <h5 class="card-title">Weight: {pokemon["weight"]}</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div> */
