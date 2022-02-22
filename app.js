console.log("js woking");
const nameE = document.getElementById("name");
const gender = document.getElementById("gender");
const statusE = document.getElementById("status");
const specie = document.getElementById("specie");
const created = document.getElementById("created");
const image = document.getElementById("image");
const characters = document.getElementById("characters");

(async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const { results } = await res.json();
  const fragment = document.createDocumentFragment();
  results.forEach((e) => {
    let { name, status, species, gender, image, created } = e;
    const div = document.createElement("div");
    let date = new Date(created);
    div.innerHTML = `

        <div class="card text-dark" style="width: 18rem;">
            <img src=${image} class="card-img-top" alt="...">
            <div class="card-body text-white bg-dark">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Gender: ${gender}</p>
                <p class="card-text">Specie: ${species}</p>
                <p class="card-text">Status: ${status}</p>
                <p class="card-text">Created: ${date.toDateString()}</p>
                <button href="#"  class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#exampleModal">Edit</button>
            </div>
        </div>
        `;
    div.querySelector("button").addEventListener("click", () => setCurrent(e));

    fragment.append(div);
  });
  characters.append(fragment);
})();

const CURRENT = new Proxy(
  {},
  {
    set(obj, prop, value) {
      console.log("set");
      obj[prop] = value;
      //   name, status, species, gender, image, created
      switch (prop) {
        case "name":
          nameE.value = value;
          break;
        case "status":
          statusE.value = value;
          break;
        case "species":
          specie.value = value;
          break;

        case "gender":
          gender.value = value;
          break;
        case "image":
          image.src = value;
          break;
        case "created":
          let newDate = new Date(value);
          console.log(newDate);
          created.value = newDate.toLocaleDateString();
          break;

        default:
          console.log("unknown prop", prop);
          break;
      }
    },
    get(obj, prop) {
      console.log("get");
      return obj[prop];
    },
  }
);

function setCurrent(obj) {
  Object.keys(obj).forEach((k) => {
    CURRENT[k] = obj[k];
  });
}
