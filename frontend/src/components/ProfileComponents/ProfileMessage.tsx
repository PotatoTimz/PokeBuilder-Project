// Import necessary hook from react-router-dom
import { useNavigate } from "react-router-dom";

// Define the type for the props that will be passed to the ProfileMessage component
interface Props {
  pokemonCreated: number; // Number of Pokémon created by the user
  movesCreated: number; // Number of moves created by the user
  profileName: string; // Name of the user's profile
}

/*
  Profile Message Component
  Displays a personalized message for the user, informing them about the number of Pokémon 
  and moves they have created. It also provides options to create new Pokémon and moves.
*/
function ProfileMessage(props: Props) {
  // useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  return (
    <div className="col-lg-11 mx-4 bg-light border p-5 justify-center">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-9">
          {/* Welcome message for the user */}
          <div className="text-center fs-3 font-weight-bold my-3">
            Hello {props.profileName}! Welcome back to PokeBuilder.
          </div>

          {/* Message showing the number of Pokémon and moves created */}
          <div className="text-center fs-6">
            <p>
              You have currently created{" "}
              <span className="fw-bold">{props.pokemonCreated}</span> Pokémon
              and <span className="fw-bold">{props.movesCreated}</span> moves!
              Very impressive. Feel free to make as many moves and Pokémon as
              you want. Also, scroll down below to edit or delete your
              creations.
            </p>
          </div>

          {/* Additional message with inspiration for the user */}
          <div className="text-center fs-6 my-3">
            Need some inspiration? Feel free to take a look at the moves and
            Pokémon that other people have made on the site! There is no limit
            on the Pokémon that you create. You're also free to use other
            people's moves on your own Pokémon, so feel free to use other
            people's moves on your own creations.
          </div>

          {/* Prompt for the user to start creating new Pokémon and moves */}
          <div>
            <p className="text-center fs-5 fw-bold">Ready to start building?</p>

            {/* Button group for creating new Pokémon or moves */}
            <div className="d-flex flex-row justify-content-center">
              {/* Button to navigate to Pokémon creation page */}
              <button
                type="button"
                className="btn btn-primary mx-2 px-5"
                onClick={() => {
                  navigate("/pokemon/create"); // Navigate to the Pokémon creation page
                }}
              >
                Create Pokemon
              </button>

              {/* Button to navigate to Moves creation page */}
              <button
                type="button"
                className="btn btn-success mx-2 px-5"
                onClick={() => {
                  navigate("/move/create"); // Navigate to the Moves creation page
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
