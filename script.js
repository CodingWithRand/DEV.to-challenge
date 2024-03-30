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

createDOMElements("div", ["customSelect"], divStorage);
createDOMElements("img", ["h1Cloud1", "h1Cloud2", "h1Cloud3", "h1Cloud4", "h1Cloud5", "h1Cloud6", "h1Cloud7", "h1Cloud8", "h1Cloud9", "h1Cloud10", "bush"], imgStorage);

divStorage.customSelect.classList.add("custom-select");

imgStorage.h1Cloud1.src = "images/cloud.png";
imgStorage.h1Cloud1.classList.add("cloud");
imgStorage.h1Cloud1.style.width = "15vw";
imgStorage.h1Cloud1.style.top = "7vh";
imgStorage.h1Cloud1.style.animationDelay = "0s";
imgStorage.h1Cloud1.style.animationDuration = "30s";

imgStorage.h1Cloud2.src = "images/cloud.png";
imgStorage.h1Cloud2.classList.add("cloud");
imgStorage.h1Cloud2.style.width = "30vw";
imgStorage.h1Cloud2.style.height = "15vw";
imgStorage.h1Cloud2.style.top = "-3vh";
imgStorage.h1Cloud2.style.animationDelay = "0s";
imgStorage.h1Cloud2.style.animationDuration = "45s";

imgStorage.h1Cloud3.src = "images/cloud.png";
imgStorage.h1Cloud3.classList.add("cloud");
imgStorage.h1Cloud3.style.width = "18vw";
imgStorage.h1Cloud3.style.top = "4vh";
imgStorage.h1Cloud3.style.animationDelay = "3s";
imgStorage.h1Cloud3.style.animationDuration = "35s";

imgStorage.h1Cloud4.src = "images/cloud.png";
imgStorage.h1Cloud4.classList.add("cloud");
imgStorage.h1Cloud4.style.width = "10vw";
imgStorage.h1Cloud4.style.top = "1.5vh";
imgStorage.h1Cloud4.style.animationDelay = "5s";
imgStorage.h1Cloud4.style.animationDuration = "39s";

imgStorage.h1Cloud5.src = "images/cloud.png";
imgStorage.h1Cloud5.classList.add("cloud");
imgStorage.h1Cloud5.style.width = "15vw";
imgStorage.h1Cloud5.style.top = "5vh";
imgStorage.h1Cloud5.style.animationDelay = "10s";
imgStorage.h1Cloud5.style.animationDuration = "33s";

imgStorage.h1Cloud6.src = "images/cloud.png";
imgStorage.h1Cloud6.classList.add("cloud");
imgStorage.h1Cloud6.style.width = "25vw";
imgStorage.h1Cloud6.style.height = "10vw";
imgStorage.h1Cloud6.style.top = "-2vh";
imgStorage.h1Cloud6.style.animationDelay = "10s";
imgStorage.h1Cloud6.style.animationDuration = "42s";

imgStorage.h1Cloud7.src = "images/cloud.png";
imgStorage.h1Cloud7.classList.add("cloud");
imgStorage.h1Cloud7.style.width = "18vw";
imgStorage.h1Cloud7.style.top = "4vh";
imgStorage.h1Cloud7.style.animationDelay = "13s";
imgStorage.h1Cloud7.style.animationDuration = "35s";

imgStorage.h1Cloud8.src = "images/cloud.png";
imgStorage.h1Cloud8.classList.add("cloud");
imgStorage.h1Cloud8.style.width = "12vw";
imgStorage.h1Cloud8.style.top = "2vh";
imgStorage.h1Cloud8.style.animationDelay = "15ss";
imgStorage.h1Cloud8.style.animationDuration = "37s";

imgStorage.h1Cloud9.src = "images/cloud.png";
imgStorage.h1Cloud9.classList.add("cloud");
imgStorage.h1Cloud9.style.width = "8vw";
imgStorage.h1Cloud9.style.top = "4vh";
imgStorage.h1Cloud9.style.animationDelay = "18s";
imgStorage.h1Cloud9.style.animationDuration = "35s";

imgStorage.h1Cloud10.src = "images/cloud.png";
imgStorage.h1Cloud10.classList.add("cloud");
imgStorage.h1Cloud10.style.width = "40vw";
imgStorage.h1Cloud10.style.height = "20vw";
imgStorage.h1Cloud10.style.top = "-10vh";
imgStorage.h1Cloud10.style.animationDelay = "22s";
imgStorage.h1Cloud10.style.animationDuration = "50s";

imgStorage.bush.src = "images/bush.png";
imgStorage.bush.classList.add("bush-btn-bg")

window.onload = function () {
    const activitySelect = document.getElementById("activity-select");
    const form = document.querySelector("#camp-activities-inquiry form");
    divStorage.customSelect.appendChild(activitySelect);
    form.insertBefore(divStorage.customSelect, form.firstChild);
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
    form.parentNode.appendChild(imgStorage.bush)
    createCustomSelect();
}
