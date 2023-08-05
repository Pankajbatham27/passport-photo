import { useState } from "react";
import style from "./Passport.module.css";
import GetImage from "./GetImage";
import Loader from "./Loader";

const Passport = () => {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [publicID, setPublicID] = useState();

  const imageHandler = (event) => {
    setImage(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!image) {
      alert("Image URL Required");
    }

    handleSubmit().then((data) => {
      setLoading(false);
      setPublicID(data);
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://rathore.akbrothersphotography.store/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            image_url: image,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className={style.containerFull}>
      <div className={style.card}>
        {loading ? (
          <Loader />
        ) : publicID ? (
          <GetImage publicID={publicID} />
        ) : (
          <div className={style.cardInside}>
            <div>
              <div>
                <p style={{color: '#000'}}>Upload an Image</p>
                <input
                  type="text"
                  onChange={imageHandler}
                  placeholder="Image URL"
                />
              </div>
              <div>
                <button onClick={submitHandler}>Upload</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Passport;
