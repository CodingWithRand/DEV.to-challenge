let divStorage = {};
let imgStorage = {};
function createDOMElements(elemType, names, storage) {
    for (let i = 0; i < names.length; i++) {
        let element = document.createElement(elemType);
        storage[names[i]] = element;
    }
}

function createCustomSelect() {
    let x, i, j, l, ll, selElmnt, a, b, c;
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        const hoverEffect = document.createElement("div");
        hoverEffect.classList.add("selected-hover-effect");
        const currentSelected = document.createElement("div");
        currentSelected.id = "current-selected";
        currentSelected.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        const arrowArea = document.createElement("div");
        arrowArea.classList.add("arrow-area");
        const arrowImg = document.createElement("img");
        arrowImg.src = "images/down-arrow.png";
        arrowArea.appendChild(arrowImg);
        a.appendChild(currentSelected);
        a.appendChild(hoverEffect);
        a.appendChild(arrowArea);
        x[i].appendChild(a);
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        divStorage.customSelect.onmouseenter = function () {
            hoverEffect.style.width = "100%";
            hoverEffect.style.opacity = 1;
        }
        divStorage.customSelect.onmouseleave = function () {
            if (b.classList.contains("select-hide")) {
                hoverEffect.style.width = "0";
                hoverEffect.style.opacity = 0;
            }
        }
        a.onclick = function () {
            if (b.classList.contains("select-hide")) {
                arrowArea.firstChild.style.rotate = "180deg"
            } else {
                arrowArea.firstChild.style.rotate = "0deg"
            }
        }
        for (j = 0; j < ll; j++) {
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;

            c.addEventListener("click", function (e) {
                var y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.querySelector("#current-selected").innerHTML = this.innerHTML;
                        document.querySelector(".selected-activity-img").style.transform = `rotateY(${i * 180}deg)`;
                        setTimeout(() => document.querySelector(".selected-activity-img").src = `images/${this.innerHTML === "--Please choose an option--" ? "camping" : this.innerHTML.toLowerCase()}.png`, 200);
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.classList.add("same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);

        a.nextSibling.style.display = "none";
        a.nextSibling.style.opacity = 0;
        a.nextSibling.style.transform = "translateY(-20%)";
        a.nextSibling.style.transition = "transform 0.4s ease-in-out, opacity 0.4s 0.15s ease-in-out";

        a.addEventListener("click", async function (e) {
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            if(this.nextSibling.style.display === "none"){
                this.classList.toggle("select-arrow-active");
                this.nextSibling.style.transition = "transform 0.4s ease-in-out, opacity 0.4s 0.15s ease-in-out";
                this.nextSibling.style.display = "block";
                setTimeout(() => {
                    this.nextSibling.style.opacity = 1;
                    this.nextSibling.style.transform = "translateY(0)";
                }, 10);
            }
            else if(this.nextSibling.style.display === "block"){
                this.nextSibling.style.transition = "transform 0.4s 0.15s ease-in-out, opacity 0.4s ease-in-out";
                this.nextSibling.style.opacity = 0;
                this.nextSibling.style.transform = "translateY(-20%)";
                await new Promise(resolve => setTimeout(() => {
                    this.nextSibling.style.display = "none";
                    this.classList.toggle("select-arrow-active");
                    resolve();
                }, 600))
            }
        });
    }
    async function closeAllSelect(elmnt) {
        let x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                setTimeout(() => y[i].classList.remove("select-arrow-active"), 600);
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i) !== i) {
                x[i].classList.add("select-hide");
                document.querySelector(".arrow-area img").style.rotate = "0deg";
                document.querySelector(".selected-hover-effect").style.width = "0";
                document.querySelector(".selected-hover-effect").style.opacity = 0;
                x[i].style.transition = "transform 0.4s 0.15s ease-in-out, opacity 0.4s ease-in-out";
                x[i].style.opacity = 0;
                x[i].style.transform = "translateY(-20%)";
                await new Promise(resolve => setTimeout(() => {
                    x[i].style.display = "none";
                    resolve();
                }, 600))
            }
        }
    }

    document.addEventListener("click", closeAllSelect);
}

