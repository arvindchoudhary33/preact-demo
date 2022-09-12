import { h } from "preact";
import style from "./style.css";

const Home = () => (
  <div class={style.home}>
    <img src="./ap.png"></img>
    <h1>Home</h1>
    <p>This is the Home component.</p>
  </div>
);

export default Home;
