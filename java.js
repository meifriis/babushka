let menukort = [];


document.addEventListener("DOMContentLoaded", hentJson);

async function hentJson() {
    let jsonData = await fetch("menu.json");
    menukort = await jsonData.json();
    visMenukort(menukort);
};


function visMenukort(menukort) {

    let temp = document.querySelector(".menutemplate");
    let dest = document.querySelector(".menukort");


    menukort.forEach(madret => {
        let klon = temp.cloneNode(true).content;
        klon.querySelector(".navn").textContent = madret.navn;

        klon.querySelector(".kortbesrkivelse").textContent = madret.kortbeskrivelse;

        klon.querySelector(".pris").textContent = "Pris: " + madret.pris + " kr.";

        klon.querySelector(".billede").setAttribute("src", "imgs/small/" + madret.billede + "-sm.jpg");

        klon.querySelector(".billede").alt = "billede af" + madret.navn;

        dest.appendChild(klon);

    });

};
