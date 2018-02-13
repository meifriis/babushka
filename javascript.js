let menukort = [];


document.addEventListener("DOMContentLoaded", hentJson);

async function hentJson() {
    let jsonData = await fetch("menu.json");
    menukort = await jsonData.json();
    visMenukort(menukort, "Menu");
    lavFiltre();
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
            //console.log(food.id);
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
        modal.style.display = "none";
    }
}


function lavFiltre() {

    let forretter = menukort.filter(madret => madret.kategori == "forretter");
    let hovedretter = menukort.filter(madret => madret.kategori == "hovedretter");
    let sideorders = menukort.filter(madret => madret.kategori == "sideorders");
    let desserter = menukort.filter(madret => madret.kategori == "desserter");
    let drikkevarer = menukort.filter(madret => madret.kategori == "drikkevarer");


    //kald visRetter med de nye arrays

    document.querySelector(".title").addEventListener("click", () => {
        location.href = "index.html";
    });

    document.querySelector("#filter-alle").addEventListener("click", () => {
        visMenukort(menukort, "Menu");
    });

    document.querySelector("#filter-forretter").addEventListener("click", () => {
        visMenukort(forretter, "Forretter");

    });

    document.querySelector("#filter-sideorders").addEventListener("click", () => {
        visMenukort(sideorders, "Sideorders");

    });

    document.querySelector("#filter-hovedretter").addEventListener("click", () => {
        visMenukort(hovedretter, "Hovedretter");

    });

    document.querySelector("#filter-desserter").addEventListener("click", () => {
        visMenukort(desserter, "Desserter");

    });

    document.querySelector("#filter-drikkevarer").addEventListener("click", () => {
        visMenukort(drikkevarer, "Drikkevarer");

    });
}
