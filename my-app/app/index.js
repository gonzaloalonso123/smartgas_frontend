import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { getCachedData, removeCachedData } from "../saveData";
import { router } from 'expo-router';


const Page = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    getCachedData("cars").then((data) => {
      if (data) {
        setCars(JSON.parse(data));
        console.log(data);
      }
    });
    // removeCachedData("cars");
  }, []);

  return (
    <View className="h-screen flex justify-top">
      <Header />
      <CarList cars={cars} />
    </View>
  );
};

const Header = () => (
  <View className="flex flex-row items-center justify-between px-4">
    <Text className="font-black text-2xl text-left">Select your vehicle</Text>
    <AddCarButton />
  </View>
);

const CarList = ({ cars }) => (
  <ScrollView>
    {cars.map((car, i) => (
      <Car car={car} key={i} />
    ))}
  </ScrollView>
);

const AddCarButton = () => (
  <Link href="/newcar" className="text-3xl">
    +
  </Link>
);

const Car = ({ car }) => (
  <TouchableOpacity
    className="border p-2 flex flex-row border-gray-200"
    onPress={() => router.push({ pathname: "carRecord", params: car })}
  >
    <Image source={{ uri: car.image }} className="h-48 w-1/2" npx />
    <View className="ml-5 ">
      <Text className="font-black text-xl">{car.make + " " + car.model}</Text>
      <Text className="font-black text-xl">{car.year}</Text>
      <Text className="font-light">{car.kms}</Text>
    </View>
  </TouchableOpacity>
);

export default Page;
