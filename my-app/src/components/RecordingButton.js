import React, { useEffect, useState } from "react";
import RecordIcon from "../images/recordingIcon.png";
import RecordingIcon from "../images/voiceLoading.gif";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";

export const RecordingButton = ({
  isRecording,
  stopRecording,
  startRecording,
  SpeechToText,
  onNewData,
}) => (
  <View className="flex items-center ">
    <Text className="font-bold">
      {isRecording ? "Recording" : "Record new gas mesaurement"}
    </Text>
    <TouchableOpacity
      onPress={
        !isRecording
          ? startRecording
          : async () => {
              const data = await stopRecording();
              onNewData(data);
            }
      }
    >
      <Image
        source={isRecording ? RecordingIcon : RecordIcon}
        className="h-24 w-24"
      />
    </TouchableOpacity>
  </View>
);
