import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import style from "./style.css";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const imagesSRC = importAll(
  require.context("../../../src/assets", false, /\.(png|jpe?g|svg)$/)
);

const src = Object.keys(imagesSRC);
const Home = () => {
  const [count, setCount] = useState(0);

  // Save timer ref and return cleanup function to clear it
  useEffect(() => {
    console.log(count);
    if (count > src.length) {
      return;
    }
    const timerId = setInterval(() => {
      // Use a functional state update to correctly increment the count
      setCount((count) => count + 2);
    }, 300);

    return () => clearInterval(timerId);
  }, [count]);

  const image = src[(count - 2) % src.length];
  const image2 = src[(count - 1) % src.length];
  const image3 = src[count % src.length];
  console.log(image);
  console.log(src);
  return (
    <div class={style.home}>
      <p>loading interval images</p>
      <img
        style="width:400px; height:400px;"
        src={"./assets/" + image}
        alt="interval image"
      />
      <img
        style="width:400px; height:400px"
        src={"./assets/" + image2}
        alt="interval image 2"
      />

      <img
        style="width:400px; height:400px"
        src={"./assets/" + image3}
        alt="interval image 3"
      />
      {/* <img src={tasks[0]} /> */}
      {src.map((key, index) => (
        <div>
          <img
            style="height:100px; width:100px;"
            key={index}
            src={"./assets/" + key}
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
