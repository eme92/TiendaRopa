import addEventsWithMutationObserver from "./addEventsWithMutationObserver.js";

export default function addFavorites() {
  addEventsWithMutationObserver(like, ".heart");
}

// function add(z){
function like(z) {
  const user = window.localStorage.getItem("session");
  const likeUser = user + "Likes";
  const id =
    z.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1]
      .childNodes[5].innerHTML;

  if (user) {
    // not like
    if (!z.target.classList.contains("like")) {
      agregarFavoritos(id, likeUser);
      z.target.classList.replace("far", "fas");
      z.target.classList.add("like");
    } else {
      // like
      eliminarFavoritos(id, likeUser);
      z.target.classList.replace("fas", "far");
      z.target.classList.remove("like");
    }
  } else
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "You must be loged first",
      showConfirmButton: false,
      timer: 500,
    });
}

/* Mostrar Favoritos */
function agregarFavoritos(id, user) {
  const data = JSON.parse(window.localStorage.getItem(user));
  const datalikes = { data: [] };

  if (!data) {
    datalikes.data.push(id);
    window.localStorage.setItem(user, JSON.stringify(datalikes));
  } else {
    datalikes.data.push(...data.data, id);
    window.localStorage.setItem(user, JSON.stringify(datalikes));
  }

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Guardado",
    showConfirmButton: false,
    timer: 500,
  });
}

/* Eliminar Favoritos */
function eliminarFavoritos(id, user) {
  const data = JSON.parse(window.localStorage.getItem(user));
  const datadislikes = { data: [] };
  const res = data.data.filter((itm) => itm != id);
  datadislikes.data = res;
  window.localStorage.setItem(user, JSON.stringify(datadislikes));

  Swal.fire({
    position: "center",
    icon: "warning",
    title: "Borrado",
    showConfirmButton: false,
    timer: 500,
  });
}
