const characters = document.querySelectorAll("#intro > span")
const container = document.getElementById("intro")

const totalSteps = Math.ceil(characters.length / 2);
const lullsea = "lullsea".split("")

const generateRandomColor = () => '#' +Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');


function update(timer){
    characters[timer].innerHTML = lullsea[timer] + "&nbsp;"
    if(timer == characters.length - 1)
        return;
    else update(timer + 1);
}

// TODO: alot of optimization to be done here
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
        const icons = document.querySelectorAll("#intro > span > i");
        setTimeout(() => covers.forEach(x => x.style.width = "50px"), 300);
        // Cover color glitch
        setTimeout(() => {
            for(let i = 0; i < covers.length; i++)
                for(let j = 1; j < 12; j++)
                    setTimeout(() => {
                            covers[i].style.background = generateRandomColor()
                    }, 20 * j)
        }, 500)

        setTimeout(() => covers.forEach(x => {
            x.style.background = "black";
            x.style.margin = "0 0 0 50px";
            x.style.width = "0px"}), 1000);
            setTimeout(() => icons.forEach((x, i) => x.outerHTML = lullsea[i] + "&nbsp;"), 450)
    }, 125 * characters.length);
        setTimeout(() => {
            characters.forEach(x => x.style = "transition: .1s; transform: translateY(-50px); opacity: 0;")
            container.style = "opacity: 0; transition: 1s;";
            setTimeout(() => container.outerHTML = "", 200);
        }, 3000);
}
);