import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Lodader";
import {LinkCard} from "../components/LinkCard";

export const DetailLinkPage = () => {
  const {request, loading} = useHttp();
  const [link, setLink] = useState(null);
  const linkId = useParams().id;
  const {token} = useContext(AuthContext);

  const getLink = useCallback(async () => {
    try {
      const data = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setLink(data);
      console.log(data)
    } catch (e) {}

  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if(loading) {
    return <Loader/>
  }
  return (
    <>
      <h1>Detail Link page</h1>
      {!loading && link && <LinkCard link={link}/>}
    </>
  )
};