createDOMElements("div", ["customSelect", "activitySelectionSection", "selectedActivity", "foodAllergiesSection", "additionSection", "submitBtnCover", "leafEffectScreen"], divStorage);
createDOMElements("img", ["h1Cloud1", "h1Cloud2", "h1Cloud3", "h1Cloud4", "h1Cloud5", "h1Cloud6", "h1Cloud7", "h1Cloud8", "h1Cloud9", "h1Cloud10", "bush1", "bush2", "selectedActivityImg", "leaf1", "leaf2"], imgStorage);

divStorage.activitySelectionSection.classList.add("activity-selection-section");
divStorage.selectedActivity.classList.add("selected-activity");
divStorage.foodAllergiesSection.classList.add("food-allergies-section");
divStorage.additionSection.classList.add("addition-section");
divStorage.leafEffectScreen.classList.add("effect-area");

divStorage.customSelect.classList.add("custom-select");

imgStorage.h1Cloud1.src = "images/cloud.png";
imgStorage.h1Cloud1.classList.add("cloud");
imgStorage.h1Cloud1.style.width = "15vw";
imgStorage.h1Cloud1.style.top = "7vh";
imgStorage.h1Cloud1.style.animationDelay = "0s";
imgStorage.h1Cloud1.style.animationDuration = "60s";

imgStorage.h1Cloud2.src = "images/cloud.png";
imgStorage.h1Cloud2.classList.add("cloud");
imgStorage.h1Cloud2.style.width = "30vw";
imgStorage.h1Cloud2.style.height = "15vw";
imgStorage.h1Cloud2.style.top = "-3vh";
imgStorage.h1Cloud2.style.animationDelay = "0s";
imgStorage.h1Cloud2.style.animationDuration = "75s";

imgStorage.h1Cloud3.src = "images/cloud.png";
imgStorage.h1Cloud3.classList.add("cloud");
imgStorage.h1Cloud3.style.width = "18vw";
imgStorage.h1Cloud3.style.top = "4vh";
imgStorage.h1Cloud3.style.animationDelay = "3s";
imgStorage.h1Cloud3.style.animationDuration = "65s";

imgStorage.h1Cloud4.src = "images/cloud.png";
imgStorage.h1Cloud4.classList.add("cloud");
imgStorage.h1Cloud4.style.width = "10vw";
imgStorage.h1Cloud4.style.top = "1.5vh";
imgStorage.h1Cloud4.style.animationDelay = "5s";
imgStorage.h1Cloud4.style.animationDuration = "69s";

imgStorage.h1Cloud5.src = "images/cloud.png";
imgStorage.h1Cloud5.classList.add("cloud");
imgStorage.h1Cloud5.style.width = "15vw";
imgStorage.h1Cloud5.style.top = "5vh";
imgStorage.h1Cloud5.style.animationDelay = "10s";
imgStorage.h1Cloud5.style.animationDuration = "63s";

imgStorage.h1Cloud6.src = "images/cloud.png";
imgStorage.h1Cloud6.classList.add("cloud");
imgStorage.h1Cloud6.style.width = "25vw";
imgStorage.h1Cloud6.style.height = "10vw";
imgStorage.h1Cloud6.style.top = "-2vh";
imgStorage.h1Cloud6.style.animationDelay = "10s";
imgStorage.h1Cloud6.style.animationDuration = "72s";

imgStorage.h1Cloud7.src = "images/cloud.png";
imgStorage.h1Cloud7.classList.add("cloud");
imgStorage.h1Cloud7.style.width = "18vw";
imgStorage.h1Cloud7.style.top = "4vh";
imgStorage.h1Cloud7.style.animationDelay = "13s";
imgStorage.h1Cloud7.style.animationDuration = "65s";

