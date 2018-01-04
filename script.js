//---JSON data---
const DATA = {
  name: "Frontend",
  skills: [
    {
      name: "HTML & CSS",
      skills: [
        {
          name: "Understanding block, inline and table models"
        },
        {
          name: "Stylesheets",
          skills: [
            {
              name: "Positioning",
              skills: [
                {
                  name: "static, relative and absolute, fixed, sticky"
                }
              ]
            },
            {
              name: "Understanding of box model"
            },
            {
              name: "Understanding floating"
            }
          ]
        }
      ]
    },
    {
      name: "JavaScript",
      skills: [
        {
          name: "Core",
          skills: [
            {
              name: "DOM"
            },
            {
              name: "Events"
            },
            {
              name: "Data structures",
              skills: [
                {
                  name: "Primitives and limitations"
                },
                {
                  name: "Object"
                }
              ]
            }
          ]
        },
        {
          name: "Approaches",
          skills: [
            {
              name: "OOP",
              skills: [
                {
                  name: "Class"
                },
                {
                  name: "Prototypes"
                }
              ]
            },
            {
              name: "Asynchronous programming"
            }
          ]
        },
        {
          name: "Frameworks & libraries",
          skills: [
            {
              name: "React"
            },
            {
              name: "jQuery"
            }
          ]
        }
      ]
    }
  ]
};

//---functions---
isEmptyObject = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

createLI = (parent, data) => {
  let li = document.createElement("li");
  let liSpan = document.createElement("span");
  liSpan.innerHTML = data.name;
  li.appendChild(liSpan);
  parent.appendChild(li);
  return li;
};

createUL = (parent) => {
  let ul = document.createElement("ul");
  let img = document.createElement("img");
  img.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/29841/arrow.png";
  img.classList.add("img--opened");
  ul.classList.add("ul--opened");
  parent.insertBefore(img, parent.firstChild);
  parent.appendChild(ul);
  return ul;
};

createBranch = (parent, data) => {
  let arr = data;
  for (let i = 0; i<arr.length; i++) {
    let li = createLI(parent, arr[i]);
    if (arr[i].hasOwnProperty("skills")) {
      let ul = createUL(li);
      createBranch(ul, arr[i].skills);
    }
  }
};

handleClick = (event) => {
  if (event.target.tagName === "SPAN") {
    let li = event.target.parentNode;
    let children = li.getElementsByTagName("ul")[0];
    if (children) {
      children.classList.toggle("ul--opened");
      children.classList.toggle("ul--closed");
      li.getElementsByTagName("img")[0].classList.toggle("img--closed");
    }
  }
};

renderTree = (list) => {
  let li = list.getElementsByTagName("li");
  for (let i=0; i < li.length; i++) {
    if (li[i].childElementCount === 1) {
      li[i].classList.add("li--not-clickable");
    } else {
      li[i].classList.add("li--clickable");
    }
  }
};

createTree = () => {
  let list = document.createElement("ul");
  list.addEventListener("click", handleClick);
  createBranch(list, DATA.skills);
  renderTree(list);
  return list;
};

//---code---
let root = document.getElementById("root");
let title = document.createElement("p");
title.classList.add("root__title");
if (isEmptyObject(DATA)) {
  title.innerHTML = "Data is empty. Please, check JSON file."
} else {
  title.innerHTML = DATA.name;
  root.appendChild(title);
  root.appendChild(createTree());
}