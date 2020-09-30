import React from "react";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";
import "./ResourcePopup.scss";

export const ResourcePopup = () => {
  const popupResource = useSelector(
    (state) => state.popupResource.popupResource
  );

  return (
    <div className="resource-popup">
      <img src={popupResource.photo} alt="Resource" />
      <div>
        <h1>{popupResource.resource}</h1>
        <h3>
          Spotted by <span>@{popupResource.username}</span> on{" "}
          <span>
            {DateTime.fromISO(popupResource.created_at).toFormat("ff")}
          </span>
        </h3>
      </div>
    </div>
  );
};
