import { h } from "preact";
import style from "./style.css";

/* import chokidar from "chokidar"; */
/* const watcher = chokidar.watch("../../../public", { */
/*   ignored: /^\./, */
/*   persistent: true, */
/* }); */
const Home = () => {
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }
  /* const images = importAll( */
  /*   require.context("../../../public", false, /\.(png|jpe?g|svg)$/) */
  /* ); */

  const imagesSRC = importAll(
    require.context("../../../src/assets", false, /\.(png|jpe?g|svg)$/)
  );
  /* const tasks = Object.keys(images); */
  const src = Object.keys(imagesSRC);
  console.log(src);
  /* console.log(tasks[0]); */
  /* console.log(images); */
  return (
    <div class={style.home}>
      {/* <img src={tasks[0]} /> */}
      {src.map((key, index) => (
        <div>
          <img
            style="height:100px; width:100px;"
            key={index}
            src={key}
            alt={key}
          />
        </div>
      ))}

      {/* <img src="./some.png" /> */}
      <h1>Homeee</h1>
      <p>This is the Home component</p>
    </div>
  );
};

export default Home;
