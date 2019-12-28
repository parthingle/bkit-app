import axios from "axios";
import keys from "./keys";
import AsyncStorage from "@react-native-community/async-storage";

export default class Client {
  /* REST endpoints */

  static async itemBuck(id, timestamp) {
    return await Client.requestWithAuth({
      method: "post",
      url: `/item/buck/${id}?timestamp=${timestamp}`
    });
  }

  static async itemUnbuck(itemId) {
    return await Client.requestWithAuth({
      method: "post",
      url: `/item/unbuck/${itemId}`
    });
  }
  static async userHome() {
    return await Client.requestWithAuth({
      method: "get",
      url: "/user/home"
    });
  }

  /* Authentication endpoints */

  static async authFacebook(fat) {
    const config = {
      method: "post",
      url: "/auth/facebook",
      data: {
        access_token: fat
      }
    };
    const res = await Client.request(config);
    if (res.status === 200) {
      console.log("setItem @jwtoken " + res.data.jwtoken);
      console.log("setItem @rtoken " + res.data.rtoken);
      await AsyncStorage.setItem("@jwtoken", res.data.jwtoken);
      await AsyncStorage.setItem("@rtoken", res.data.rtoken || "");
    }
    return res;
  }

  static async authRefresh() {
    const rtoken = await AsyncStorage.getItem("@rtoken");
    const config = {
      method: "post",
      url: "/auth/refresh",
      data: {
        rtoken
      }
    };
    const res = await Client.request(config);
    if (res.status === 200) {
      console.log("setItem @jwtoken " + res.data.jwtoken);
      console.log("setItem @rtoken " + res.data.rtoken);
      await AsyncStorage.setItem("@jwtoken", res.data.jwtoken);
      await AsyncStorage.setItem("@rtoken", res.data.rtoken || "");
    }
    return res;
  }

  /* Helper functions */

  // makes a request, logs it, and creates an error message if there is an error
  static async request(config) {
    config.baseURL = keys.BASE_URL;
    try {
      const response = await axios(config);
      console.log(config.method + " " + config.url + ": " + response.status);
      return response;
    } catch (error) {
      if (error.response) {
        // The response is not 2XX
        console.log(
          config.method + " " + config.url + ": " + error.response.status
        );
        console.log(error.response);
        error.response.errorMessage =
          "Received bad response: " + error.response.status;
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(config.method + " " + config.url + ": No response");
        console.log(error.message);
        return { status: 600, errorMessage: error.message };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log(config.method + " " + config.url + ": Failed request");
        console.log(error.message);
        return { status: 601, errorMessage: error.message };
      }
    }
  }

  // make a request with authentication and reauthenticate if needed
  static async requestWithAuth(config) {
    // add authentication header
    // in the future we can cache the token in memory
    let jwtoken = await AsyncStorage.getItem("@jwtoken");
    config.headers = config.headers || {};
    config.headers["x-auth-token"] = jwtoken;

    // attempt the request
    let res = await Client.request(config);
    if (res.status === 401) {
      // JWT is invalid, get a new one
      const refreshRes = await Client.authRefresh();
      if (refreshRes.status === 200) {
        jwtoken = await AsyncStorage.getItem("@jwtoken");
        config.headers["x-auth-token"] = jwtoken;
        // reattempt request
        res = await Client.request(config);
      }
    }
    return res;
  }
}
