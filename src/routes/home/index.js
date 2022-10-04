import { h } from "preact";

import { useEffect, useState } from "preact/hooks";
import style from "./style.css";
import { Blob } from "buffer";
import { Buffer } from "buffer";

function importAll(r) {
  console.log("abc");
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
console.log("env", process.env.IP_ADDRESS);
console.log("hello print", process.env.HI);

const imagesSRC = importAll(
  require.context("../../../src/assets", false, /\.(png|jpe?g|svg)$/)
);

/* console.log(process.env.VAR); */
const src = Object.keys(imagesSRC);
const Home = () => {
  const [someImage, setSomeImage] = useState();
  var ws = new WebSocket("ws://127.0.0.1:8000/ws");
  /* ws = new WebSocket('ws://localhost:3000/ws') */
  ws.onopen = () => {
    console.log("WebSocket Client Connected");
  };

  ws.onmessage = (message) => {
    setSomeImage(message.data);
    console.log(message);
    console.log("objecttttt", message.data);
    /* console.log(typeof someImage); */
  };
  ws.onerror = function() {
    console.log("Connection Error");
  };
  const [count, setCount] = useState(0);

  // Save timer ref and return cleanup function to clear it
  useEffect(() => {
    console.log(count);
    /* /* loop through the end of the file in the src/assets ( avoid inifite loop) */
    if (count > src.length) {
      return;
    }
    const timerId = setInterval(() => {
      // Use a functional state update to correctly increment the count
      setCount((count) => count + 2);
    }, 100);

    return () => clearInterval(timerId);
  }, [count]);

  const jsonObj = {
    data: {
      v: [
        ["chicken", "Roast chicken with vegetables"],
        ["beef", "Beef and Yorkshire pudding"],
      ],
    },
    name: "main",
    type: "meat",
    values: [
      ["chicken", "Roast chicken with vegetables"],
      ["beef", "Beef and Yorkshire pudding"],
    ],
  };
  /* console.log("hey enviornment ", process.env.someVar); */
  console.log("obj inside obj", jsonObj.data.v);
  const a = jsonObj.values.map((e) => {
    console.log("is this working", e.name);
  });
  console.log("heyyyyyyy", a);
  // just returning a template literal for representation
  const image = src[(count - 2) % src.length];
  const image2 = src[(count - 1) % src.length];
  const image3 = src[count % src.length];
  console.log("first image", image);
  console.log("image array", src);
  return (
    <div class={style.home}>
      <p> socket image coming </p>
      <img
        src={"data:image/png;base64," + someImage}
        alt="socket image"
        style="height:100px; width:100px;"
      />
      <p>loading interval images</p>
      <div>
        <span>{count - 2}</span>
        <img
          style="width:400px; height:400px;"
          src={"./assets/" + image}
          alt="interval image"
        />
      </div>
      <div>
        <span>{count - 1}</span>
        <img
          style="width:400px; height:400px"
          src={"./assets/" + image2}
          alt="interval image 2"
        />
      </div>
      <div>
        <span>{count}</span>
        <img
          style="width:400px; height:400px"
          src={"./assets/" + image3}
          alt="interval image 3"
        />
      </div>
      {/* {src.map((key, index) => ( */}
      {/*   <div> */}
      {/*     <img */}
      {/*       style="height:100px; width:100px;" */}
      {/*       key={index} */}
      {/*       src={"./assets/" + key} */}
      {/*       alt={key} */}
      {/*     /> */}
      {/*   </div> */}
      {/* ))} */}

      <h1>Homeee</h1>
      <p>This is the Home component</p>
    </div>
  );
};

export default Home;
