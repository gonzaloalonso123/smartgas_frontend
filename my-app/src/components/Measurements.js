import { View, Text } from "react-native";
import React from "react";

const Measurements = ({ data }) => {
  return (
    <View className="w-screen flex items-center mt-20 border">
      <Text className="text-2xl font-bold mb-4">Last measurements</Text>
      <View className="flex flex-row w-full border-b-2  ">
        <Text
          className="bg-green-200 text-center font-black"
          style={{ width: "30%" }}
        >
          Price
        </Text>
        <Text
          className="bg-yellow-200  text-center font-black"
          style={{ width: "30%" }}
        >
          Liters
        </Text>
        <Text
          className="bg-orange-200 text-center font-black"
          style={{ width: "30%" }}
        >
          Kilometers
        </Text>
      </View>
      {data &&
        data.map((d, i) => (
          <View className="flex flex-row w-full py-2" key={i}>
            <Text className="bg-green-200 text-center" style={{ width: "30%" }}>
              {d.price}
            </Text>
            <Text
              className="bg-yellow-200  text-center"
              style={{ width: "30%" }}
            >
              {d.liters}
            </Text>
            <Text
              className="bg-orange-200 text-center"
              style={{ width: "30%" }}
            >
              {d.kilometers}
            </Text>
            <Text className="text-white font-black bg-red-500 flex-1 text-center">
              x
            </Text>
          </View>
        ))}
    </View>
  );
};

export default Measurements;
