import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import StandardInput from "../src/components/StandardInput";
import makes from "../assets/content/makes.json";
import { useNewCar } from "../src/hooks/useNewCar";
import { router } from "expo-router";

const FormField = ({ fieldName, setter }) => {
  return (
    <View className="mt-4">
      <Text className="font-black my-1">{fieldName}</Text>
      <StandardInput onChangeText={(text) => setter(text)} />
    </View>
  );
};

const NewCar = () => {
  const {
    setMake,
    setModel,
    setYear,
    setColor,
    image,
    getImage,
    saveCurrentCar,
    loading,
  } = useNewCar();
  return (
    <View className="p-5 h-screen">
      <Image
        source={{ uri: image }}
        className="h-48 w-48 mx-auto mb-10 rounded-md"
        resizeMode="cover"
      />
      <MakeDropDown setMake={setMake} />
      <FormField fieldName="Model" setter={setModel} />
      <FormField fieldName="Year" setter={setYear} />
      <FormField fieldName="Color" setter={setColor} />
      <GetImageButton getImage={getImage} loading={loading} />
      <SaveButton
        saveCurrentCar={async () => {
          await saveCurrentCar();
          router.replace("/");
        }}
      />
    </View>
  );
};

const SaveButton = ({ saveCurrentCar }) => {
  return (
    <TouchableOpacity
      className="bg-green-200 p-6 rounded mt-6"
      onPress={saveCurrentCar}
    >
      <Text className="text-center font-black">Add car</Text>
    </TouchableOpacity>
  );
};

const GetImageButton = ({ getImage, loading }) => {
  return (
    <TouchableOpacity
      className="bg-orange-200 p-6 rounded mt-6 flex flex-row items-center justify-between"
      onPress={getImage}
    >
      <Text className="text-center font-black">Generate image</Text>
      {loading && <ActivityIndicator size={"small"} />}
    </TouchableOpacity>
  );
};

const MakeDropDown = ({ setMake }) => (
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
);

export default NewCar;
