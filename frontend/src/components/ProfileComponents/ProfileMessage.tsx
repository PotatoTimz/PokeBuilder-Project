import { useNavigate } from "react-router-dom";

interface Props {
  pokemonCreated: number;
  movesCreated: number;
  profileName: string;
}

/*
  Profile Message Component
  Message to display to the user, informing them about how many pokemon & moves they have created
*/
function ProfileMessage(props: Props) {
  const navigate = useNavigate();

  return (
    <div className="col-lg-11 mx-4 bg-light border p-5 justify-center">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-9">
          <div className="text-center fs-3 font-weight-bold my-3">
            Hello {props.profileName}! Welcome back to PokeBuilder.
          </div>
          <div className="text-center fs-6">
            <p>
              You have currently created{" "}
              <span className="fw-bold">{props.pokemonCreated}</span> pokemon
              and <span className="fw-bold">{props.movesCreated}</span> moves!
              Very impressive. Feel free to make as many moves and pokemon as
              you want. Also, scroll down below to edit or delete your creations
            </p>
          </div>
          <div className="text-center fs-6 my-3">
            Need some insperation? Feel free to take a look at the moves and
            pokemon that other people have made on the site! There is no limit
            on the pokemon that you create. You're also free to use other
            people's move on your own pokemon, so feel free to use other
            people's move on your own pokemon
          </div>
          <div>
            <p className="text-center fs-5 fw-bold">Ready to start building?</p>
            <div className="d-flex flex-row justify-content-center">
              <button
                type="button"
                className="btn btn-primary mx-2 px-5"
                onClick={(e) => {
                  navigate("/pokemon/create");
                }}
              >
                Create Pokemon
              </button>
              <button
                type="button"
                className="btn btn-success mx-2 px-5"
                onClick={(e) => {
                  navigate("/move/create");
                }}
              >
                Create Moves
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileMessage;
