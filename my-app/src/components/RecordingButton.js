import React, { useEffect, useState } from "react";
import RecordIcon from "../images/recordingIcon.png";
import RecordingIcon from "../images/voiceLoading.gif";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { getTableData, sendAudioToOpenAI } from "../api/openAI";
import { Audio } from "expo-av";
import { Recording } from "expo-av/build/Audio";
import * as Speech from "expo-speech";
import { getCachedData, removeCachedData, setCachedData } from "../../saveData";

export const RecordingButton = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState();
  const [table, setTable] = useState(null);
  const [SpeechToText, setSpeechToText] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await getCachedData("table");
    setData(JSON.parse(data));
  };

  const startRecording = async () => {
    setIsRecording(true);
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
    });
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    setRecording(recording);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    sendAudioToOpenAI(uri).then(async (response) => {
      setSpeechToText(response);
      getTableData(response).then((response) => {
        setTable(response);
        setCachedData(
          "table",
          JSON.stringify(data ? [...data, response] : [response])
        );
        setData(data ? [...data, response] : [response]);
      });
    });
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false,
    });
  };

  return (
    <View className="flex items-center ">
      <Text className="font-bold">
        {isRecording ? "Grabando" : "Pulsa para grabar"}
      </Text>
      <TouchableOpacity onPress={!isRecording ? startRecording : stopRecording}>
        <Image
          source={isRecording ? RecordingIcon : RecordIcon}
          className="h-24 w-24"
        />
      </TouchableOpacity>
      <View className="px-6">
        {SpeechToText && (
          <Text className="font-bold">User said: {SpeechToText}</Text>
        )}
        <View className="w-screen flex items-center mt-20 border">
          <Text className="text-2xl font-bold mb-4">Last measurements</Text>
          {data &&
            data.map((d) => (
              <View className="flex flex-row w-full">
                <Text className="bg-green-200 w-1/3 text-center">{d.price} Euro/L</Text>
                <Text className="bg-yellow-200 w-1/3 text-center">{d.liters} liters</Text>
                <Text className="bg-orange-200 w-1/3 text-center">{d.kilometers} kilometers</Text>
              </View>
            ))}
        </View>
      </View>
    </View>
  );
};
