import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { getImageFromOpenAI } from "../src/api/openAI";

const makes = [
    "Abarth",
    "Alfa Romeo",
    "Aston Martin",
    "Audi",
    "Bentley",
    "BMW",
    "Bugatti",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Citroën",
    "Dacia",
    "Daewoo",
    "Daihatsu",
    "Dodge",
    "Donkervoort",
    "DS",
    "Ferrari",
    "Fiat",
    "Fisker",
    "Ford",
    "Honda",
    "Hummer",
    "Hyundai",
    "Infiniti",
    "Iveco",
    "Jaguar",
    "Jeep",
    "Kia",
    "KTM",
    "Lada",
    "Lamborghini",
    "Lancia",
    "Land Rover",
    "Landwind",
    "Lexus",
    "Lotus",
    "Maserati",
    "Maybach",
    "Mazda",
    "McLaren",
    "Mercedes-Benz",
    "MG",
    "Mini",
    "Mitsubishi",
    "Morgan",
    "Nissan",
    "Opel",
    "Peugeot",
    "Porsche",
    "Renault",
    "Rolls-Royce",
    "Rover",
    "Saab",
    "Seat",
    "Skoda",
    "Smart",
    "SsangYong",
    "Subaru",
    "Suzuki",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo"
  ]

const FormField = ({ fieldName, setter }) => {
  return (
    <View className="mt-4">
      <Text className="font-black my-1">{fieldName}</Text>
      <TextInput
        className="border border-green-100 p-1"
        onChangeText={(text) => setter(text)}
      />
    </View>
  );
};

const NewCar = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const getImage = async () => {
    const prompt = `${color} ${make} ${model} in a fantasy landscape`;
    console.log(prompt);
    setLoading(true);
    const image = await getImageFromOpenAI(prompt);
    setLoading(false);
    setImage(image);
  };

  return (
    <View className="p-5 h-screen">
      <Image
        source={{ uri: image }}
        className="h-48 w-48 mx-auto mb-10 rounded-md"
        resizeMode="cover"S
      />
      <SelectDropdown
        className="border border-green-100"
        data={makes}
        onSelect={(selectedItem, index) => {
          setMake(selectedItem);
        }}
        defaultButtonText={"Select make"}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
      <FormField fieldName="Model" setter={setModel} />
      <FormField fieldName="Year" setter={setYear} />
      <FormField fieldName="Color" setter={setColor} />
      <TouchableOpacity
        className="bg-orange-200 p-6 rounded mt-6 flex flex-row items-center justify-between"
        onPress={getImage}
      >
        <Text className="text-center font-black">Generate image</Text>
        {loading && <ActivityIndicator size={"small"}/>}
      </TouchableOpacity>
      <TouchableOpacity className="bg-green-200 p-6 rounded mt-6">
        <Text className="text-center font-black">Add car</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewCar;
