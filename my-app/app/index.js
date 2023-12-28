import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

const mockCars = [
  {
    name: "Golf IV",
    kms: "190000",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/VW_Golf_IV_front_20071205.jpg/1200px-VW_Golf_IV_front_20071205.jpg",
  },
  {
    name: "Citroen c3",
    kms: "190000",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/VW_Golf_IV_front_20071205.jpg/1200px-VW_Golf_IV_front_20071205.jpg",
  },
  {
    name: "Lamborgini",
    kms: "190000",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/VW_Golf_IV_front_20071205.jpg/1200px-VW_Golf_IV_front_20071205.jpg",
  },
];

export default function Page() {
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
        {mockCars.map((car, i) => (
          <TouchableOpacity
            className="border p-2 flex flex-row border-gray-200"
            key={i}
          >
            <Image source={{ uri: car.image }} className="h-48 w-1/2" npx />
            <View className="ml-5 ">
              <Text className="font-black text-xl">{car.name}</Text>
              <Text className="font-light">{car.kms}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
