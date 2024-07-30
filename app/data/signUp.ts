// "use server";
// // import { cookie } from "@/components/Signup";
// import axios from "axios";
// type Data = {
//   phone: string;
//   password: string;
// };
// const SignupTeam = async (data: Data) => {
//   const server = process.env.SERVER;

//   const team = await axios
//     .post(`${server}/users/signup`, {
//       phone: data.phone,
//       password: data.password,
//     })
//     .then(function (response) {
//       if (
//         response.data.cookie.jar !== undefined ||
//         response.data.cookie.jar !== null
//       ) {
//         cookie(response.data.cookie);
//       }
//       return {
//         message: response.data.message,
//         user: response.data.user,
//       };
//     })
//     .catch((error) => {
//       return {
//         message: error.response.data,
//       };
//     });
//   return team;
// };
// export { SignupTeam };
