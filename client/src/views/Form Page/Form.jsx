import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideoGames } from "../../redux/actions/actions";
import axios from "axios";

const Form = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    platforms: "",
    releaseDate: "",
    rating: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    description: "",
    platforms: "",
    releaseDate: "",
    rating: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    validate({ ...form, [property]: value });
    setForm({ ...form, [property]: value });
  };

  //modularizar el validate
  const validate = (form) => {
    const nameRegex = /^[\w\s.,:;!()&%$#@?/\\-]+$/i;

    if (!form.image) {
      setErrors({ ...errors, image: "La imagen es obligatoria" });
    } else if (!form.image.includes("https://")) {
      setErrors({ ...errors, image: "La imagen debe ser una URL" });
    } else {
      setErrors({ ...errors, image: "" });
    }

    if (!form.name) {
      setErrors({ ...errors, name: "El nombre es obligatorio" });
    } else if (!nameRegex.test(form.name)) {
      setErrors({
        ...errors,
        name: "El nombre solo puede contener letras, números y caracteres especiales permitidos",
      });
    } else {
      setErrors({ ...errors, name: "" });
    }

    if (!form.description) {
      setErrors({ ...errors, description: "La descripción es obligatoria" });
    }

    if (!form.rating) {
      setErrors({ ...errors, rating: "El rating es obligatorio" });
    } else if (isNaN(form.rating) || form.rating < 1 || form.rating > 100) {
      setErrors({
        ...errors,
        rating: "El rating debe ser un número entre 1 y 100",
      });
    } else {
      setErrors({ ...errors, rating: "" });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(errors).every((error) => error === "")) {
      dispatch(getVideoGames(form));
      setForm({
        name: "",
        image: "",
        description: "",
        platforms: "",
        releaseDate: "",
        rating: "",
      });
    }
  };

  const createVideoGame = async (form) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/videogame",
        form
      );
      const videogame = response.data;
      console.log("Video game created:", videogame);
    } catch (error) {
      console.error("Error creating video game:", error);
    }
  }; //el create no tiene que ser del estado global, nada mas lo utilizo como estado local en esta vista.

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre: </label>
        <input
          type="text"
          value={form.name}
          onChange={handleChange}
          name="name"
          placeholder={errors.name}
        />
      </div>
      <div>
        <label>Imagen: </label>
        <input
          value={form.image}
          placeholder={errors.image || "URL"}
          autoComplete="off"
          name="image"
          type="url"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Descripción: </label>
        <input
          type="text"
          value={form.description}
          onChange={handleChange}
          name="description"
          placeholder={errors.description}
        />
      </div>
      <div>
        <label>Plataformas: </label>
        <input
          type="text"
          value={form.platforms}
          onChange={handleChange}
          name="platforms"
          placeholder={errors.platforms}
        />
      </div>
      <div>
        <label>Fecha de lanzamiento: </label>
        <input
          type="text"
          value={form.releaseDate}
          onChange={handleChange}
          name="releaseDate"
          placeholder={errors.releaseDate}
        />
      </div>
      <div>
        <label>Rating: </label>
        <input
          type="text"
          value={form.rating}
          onChange={handleChange}
          name="rating"
          placeholder={errors.rating}
        />
        <input type="submit" value="Crear" />
      </div>
    </form>
  );
};

export default Form;
