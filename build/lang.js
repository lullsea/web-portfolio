const checkboxes = document.querySelectorAll('.folder > input[type="checkbox"]');
let current = null;

const disableAllCheckboxes = (y) => checkboxes.forEach(x => {if(x != y) x.checked = false});
disableAllCheckboxes(null);

function positionSvg(startPos, offsetX = 0, offsetY = 0){
    let container = document.getElementById("svg-anims");
    const pos2 = document.querySelector(".col-2").getBoundingClientRect();
    const posY = window.scrollY + startPos.top + offsetY
    const posX = window.scrollX + startPos.left + offsetX
    const line1 = container.querySelector("#linedown1");
    const line2 = container.querySelector("#linedown2");

    // Calculate how far the line needs to reach down based on window width
    let tmp1 = window.innerWidth > 1375 ? pos2.height / 2.3 : window.scrollY + pos2.top;
    let tmp2 = window.innerWidth > 1375 ? pos2.left : posX;

    line1.setAttribute("x1", posX);
    line1.setAttribute("x2", posX);
    line1.setAttribute("y1", posY);
    line1.setAttribute("y2", tmp1);

    line1.style.strokeDasharray = `${tmp1 - posY}px`;
    line1.style.strokeDashoffset = `${tmp1 - posY}px`;


    line2.setAttribute("x1", posX);
    line2.setAttribute("x2", tmp2);
    line2.setAttribute("y1", tmp1);
    line2.setAttribute("y2", tmp1);

    line2.style.strokeDasharray = `${tmp2 - posX}px`;
    line2.style.strokeDashoffset = `${tmp2 - posX}px`;

    // Do Animation
    setTimeout(() => {
        line1.style.transition = '.2s';
        line1.style.strokeDashoffset = 0
        setTimeout(() => {
            line2.style.transition = '.4s';
            line2.style.strokeDashoffset = 0;
            line1.style.strokeDashoffset = `-${tmp1 - posY}px`;
            setTimeout(() => line2.style.strokeDashoffset = `-${tmp2 - posX}px`, 100)
            setTimeout(() => {line1.style.transition = 'none'; line2.style.transition = 'none'}, 300)
        }, 200)
    }, 50);
}

function toggleStyles() {

    checkboxes.forEach(x => {
        const parent = x.parentElement;
        const folder = x.parentElement.querySelector(".folder-ico");
        const icon =  x.parentElement.querySelector(".lang-ico");
        const folderPos = folder.getBoundingClientRect();

        if(x.checked){
            current = x;
            folder.classList.replace("fa-folder-closed", "fa-folder-open");
            parent.classList.add("active");
            positionSvg(folderPos, folderPos.width / 2, folderPos.height + 22);
        }else{
            if(x == current)
                current = null;
            icon.style.opacity = 1;
            folder.classList.replace("fa-folder-open", "fa-folder-closed");
            parent.classList.remove("active");
        }

    })
}

// Reposition svgs
window.addEventListener('resize', () => {
    if(current != null){
        const pos = current.getBoundingClientRect();
        positionSvg(pos, pos.width/2, pos.height - 12);
    }
})

checkboxes.forEach(x => x.addEventListener("change", () => {
    if(x.checked){
        disableAllCheckboxes(x);
    }
    toggleStyles();
}))