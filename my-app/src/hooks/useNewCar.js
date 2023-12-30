import { useState } from "react";
import { getCachedData, setCachedData } from "../../saveData";
import { getImageFromOpenAI } from "../api/openAI";
import { v4 as uuidv4 } from "uuid";

export const useNewCar = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("empty");
  const [loading, setLoading] = useState(false);

  const getImage = async () => {
    const prompt = `${color} ${make} ${model} in a fantasy landscape`;
    console.log(prompt);
    setLoading(true);
    const image = await getImageFromOpenAI(prompt);
    setLoading(false);
    setImage(image);
  };

  const saveCurrentCar = async () => {
    const car = {
      make,
      model,
      year,
      color,
      image,
      id: uuidv4(),
    };

    console.log(car);
    const currentCars = await getCachedData("cars");
    //conseguir datos de cache
    const parsedCars = JSON.parse(currentCars);
    //convertir datos de string a json
    const cars = parsedCars ? [...parsedCars, car] : [car];
    //si hay datos, añadir el nuevo coche, si no, crear array con el nuevo coche
    await setCachedData("cars", JSON.stringify(cars));
    //guardar datos en cache
  };

  return {
    make,
    setMake,
    model,
    setModel,
    year,
    setYear,
    color,
    setColor,
    image,
    getImage,
    saveCurrentCar,
    loading,
  };
};
