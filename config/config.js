import AsyncStorage from "@react-native-async-storage/async-storage";

let apiUrl = "http://10.4.111.53:3004/api";

export const setApiUrl = async (ip) => {
  apiUrl = `http://${ip}:3004/api`;
  await AsyncStorage.setItem("apiUrl", apiUrl);
};

export const getApiUrl = async () => {
  const savedUrl = await AsyncStorage.getItem("apiUrl");
  return savedUrl || apiUrl;
};

const config = {
  get apiUrl() {
    return apiUrl;
  },
};

export default config;
