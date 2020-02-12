import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const CreateLinkPage = () => {
  const history = useHistory();
  const [link, setLink] = useState("");
  const {request} = useHttp();
  const auth = useContext(AuthContext);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async event => {
    if(event.key === "Enter") {
      try {
        const data = await request("/api/link/generate", "POST", {from: link}, {
          Authorization: `Bearer ${auth.token}`
        });
        history.push(`/detail/${data.link._id}`)
      } catch (e) {
      }
    }
  };

  return (
    <div className="row">
      <h1>Create Link page</h1>

      <div className="col s8 offset-s2">
        <div className="input-field">
          <input
            placeholder="Input Link"
            id="link"
            type="text"
            value={link}
            onChange={event => setLink(event.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Input Link</label>
        </div>
      </div>
    </div>
  )
};
