import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import { updatePage } from "../../redux/actions/actions";
import Arrow from "../svg/arrow.js";

//! TO DO: revisar la paginacion, el 7 no se ve nada.
function Page() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const videogames = useSelector((state) => state.videogames);
  const numberOfVideoGamesperPages = 15;

  let countPage = [];
  for (
    let i = 0;
    i <= Math.ceil(videogames.length / numberOfVideoGamesperPages);
    i++
  ) {
    countPage.push(i);
  }

  const Start = currentPage * numberOfVideoGamesperPages;
  const End = Start + numberOfVideoGamesperPages;
  const page = videogames.slice(Start, End);

  return (
    <div className="Page">
      <div className="pagination">
        {videogames.length === 0 && <span>Loading...</span>}
        {videogames.length > 0 &&
          page.map(({ id, name, image, genres }) => (
            <Card key={id} name={name} image={image} genres={genres} />
          ))}
      </div>
      <div className="pagination">
        <button
          style={{ transform: "rotate(-90deg)" }}
          className="Previous"
          onClick={() => {
            if (currentPage > 1) {
              dispatch(updatePage(currentPage - 1));
            }
          }}
        >
          <Arrow />
        </button>
        <button
          style={{ transform: "rotate(90deg)" }}
          className="Next"
          onClick={() => {
            if (currentPage < countPage.length) {
              dispatch(updatePage(currentPage + 1));
            }
          }}
        >
          <Arrow />
        </button>
        <div className="pagination">
          {countPage.length > 0 &&
            countPage.map((num) => (
              <button
                disabled={false}
                onClick={(event) =>
                  dispatch(updatePage(parseInt(event.target.value)))
                }
                key={num}
                value={num}
              >
                {num}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Page;

/* import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import { UPDATE_PAGE } from "../../redux/actions/actions";
import Arrow from "../svg/arrow.js";

function Page() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const videogames = useSelector((state) => state.videogames);
  const numberOfVideoGamesperPages = 15;

  let countPage = [];
  for (let i = 1; i < videogames.length / numberOfVideoGamesperPages; i++) {
    countPage.push(i);
  }

  const Start = currentPage * numberOfVideoGamesperPages;
  const End = Start + numberOfVideoGamesperPages;
  const page = videogames.slice(Start, End);

  return (
    <div className="Page">
      <div className="pagination">
        {videogames.length === 0 && <span>Loading...</span>}
        {videogames.length > 0 &&
          page.map(({ id, name, image, genres }) => (
            <Card key={id} name={name} image={image} genres={genres} />
          ))}
      </div>
      <div className="pagination">
        <button
          style={{ transform: "rotate(-90deg)" }}
          className="Previous"
          onClick={() => dispatch(UPDATE_PAGE(currentPage - 1))}
        >
          <Arrow />
        </button>

        <div className="pagination">
          {countPage.length > 0 &&
            countPage.map((num) => (
              <button
                disabled={false}
                onClick={(event) =>
                  dispatch(UPDATE_PAGE(event.target.value - 1))
                }
                key={num}
                value={num}
              >
                {num}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
 */
