import { Axios } from "axios";
import { useState } from "react";
import { fetchMovePokeApi } from "../../utilities/fetchPokeAPI";
import { Move } from "../../interfaces/PokemonInterfaces";

interface Props {
  axiosFetch: Axios;
  searchResult: (moveData: Move) => void;
}

function SearchOfficialMove(props: Props) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const searchMove = async (moveName: string) => {
    const response = await fetchMovePokeApi(props.axiosFetch, moveName);
    console.log(response);
    if (response == "error") {
      setError(true);
    } else {
      props.searchResult(response);
      setError(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <div className="row">
          <div className="text-white text-center fs-2 my-3 fw-medium">
            Search Official Moves
          </div>
        </div>
        <div className="row">
          <div className="text-white text-center fs-5">
            Want to start with some official moves? Search for a move already in
            the game and start your new move with it as a template!
          </div>
        </div>
        <div className="row mt-5">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              placeholder="Enter the name of an official Pokemon move"
            />
            <div className="input-group-append">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() =>
                  searchMove(searchQuery.toLowerCase().replace(" ", "-"))
                }
              >
                Search
              </button>
            </div>
          </div>
        </div>
        {error ? (
          <div className="row">
            <div className="text-white text-center fs-6 fw-light">
              The move you entered doesn't seem to exist. Please check over the
              inputed move for any errors.
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SearchOfficialMove;
