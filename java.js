let menukort = [];
//find tekst på klikket knap

document.addEventListener("DOMContentLoaded", hentJson);

async function hentJson() {
    let jsonData = await fetch("menu.json");
    menukort = await jsonData.json();

    document.querySelector("nav").addEventListener("click", () => {

        let kategori = event.target.textContent.toLowerCase();
        if (kategori != "alle") {
            let kat = menukort.filter(madret => madret.kategori == kategori);
            visMenukort(kat, kategori);
        } else {
            visMenukort(menukort, kategori);
            document.querySelector("[data-overskrift]").textContent = "Menu"
        }
    });
    visMenukort(menukort, "menu");


    menukort.sort((a, b) => a.navn.localeCompare(b.navn));
    visMenukort(menukort);

}

function visMenukort(menukort, overskrift) {

    let temp = document.querySelector("[data-menutemplate]");
    let dest = document.querySelector("[data-menukort]");
    dest.innerHTML = "";
    document.querySelector("#overskrift").textContent = overskrift;

    menukort.forEach(madret => {
        let klon = temp.cloneNode(true).content;
        klon.querySelector("[data-navn]").textContent = madret.navn;
        klon.querySelector("[data-kortbeskrivelse]").textContent = madret.kortbeskrivelse;
        klon.querySelector("[data-pris]").textContent = "Pris: " + madret.pris + " kr.";


        klon.querySelector("[data-billede]").setAttribute("src", "imgs/small/" + madret.billede + "-sm.jpg");
        klon.querySelector("[data-billede]").alt = "billede af " + madret.navn;

        klon.querySelector(".food").setAttribute("data-id", madret.id);
        klon.querySelector(".food").addEventListener("click", openModal);


        dest.appendChild(klon);
    });

}

function openModal() {

    let myId = this.getAttribute("data-id");
    let single = menukort.find(food => {
        //hvis vores myId = food.id så vis indhold.
        if (myId == food.id) {
            document.querySelector("#popup").style.visibility = "visible";
            document.querySelector("[data-navn]").textContent = food.navn;
            document.querySelector("[data-langbeskrivelse]").textContent = food.langbeskrivelse;
            document.querySelector("[data-pris]").textContent = food.pris;
            document.querySelector("[data-popupBillede]").setAttribute("src", "imgs/small/" + food.billede + "-sm.jpg");

        }

    })
    console.log(myId);
}

let closeModal = document.querySelector(".close-content");
let modal = document.querySelector("#popup");
closeModal.onclick = function () {
    modal.style.visibility = "hidden";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.visibility = "hidden";
    }
}
