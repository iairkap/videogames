/* Este formulario debe ser controlado completamente con JavaScritp. No se pueden utilizar validaciones HTML, ni utilizar librerías especiales para esto. Debe contar con los siguientes campos:

Nombre.
Imagen.
Descripción.
Plataformas.
Fecha de lanzamiento.
Rating.
Posibilidad de seleccionar/agregar varios géneros en simultáneo.
Botón para crear el nuevo videojuego.
[IMPORANTE]: es requisito que el formulario de creación esté validado sólo con JavaScript. Puedes agregar las validaciones que consideres. Por ejemplo: que el nombre del videojuego no pueda contener símbolos, o que el rating no pueda exceder determinado valor, etc. */

/* mport { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getVideoGames } from "../../redux/actions/actions";

function Create() {
  const dispatch = useDispatch();
}

const Form = () => {
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
    console.log("quiero hacer un cambio");
    //el evento es el cambio que se produce en el input, event.target me va a decir que input es el que se modifico. para que event me pueda decir quien fue le tengo que dar un nombre.
    const property = event.target.name;
    const value = event.target.value;
    validate({ ...form, [property]: value }); //le doy el valor del form y le digo que propiedad quiero cambiar y le doy el valor que quiero que tenga
    setForm({ ...form, [property]: value }); //el setform es un objeto
  };

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

  //el formulario tiene que ser el reflejo del estado, por eso se usa el useState

  return (
    <form>
      <div>
        <label>Nombre: </label>
        <input
          type="text"
          value={form.name}
          onChange={handleChange}
          name="name"
        />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label>Imagen: </label>
        <input
          value={form.image}
          placeholder="URL"
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
        />
        {errors.description && <p>{errors.description}</p>}
      </div>
      <div>
        <label>Plataformas: </label>
        <input
          type="text"
          value={form.platforms}
          onChange={handleChange}
          name="platforms"
        />
      </div>
      <div>
        <label>Fecha de lanzamiento: </label>
        <input
          type="text"
          value={form.releaseDate}
          onChange={handleChange}
          name="releaseDate"
        />
      </div>
      <div>
        <label>Rating: </label>
        <input
          type="text"
          value={form.rating}
          onChange={handleChange}
          name="rating"
        />
        <input type="button" value="Crear" onChange={handleChange} />
      </div>
    </form>
  );
};

export default Form; */

//necesito hacer un input para que el usuario pueda cargar una imagen, para eso voy a usar
