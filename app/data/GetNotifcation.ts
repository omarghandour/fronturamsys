"use server";
import axios from "axios";

const GetNotifications = async () => {
  const server = process.env.SERVER;

  const { data } = await axios.get(`${server}/users/getNotification`);
  if (data) {
    return data;
  } else {
    return {
      message: "No Notifications",
    };
  }
};
const notificationsById = async (id: any) => {
  const server = process.env.SERVER;
  const idd: string = await id;
  if (idd !== undefined && idd !== null && idd.length > 0) {
    const { data } = await axios.post(`${server}/admin/notificationsById`, {
      id: idd,
    });

    if (data) {
      return data[0];
    } else {
      return {
        message: "No Notifications",
      };
    }
  }
};
const passData = async (data: any) => {};
export { GetNotifications, notificationsById, passData };
