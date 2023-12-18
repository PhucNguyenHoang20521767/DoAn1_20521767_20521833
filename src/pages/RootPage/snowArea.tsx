import "./snow.css";
import Snowflake from "./SnowFlake";

const snowArea = () => {
  const snow = () => {
    let animationDelay = "0s";
    let fontSize = "100px";
    let arr = new Array(200).fill(null);

    return arr.map((el, i) => {
      animationDelay = `${(Math.random() * 16).toFixed(2)}s`;
      fontSize = `${Math.floor(Math.random() * 10) + 10}px`;
      let style = {
        animationDelay,
        fontSize,
      };
      return <Snowflake key={i} id={i} style={style} />;
    });
  };
  return <div className="absolute top-40 h-full w-full">{snow()}</div>;
};

export default snowArea;
