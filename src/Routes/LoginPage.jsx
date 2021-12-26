import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Login } from "../Components/Login";
import { loginFailure, loginSuccess } from "../Redux/auth/action";
import axios from "axios";

function LoginPage() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const handleLogin = async ({ email, password }) => {
    // fake auth
    try {
      const config = {
        url: "https://reqres.in/api/login",
        method: "post",
        data: {
          email: email,
          password: password
        }
      };
      const { data } = await axios(config);
      console.log(data.token);
      const action = loginSuccess(data.token);
      dispatch(action);
    } catch {
      const action = loginFailure("wrong credentials");
      dispatch(action);
    }
  };
  if (isAuth) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Login handleLogin={handleLogin} />
    </div>
  );
}

export { LoginPage };
