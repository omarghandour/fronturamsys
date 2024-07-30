"use server";

import axios from "axios";

type dataType = {
  Pic: string;
  name: string;
  password: string;
  teamLeader: string;
};
const server = process.env.SERVER;
const EditTeamProfile = async (id: string, data: dataType) => {
  const team = await axios
    .post(`${server}/users/`, {
      phone: data.name,
      password: data.password,
      profilePic: data.Pic,
      teamLeader: data.teamLeader,
    })
    .then(function (response) {
      if (
        response.data.cookie.jar !== undefined ||
        response.data.cookie.jar !== null
      ) {
      }

      return {
        message: response.data.message,
        user: response.data.user,
      };
    })
    .catch(function (error) {
      return {
        errorMessage: error.response.data,
      };
      console.log(error.response.data);
    });
  return team;
};
export { EditTeamProfile };
