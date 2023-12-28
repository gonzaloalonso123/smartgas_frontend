import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { getCachedData, removeCachedData } from "../saveData";

export default function Page() {
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
      <View className="flex flex-row items-center justify-between px-4">
        <Text className="font-black text-2xl text-left">
          Select your vehicle
        </Text>
        <Link href="/newcar" className="text-3xl">
          +
        </Link>
      </View>
      <ScrollView>
        {cars.map((car, i) => (
          <TouchableOpacity
            className="border p-2 flex flex-row border-gray-200"
            key={i}
          >
            <Image source={{ uri: car.image }} className="h-48 w-1/2" npx />
            <View className="ml-5 ">
              <Text className="font-black text-xl">{car.make + ' ' + car.model}</Text>
              <Text className="font-black text-xl">{car.year}</Text>
              <Text className="font-light">{car.kms}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
