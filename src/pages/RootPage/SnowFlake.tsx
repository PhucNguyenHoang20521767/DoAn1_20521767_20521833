const Snowflake = (props: any) => {
  return (
    <div className="Snowflake " id={`item${props.id}`} style={props.style}>
      *
    </div>
  );
};

export default Snowflake;
