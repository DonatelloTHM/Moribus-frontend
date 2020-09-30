import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./AnimalSightingView.scss";
import SubmitAnimal from "./SubmitAnimal";

export const AnimalSightingView = () => {
  const selectedAnimal = useSelector(
    (state) => state.selectedAnimal.selectedAnimal
  );
  const [animalInfo, setAnimalInfo] = useState({
    name: "",
    info: "",
    danger_level: "",
    radius: 0,
    photo: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/animals?animal=${selectedAnimal}`)
      .then((res) => res.json())
      .then((data) => setAnimalInfo({ ...animalInfo, ...data }));
  }, [selectedAnimal]);
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
    <div className="sighting-form">
      <img src={animalInfo.photo} alt="animal" />

      <div className="resource-form">
        <SubmitAnimal />
        <h1>
          {animalInfo.name}
          <span className={danger_level()}>{animalInfo.danger_level}</span>
        </h1>

        {RichText()}
      </div>
    </div>
  );
};
