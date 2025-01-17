import Barcode from "../container/Barcode/barcode";
import Home from "../container/Home/home";

export const Routedata = [
  { id: 1, path: `${import.meta.env.BASE_URL}`, element: <Barcode/> },
  { id: 2, path: `${import.meta.env.BASE_URL}home`, element: <Barcode/> },
  //{ id: 3, path: `${import.meta.env.BASE_URL}cop`, element: <Barcode/> },
 ]