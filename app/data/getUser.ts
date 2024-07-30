"use server";
import axios from "axios";
import { checkCookie } from "./CookieCheck";

const userFetch = async (id: any) => {
  const server = process.env.SERVER;
  console.log(id);

  try {
    const { data } = await axios.get(
      `https://uramsys.onrender.com/users/getuser/${id}`
    );
    if (data) {
      console.log(data);
      return data;
    }
  } catch (error: any) {
    return error.message;
  }
};
const challenges = async (id: any) => {
  try {
    const server = process.env.SERVER;
    const { data } = await axios.post(`${server}/admin/challenge`, {
      id: id,
    });
    if (data) {
      return data;
    }
  } catch (error) {}
};
const Teams = async (id: any) => {
  try {
    const server = process.env.SERVER;
    const { data } = await axios.post(`${server}/admin/teamsByjudge`, {
      id: id,
    });
    if (data) {
      return data;
    }
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
};
const getScore = async (id: any) => {
  try {
    const server = process.env.SERVER;
    const { data } = await axios.post(`${server}/admin/getScore`, {
      id: id,
    });
    if (data) {
      return data;
    }
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
};
const addScore = async (datas: any) => {
  try {
    const server = process.env.SERVER;
    const score = +datas.score;
    console.log(score);
    const { data } = await axios.post(`${server}/admin/addScore/${datas.id}`, {
      score: score,
      judgeId: datas.judge,
    });
    if (data) {
      // console.log(data);

      return data;
    }
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
};
const passValue = async (id: any, data: any) => {
  const cookie = await checkCookie();
  // console.log(cookie?.value);
  const datas = {
    id: id,
    judge: cookie?.value,
    score: data,
  };
  // console.log(datas);

  addScore(datas);
};
export { userFetch, challenges, Teams, getScore, passValue };
