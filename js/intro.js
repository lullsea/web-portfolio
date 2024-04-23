const characters = document.querySelectorAll("#intro > span")

const totalSteps = Math.ceil(characters.length / 2);
const lullsea = "LULLSEA".split("")

function update(timer){
    characters[timer].innerHTML = lullsea[timer] + "&nbsp;"
    if(timer == characters.length - 1)
        return;
    else update(timer + 1);
}

window.addEventListener("load", () => {
    // characters.forEach((x,i) => {
    //     setTimeout(() => x.style.transform = "translateY(0px)", 100 * i)
    // })
    // Swoosh up
    for(let i = 0; i < totalSteps; i++){
        setTimeout(() => {
            characters[totalSteps + i - 1].style = "transform: translateY(0px); opacity: 1";
            characters[totalSteps - i - 1].style = "transform: translateY(0px); opacity: 1";
    }, 100 * i);
    }
    setTimeout(() => {
        characters.forEach(x => {
            x.innerHTML = "<div class='cover'></div>" + x.innerHTML;
        })
        const covers = document.querySelectorAll("#intro > span > .cover")
        setTimeout(() => covers.forEach(x => x.style.width = "50px"), 200);
        setTimeout(() => covers.forEach(x => {x.style.margin = "0 0 0 50px"; x.style.width = "0px"}), 400);
        setTimeout(() => characters.forEach((x, i) => x.innerHTML = lullsea[i] + "&nbsp;"), 515)
    }, 125 * characters.length);
    // Text transition
    setTimeout(() => {

    })
}
);