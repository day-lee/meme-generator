import axios from "axios";
import { useEffect, useId, useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";

const DEFAULT_VALUES = {
  topText: "",
  bottomText: "",
  memeImg: "",
};

function App() {
  const [values, setValues] = useState(DEFAULT_VALUES);

  const id = useId();
  const { topText, bottomText, memeImg } = values;

  const onTextChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
  };

  async function getData() {
    try {
      const res = await axios.get("https://api.imgflip.com/get_memes");
      const resData = res.data;
      const dataSize = resData.data.memes.length;
      const randomNumber = Math.floor(Math.random() * dataSize);
      const src = resData.data.memes[randomNumber].url;
      return src;
    } catch (error) {
      console.error(error);
      // return an empty string for memeImg in case of error
      return "";
    }
  }

  async function fetchData() {
    const src = await getData();
    setValues((prev) => ({ ...prev, memeImg: src }));
  }

  const onImgButtonClick = () => {
    const src = fetchData();
    setValues((prev) => ({ ...prev, memeImg: src }));
  };

  // promise & cleanup function & empty dependancy list for mounting at first
  useEffect(() => {
    fetchData();

    return () => {
      setValues("");
    };
  }, []);

  return (
    <>
      <div className="w-full border-[1px] border-gray">
        <header className="flex items-center bg-gradient-to-r from-[#672280] to-[#A626D3] w-[550px] h-[65px]">
          <img className="ml-[27px]" src={logo} alt="logo" />
        </header>
        <div className="px-[36px] pt-[28px] pb-[47px]">
          <main>
            <form className="flex gap-[33px] justify-between text-left text-[14px]">
              <div className="w-[222px]">
                <label htmlFor={id + "top-text"} className="font-medium">
                  Top text
                </label>
                <input
                  id="top-text"
                  name="topText"
                  className="border-2 border-[#D1D5DB] rounded-[5px] pl-[10px] py-[7px] w-full font-semibold "
                  type="text"
                  placeholder="Shut up"
                  value={values.topText}
                  onChange={onTextChange}
                  maxLength="15"
                />
              </div>
              <div className="w-[222px]">
                <label htmlFor={id + "bottom-text"} className="font-medium">
                  Bottom text
                </label>
                <input
                  id="bottom-text"
                  name="bottomText"
                  className="border-2 border-[#D1D5DB] rounded-[5px] pl-[10px] py-[7px] w-full font-semibold"
                  type="text"
                  placeholder="And take my money"
                  value={values.bottomText}
                  onChange={onTextChange}
                  maxLength="15"
                />
              </div>
            </form>
          </main>
          <div>
            <button
              className="w-full bg-gradient-to-r from-[#672280] to-[#A626D3] text-white text-4 mt-4 mb-8"
              aria-label="get a new image"
              onClick={onImgButtonClick}
            >
              Get a new meme image 🖼
            </button>
          </div>
          <div className="w-[477px] relative flex flex-col items-center justify-center font-impact text-shadow-custom text-white">
            <div className="absolute top-4 text-[32px] font-impact">
              {values.topText}
            </div>
            <img className="w-[477px]" src={memeImg} alt="meme" />
            <div className="absolute bottom-4 text-[32px] font-impact text-shadow-custom text-white">
              {values.bottomText}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
