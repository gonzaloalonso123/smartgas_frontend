import { useState } from "react";
import { Audio } from "expo-av";
import { Recording } from "expo-av/build/Audio";
import * as Speech from "expo-speech";
import { getTableData, sendAudioToOpenAI } from "../api/openAI";

export const useNewRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState();
  const [SpeechToText, setSpeechToText] = useState("");

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
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false,
    });
    const responseFromOpenAI = await sendAudioToOpenAI(uri);
    setSpeechToText(responseFromOpenAI);
    const tableDataResponse = await getTableData(responseFromOpenAI);
    return tableDataResponse;
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
    SpeechToText,
  };
};
