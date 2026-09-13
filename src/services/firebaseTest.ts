import {
  getCollection,
} from "../firebase/firestore";

export const testFirebaseConnection =
  async () => {
    try {
      const result =
        await getCollection("test");

      console.log(
        "Firebase connected successfully:",
        result
      );

      return true;
    } catch (error) {
      console.error(
        "Firebase connection failed:",
        error
      );

      return false;
    }
  };