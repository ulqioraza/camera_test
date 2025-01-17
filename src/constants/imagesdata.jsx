
import autolivlogo from "../assets/images/autoliv_logo.png";

const Imagesdata = (img) => {
    try {
        const i = {
           autolivlogo
        };
        return i[img];
    } catch (error) {
        
    }
};

export default Imagesdata;
