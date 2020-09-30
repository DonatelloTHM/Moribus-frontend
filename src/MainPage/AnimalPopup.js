import React, { useEffect, useState } from "react";
import "./AnimalPopup.scss";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";

const AnimalPopup = () => {
  const popupAnimal = useSelector((state) => state.popupAnimal.popupAnimal);

  const [animalInfo, setAnimalInfo] = useState({
    name: "",
    info: "",
    danger_level: "",
    radius: 0,
    photo: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/animals?animal=${popupAnimal.animal}`)
      .then((res) => res.json())
      .then((data) => setAnimalInfo({ ...animalInfo, ...data }));
  }, [popupAnimal.animal]);
  const createMarkup = () => {
    return {
      __html: animalInfo.info,
    };
  };

  const RichText = () => {
    return <div dangerouslySetInnerHTML={createMarkup()} />;
  };

  const danger_level = () => {
    return animalInfo.danger_level.toLowerCase().replace(" ", "-");
  };

  return (
    <div className="animal-popup">
      <img src={animalInfo.photo} alt="animal" />

      <div className="resource-form">
        <h3>
          Spotted by <span>@{popupAnimal.username}</span> on{" "}
          <span>{DateTime.fromISO(popupAnimal.created_at).toFormat("ff")}</span>
        </h3>
        <h1>
          {animalInfo.name}
          <span className={danger_level()}>{animalInfo.danger_level}</span>
        </h1>

        {RichText()}
      </div>
    </div>
  );
};

export default AnimalPopup;