imgStorage.h1Cloud8.src = "images/cloud.png";
imgStorage.h1Cloud8.classList.add("cloud");
imgStorage.h1Cloud8.style.width = "12vw";
imgStorage.h1Cloud8.style.top = "2vh";
imgStorage.h1Cloud8.style.animationDelay = "15ss";
imgStorage.h1Cloud8.style.animationDuration = "67s";

imgStorage.h1Cloud9.src = "images/cloud.png";
imgStorage.h1Cloud9.classList.add("cloud");
imgStorage.h1Cloud9.style.width = "8vw";
imgStorage.h1Cloud9.style.top = "4vh";
imgStorage.h1Cloud9.style.animationDelay = "18s";
imgStorage.h1Cloud9.style.animationDuration = "65s";

imgStorage.h1Cloud10.src = "images/cloud.png";
imgStorage.h1Cloud10.classList.add("cloud");
imgStorage.h1Cloud10.style.width = "40vw";
imgStorage.h1Cloud10.style.height = "20vw";
imgStorage.h1Cloud10.style.top = "-10vh";
imgStorage.h1Cloud10.style.animationDelay = "22s";
imgStorage.h1Cloud10.style.animationDuration = "80s";

imgStorage.bush1.src = "images/bush.png";
imgStorage.bush1.classList.add("bush")
imgStorage.bush1.style.left = 0;
imgStorage.bush2.src = "images/bush.png";
imgStorage.bush2.classList.add("bush")
imgStorage.bush2.style.right = 0;
imgStorage.bush2.style.transform = "scaleX(-1)"

for(const [i, leaf] of [imgStorage.leaf1, imgStorage.leaf2].entries()){
    leaf.src = "images/leaf.png";
    leaf.classList.add("leaf");
    leaf.style.animationName = "leaf-away-" + (i + 1);
    leaf.style.animationDelay = `${i * 0.15}s`;
    leaf.cloneNode(true);
};

function showLeaves (e) {
    imgStorage.leaf1.style.left = e.clientX + "px";
    imgStorage.leaf1.style.top = e.clientY + "px";
    imgStorage.leaf2.style.left = e.clientX + "px";
    imgStorage.leaf2.style.top = (e.clientY - 10) + "px";
    divStorage.leafEffectScreen.appendChild(imgStorage.leaf1);
    divStorage.leafEffectScreen.appendChild(imgStorage.leaf2);
}

async function jobDelay(callback, ms, variable){
    await new Promise(resolve => setTimeout(() => {
        callback(variable);
        resolve();
    }), ms)
}

const sheddingBush = (e) => jobDelay(showLeaves, 1000, e);
let cuo = [true, true]
const touchingBush = (e, i) => {
    if(cuo[i]) e.target.style.width = "15rem";
    else e.target.style.width = "30rem";
    cuo[i] = !cuo[i];
    showLeaves(e); 
}

imgStorage.bush1.onmousemove = sheddingBush;
imgStorage.bush2.onmousemove = sheddingBush;
imgStorage.bush1.onclick = (e) => touchingBush(e, 0);
imgStorage.bush2.onclick = (e) => touchingBush(e, 1);

imgStorage.selectedActivityImg.src = "images/camping.png";
imgStorage.selectedActivityImg.classList.add("selected-activity-img");

