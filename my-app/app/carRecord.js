import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { RecordingButton } from "../src/components/RecordingButton";
import { useNewRecording } from "../src/hooks/useNewRecording";
import Measurements from "../src/components/Measurements";
import { getCachedData, setCachedData } from "../saveData";

const carRecord = () => {
  const [car, setCar] = useState({});
  const carId = useLocalSearchParams().id;

  useEffect(() => {
    getCachedData("cars").then((data) => {
      if (data) {
        const parsedData = JSON.parse(data);
        const currentCar = parsedData.filter((c) => c.id === carId);
        setCar(currentCar[0]);
      }
    });
  }, []);

  const addDataToCar = async (newRow) => {
    console.log("newRow", newRow);
    const cars = await getCachedData("cars");
    console.log("cars", cars);
    const parsedCars = JSON.parse(cars);
    const currentCar = parsedCars.filter((c) => c.id === car.id);
    const currentData = currentCar[0].data || [];
    const newData = [...currentData, newRow];
    const newCar = { ...car, data: newData };
    setCar(newCar);
    const newCars = parsedCars.map((c) => (c.id === car.id ? newCar : c));
    setCachedData("cars", JSON.stringify(newCars));
  };

  return (
    <View>
      <View className="border p-2 flex flex-row border-gray-200">
        <Image source={{ uri: car.image }} className="h-48 w-1/2" npx />
        <View className="ml-5 ">
          <Text className="font-black text-xl">
            {car.make + " " + car.model}
          </Text>
          <Text className="font-black text-xl">{car.year}</Text>
          <Text className="font-light">{car.kms}</Text>
        </View>
      </View>
      <View className='mt-10'>
      <RecordingButton
        {...useNewRecording()}
        onNewData={(data) => addDataToCar(data)}
      />
      </View>
      <Measurements data={car.data} />
    </View>
  );
};

export default carRecord;
