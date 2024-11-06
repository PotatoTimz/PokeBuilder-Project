interface Props {
  statName: string;
  stat1: number;
  stat2: number;
  comparable: boolean;
}

function StatCompare(props: Props) {
  return (
    <div className="d-flex flex-row justify-content-between">
      <div className="fs-5 my-1">{props.statName}: </div>
      <div
        className={`fs-5 my-1 ${
          !props.comparable
            ? ""
            : props.stat1 > props.stat2
            ? "text-success"
            : props.stat2 > props.stat1
            ? "text-danger"
            : ""
        }`}
      >
        {props.stat1}
        {!props.comparable ? (
          ""
        ) : props.stat1 > props.stat2 ? (
          <i className="bi bi-arrow-up"></i>
        ) : props.stat1 < props.stat2 ? (
          <i className="bi bi-arrow-down"></i>
        ) : (
          <i className="bi bi-dash"></i>
        )}
      </div>
    </div>
  );
}

export default StatCompare;
