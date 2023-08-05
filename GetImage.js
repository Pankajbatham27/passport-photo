import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { crop } from "@cloudinary/url-gen/actions/resize";
import style from './Passport.module.css';

const GetImage = ({publicID}) => {
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: "professional-clickers-new",
    },
  });

  const myImage = cloudinary
    .image(publicID)
    .resize(crop().width(250).height(321).gravity("face"));



    const tenImage = () => {

        const all = [];

        for (let index = 0; index < 12; index++) {
            
            all.push(<AdvancedImage cldImg={myImage} />)
            
        }

        return all;
    }

  return (
    <div className={style.containerPassport}>
      {tenImage()}
    </div>
  );
};

export default GetImage;