window.onload = function () {
    const activitySelect = document.getElementById("activity-select");
    const activitySelectLabel = document.querySelector("label[for='activity-select']");
    const foodAllergies = document.getElementById("food-allergies");
    const foodAllergiesLabel = document.querySelector("label[for='food-allergies']");
    const additionalInfo = document.getElementById("additional-info");
    const additionalInfoLabel = document.querySelector("label[for='additional-info']");
    const submitBtn = document.querySelector("button[type='submit']");
    const form = document.querySelector("#camp-activities-inquiry form");
    divStorage.customSelect.appendChild(activitySelect);
    divStorage.activitySelectionSection.appendChild(activitySelectLabel);
    divStorage.activitySelectionSection.appendChild(divStorage.customSelect);
    divStorage.selectedActivity.appendChild(imgStorage.selectedActivityImg);
    divStorage.foodAllergiesSection.appendChild(foodAllergiesLabel);
    divStorage.foodAllergiesSection.appendChild(foodAllergies);
    divStorage.additionSection.appendChild(additionalInfoLabel);
    divStorage.additionSection.appendChild(additionalInfo);
    divStorage.submitBtnCover.appendChild(submitBtn);
    divStorage.submitBtnCover.style.gridColumn = "1 / span 2"
    form.insertBefore(divStorage.additionSection, form.firstElementChild);
    form.insertBefore(divStorage.foodAllergiesSection, form.firstElementChild);
    form.insertBefore(divStorage.selectedActivity, form.firstElementChild);
    form.insertBefore(divStorage.activitySelectionSection, form.firstElementChild);
    form.appendChild(divStorage.submitBtnCover);
    form.parentNode.insertBefore(imgStorage.h1Cloud1, form.parentNode.firstChild);
    form.parentNode.insertBefore(imgStorage.h1Cloud2, form.parentNode.firstChild);
    form.parentNode.insertBefore(imgStorage.h1Cloud3, form.parentNode.firstChild);
    form.parentNode.insertBefore(imgStorage.h1Cloud4, form.parentNode.firstChild);
    form.parentNode.insertBefore(imgStorage.h1Cloud5, form.parentNode.firstChild);
    form.parentNode.insertBefore(imgStorage.h1Cloud6, form.parentNode.firstChild);
    form.parentNode.insertBefore(imgStorage.h1Cloud7, form.parentNode.firstChild);
    form.parentNode.insertBefore(imgStorage.h1Cloud8, form.parentNode.firstChild);
    form.parentNode.insertBefore(imgStorage.h1Cloud9, form.parentNode.firstChild);
    form.parentNode.insertBefore(imgStorage.h1Cloud10, form.parentNode.firstChild);
    form.parentNode.appendChild(imgStorage.bush1)
    form.parentNode.appendChild(imgStorage.bush2)
    form.parentNode.appendChild(divStorage.leafEffectScreen);
    createCustomSelect();

    let animatingElements = [];
    
    form.parentNode.querySelector("h1").classList.add("animated", "hidden");
    divStorage.selectedActivity.classList.add("animated");
    divStorage.selectedActivity.style.opacity = 0;
    for(const section of [ divStorage.activitySelectionSection, divStorage.selectedActivity, divStorage.foodAllergiesSection, divStorage.additionSection ]){
        for(const child of section.children){
            child.classList.add("animated", "hidden");
            animatingElements.push(child);
        }
    };
    divStorage.submitBtnCover.classList.add("animated", "hidden");
    animatingElements.push(divStorage.submitBtnCover);

    document.querySelector("#camp-activities-inquiry").style.display = "block";

    (async () => {
        await new Promise(resolve => setTimeout(() => {
            form.parentNode.querySelector("h1").classList.remove("hidden");
            resolve();
        }, 500))
        for (const [i, element] of animatingElements.entries()) {
            await new Promise(resolve => setTimeout(() => {
                if(element.classList.contains("selected-activity-img")){
                    divStorage.selectedActivity.style.opacity = 1;
                    element.classList.remove("animated")
                    element.style.transform = "translateY(0) rotateY(720deg)";
                }
                element.classList.remove("hidden");
                element.classList.add("appeared");
                resolve();
            }, i === 0 ? 500 : 100));
        }
        setTimeout(() => { for(const textarea of document.querySelectorAll("textarea")) textarea.classList.remove("animated") }, 500);
    })();

}
