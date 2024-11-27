// Define the types for the props expected by the StatCompare component
interface Props {
  statName: string; // The name of the stat being compared (e.g., "Attack", "Defense")
  stat1: number; // The value of the first stat to compare
  stat2: number; // The value of the second stat to compare
  comparable: boolean; // A flag that determines if the comparison should be made or not
}

function StatCompare(props: Props) {
  return (
    <div className="d-flex flex-row justify-content-between">
      {/* Display the stat name (e.g., "Attack") */}
      <div className="fs-5 my-1">{props.statName}: </div>

      {/* Display the stat value and apply conditional styling based on comparison */}
      <div
        className={`fs-5 my-1 ${
          // If 'comparable' is true, apply color based on which stat is greater
          !props.comparable
            ? "" // No color if not comparable
            : props.stat1 > props.stat2 // Green if stat1 is greater
            ? "text-success"
            : props.stat2 > props.stat1 // Red if stat2 is greater
            ? "text-danger"
            : "" // No color if they are equal
        }`}
      >
        {/* Show the value of stat1 */}
        {props.stat1}

        {/* Conditionally render arrows or dash based on comparison and 'comparable' flag */}
        {!props.comparable ? (
          "" // No indicator if comparison is not active
        ) : props.stat1 > props.stat2 ? (
          // Show an upward arrow (green) if stat1 is greater than stat2
          <i className="bi bi-arrow-up"></i>
        ) : props.stat1 < props.stat2 ? (
          // Show a downward arrow (red) if stat2 is greater than stat1
          <i className="bi bi-arrow-down"></i>
        ) : (
          // Show a dash if both stats are equal
          <i className="bi bi-dash"></i>
        )}
      </div>
    </div>
  );
}

export default StatCompare;
