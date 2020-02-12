import React from "react";

export const LinkCard = ({link}) => {
  return (
    <>
      <p>Your Link: <a href={link.to} target="_balnk" rel="noopener norefer">{link.to}</a></p>
      <p>From : <a href={link.from} target="_balnk" rel="noopener norefer">{link.from}</a></p>
      <p>Count clicks on link: <strong>{link.clicks}</strong></p>
      <p>Creating date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
    </>
  )
};
