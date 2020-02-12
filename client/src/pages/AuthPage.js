import React, {useEffect, useState, useContext} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {getError} from "../helpers/helper";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, error, request, errorData, clearError, clearErrorData} = useHttp();
  const [form, setFrom] = useState({email: "", password: ""});

  useEffect(() => {
    message(error && error.message);
    clearError();
  }, [error, message, errorData, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = event => {
    setFrom({...form, [event.target.name]: event.target.value})
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", {...form});
      auth.login(data.token, data.userId);
      clearErrorData()
    } catch (e) {}
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", {...form});
      message(data.message);
      clearErrorData()
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Short Link</h1>
        <div className="card">
          <div className="card-content">
            <span className="card-title">Authentication</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Email"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
                <span className="invalid">{getError(errorData, "email")}</span>
              </div>
              <div className="input-field">
                <input
                  placeholder="Password"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
                <span className="invalid">{getError(errorData, "password")}</span>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn"
              onClick={loginHandler}
              disabled={loading}
            >
              Log in
            </button>
            <button
              className="btn purple lighten-2"
              onClick={registerHandler}
              disabled={loading}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};
