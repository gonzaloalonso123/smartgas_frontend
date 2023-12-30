import axios from "axios";
import FormData from "form-data";
import { OPENAI_KEY } from "@env";

const models = ["gpt-3.5-turbo-1106", "gpt-4"];

const getFunctionParams = async (
  messages,
  tools,
  temperature = 0,
  maxTokens = 2000
) => {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: models[0],
      messages,
      tools: tools,
      tool_choice: "auto",
      temperature,
      max_tokens: maxTokens,
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const getTableData = async (userMessage) => {
  const response = await getFunctionParams(
    [
      {
        role: "system",
        content: `En el siguiente mensaje se especifica una cantidad de gasolina que se ha metido a un vehiculo y el precio al que se ha comprado, asi como los kilometros actuales del vehiculo. Llama a la funcion dataToTable con estos datos como parametros. Manda solo los numeros: """${userMessage}"""}`,
      },
    ],
    [
      {
        type: "function",
        function: {
          name: "dataToTable",
          description: "puts the received data into a table",
          parameters: {
            type: "object",
            name: "data",
            properties: {
              liters: {
                type: "number",
              },
              price: {
                type: "number",
              },
              kilometers: {
                type: "number",
              },
            },
            required: ["data"],
          },
        },
      },
    ]
  );
  return (
    JSON.parse(
      response.data.choices[0].message.tool_calls[0].function.arguments
    ) || []
  );
};

export async function sendAudioToOpenAI(uri) {
  const form = new FormData();
  form.append("model", "whisper-1");
  form.append("file", {
    uri,
    name: "name.m4a",
    type: "audio/m4a",
  });

  return new Promise((resolve, reject) => {
    axios
      .post("https://api.openai.com/v1/audio/transcriptions", form, {
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("User said: " + response.data.text);
        resolve(response.data.text);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function sendTextToOpenAI(messages) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://api.openai.com/v1/chat/completions",
        {
          messages,
          model: "gpt-3.5-turbo",
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_KEY}`,
          },
        }
      )
      .then((response) => {
        resolve(response.data.choices[0].message.content);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getImageFromOpenAI(prompt) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: prompt,
          n: 1,
          size: "1024x1024",
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_KEY}`,
          },
        }
      )
      .then((response) => {
        resolve(response.data.data[0].url);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
