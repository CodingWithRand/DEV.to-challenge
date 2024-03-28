let divStorage = {};
function createDivs(divNames, divStorage){
    for(let i = 0; i < divNames.length; i++){
        let div = document.createElement("div");
        divStorage[divNames[i]] = div;
    }
}

createDivs(["arrowArea", "customSelect"], divStorage);

divStorage.customSelect.classList.add("custom-select");

const arrowImg = document.createElement("img");
arrowImg.src = "imgs/down-arrow.png";
divStorage.arrowArea.classList.add("arrow-area");
divStorage.arrowArea.appendChild(arrowImg)
divStorage.customSelect.appendChild(divStorage.arrowArea)

window.onload = function () {
    const activitySelect = document.getElementById("activity-select");
    const form = document.querySelector("#camp-activities-inquiry form")
    divStorage.customSelect.appendChild(activitySelect)
    form.insertBefore(divStorage.customSelect, form.firstChild)



}
