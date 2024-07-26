const characterCard = ({name, species, status, image}) => {

   return  `<div class="card"> 
   <h2>${name}</h2>
   <h3 class ="species">${species}</h3>
   <h4>${status}</h4>
   <img src=${image}>
   </div>`;
}

const charactersComponent = (charactersData) => `
    <div class="characters">
    ${charactersData.map(characterData => characterCard(characterData)).join("")}
    </div)
`;

const nextButtonComponent = (type) => `
<button class=${type}>${type}</button>
`


const makeDomFromData = (data, rootElement) => {
    rootElement.innerHTML = "";
    console.log(data)


 if(data.info.next) rootElement.insertAdjacentHTML("beforeend", nextButtonComponent("next"))
 if(data.info.prev) rootElement.insertAdjacentHTML("beforeend", nextButtonComponent("prev"))

    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.addEventListener("click", () => fetch(data.info[button.classList[0]])
        .then(res => res.json())
        .then(newData => makeDomFromData(newData,rootElement))
))
   rootElement.insertAdjacentHTML("beforeend",charactersComponent(data.results));
//     rootElement.insertAdjacentHTML("beforeend",nextButtonComponent("next"));
//     rootElement.insertAdjacentHTML("beforeend",nextButtonComponent("prev"));
//     rootElement.insertAdjacentHTML("beforeend",charactersComponent(data.results));
    
//     const nextButtonElement = document.querySelector("button.next");
//     if (data.info.next) {
// nextButtonElement.addEventListener("click", () => {
//     fetch(data.info.next)
//         .then(res => res.json())
//         .then(newData => makeDomFromData(newData, rootElement));
// })

// } else {
//     nextButtonElement.disabled = true;
// }

// const prevButtonElement = document.querySelector("button.prev");
// if (data.info.prev) {
//     prevButtonElement.addEventListener("click", () => {
//         fetch(data.info.prev)
//             .then(res => res.json())
//             .then(newData => makeDomFromData(newData, rootElement));
//     });
// } else {
//     prevButtonElement.disabled = true;
// }
};



fetch("https://rickandmortyapi.com/api/character")
.then((response) => response.json())
.then((data) =>{
    console.log(data);
    const rootElement = document.querySelector("#root")

    document.querySelector("#root").insertAdjacentHTML("beforeend", charactersComponent(data.results));
    makeDomFromData(data, rootElement);

    // const nextButtonElement = document.querySelector("button")
    // nextButtonElement.addEventListener("click", () => {
    //     fetch(data.info.next)
    //         .then(res => res.json())
    //         .then(newData => {
    //             console.log(newData);
    //             makeDomFromData(newData,rootElement);
    //             const newNextButtonElement = document.querySelector("button")
    //             newNextButtonElement.addEventListener("click",() => {
    //                 console.log("fetch next page");
    //                 fetch(newData.info.next)
    //                     .then(res2 => res2.json())
    //                     .then(evenNewerData => {
    //                         console.log(evenNewerData);
    //                         makeDomFromData(evenNewerData, rootElement);
    //                         const evenNewerNextButton = document.querySelector("button");
    //                     })
    //             })
    //         })
    // })
})