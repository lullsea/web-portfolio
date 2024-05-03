const checkboxes = document.querySelectorAll('.folder > input[type="checkbox"]');
const svgContainer = document.getElementById("svg-anims");

// Svg elements
const line1 = svgContainer.querySelector("#linedown1");
const line2 = svgContainer.querySelector("#linedown2");
const lineleft = svgContainer.querySelector("#lineleft");
const lineright = svgContainer.querySelector("#lineright");
const rect1 = svgContainer.querySelector("#col2-rect1");
const rect2 = svgContainer.querySelector("#col2-rect2");
let isWide = window.innerWidth > 1375;

// Starting folder positions
let posX = null;
let posY = null;
let posX2 = null;
let posY2 = null;

let current = null;

const disableAllCheckboxes = (y) => checkboxes.forEach(x => { if (x != y) x.checked = false });
const toggleChecks = (b) => checkboxes.forEach(x => b ? x.setAttribute("disabled", true) : x.removeAttribute("disabled"));


disableAllCheckboxes(null);

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function positionSvg(startPos, offsetX = 0, offsetY = 0) {
    const pos2 = document.querySelector(".col-2").getBoundingClientRect();
    posY = window.scrollY + startPos.top + offsetY
    posX = window.scrollX + startPos.left + offsetX
    // Calculate how far the line needs to reach down based on window width
    posY2 = isWide ? pos2.height / 2.3 : window.scrollY + pos2.top;
    posX2 = isWide ? pos2.left : posX;


    // setAttributes(rect, {
    //     "x": pos2.x,
    //     "y": window.scrollY + pos2.y,
    //     "width": pos2.width,
    //     "height": pos2.height
    // })


    setAttributes(line1, { "x1": posX, "x2": posX, "y1": posY, "y2": posY2 })
    setAttributes(line2, { "x1": posX, "x2": posX2, "y1": posY2, "y2": posY2 })

    setAttributes(lineleft, {
        "x1": isWide ? posX2 - 1 : posX,
        "x2": isWide ? posX2 - 1 : pos2.x,
        "y1": isWide ? posY2 : window.scrollY + pos2.y,
        "y2": window.scrollY + pos2.y,
    })
    setAttributes(lineright, {
        "x1": isWide ? posX2 - 1 : posX,
        "x2": isWide ? posX2 - 1 : pos2.x + pos2.width,
        "y1": isWide ? posY2 : window.scrollY + pos2.y,
        "y2": isWide ? window.scrollY + pos2.height + pos2.y : window.scrollY + pos2.y,
    })
    setAttributes(rect1, {
        "x": pos2.x - 1,
        "y": window.scrollY + pos2.y - 1,
        "width": pos2.width + 2,
        "height": pos2.height + 3,
    })
    setAttributes(rect2, {
        "x": pos2.x - 1,
        "y": window.scrollY + pos2.y -1,
        "width": pos2.width + 2,
        "height": pos2.height + 3,
    })

    // rect2.setAttribute("x", pos2.x);

    const col2Dimension = (pos2.height * 2) + (pos2.width * 2)
    rect1.style.strokeDasharray = rect1.style.strokeDashoffset = col2Dimension;
    rect2.style.strokeDasharray = col2Dimension; 
    rect2.style.strokeDashoffset = -col2Dimension;

    line1.style.strokeDasharray = line1.style.strokeDashoffset = `${posY2 - posY}px`;
    line2.style.strokeDasharray = line2.style.strokeDashoffset = `${posX2 - posX}px`;

    // TODO: fix this on resize
    lineleft.style.strokeDasharray = lineleft.style.strokeDashoffset = isWide ? `${posY2 - pos2.y}px` : `${posX - pos2.x}`;
    lineright.style.strokeDasharray = lineright.style.strokeDashoffset = isWide ? `${pos2.height}px` : `${pos2.x + pos2.width - posX}px`;
}
function animate() {
    setTimeout(() => {
        // Line1 go down
        line1.style.transition = isWide ? '.2s' : '.6s';
        line1.style.strokeDashoffset = 0
        setTimeout(() => {
            // Line2 go right or nothing depending on window width
            // Retract line1
            line1.style.strokeDashoffset = `-${posY2 - posY}px`;
            line2.style.transition = '.4s';
            line2.style.strokeDashoffset = 0;
            // Retract line2
            setTimeout(() => line2.style.strokeDashoffset = `-${posX2 - posX}px`, 50)
            setTimeout(() => {
                // Start col2 rect animation
                lineleft.style.strokeDashoffset = 0;
                lineleft.style.transition = '.2s';
                lineright.style.strokeDashoffset = 0;
                lineright.style.transition = '.2s';

                rect2.style.transition = '1s';
                rect2.style.strokeDashoffset = -100;
                setTimeout(() => {
                    rect1.style.transition = '.7s';
                    rect1.style.strokeDashoffset = 0;
                    setTimeout(() => {
                        // Finish animation
                        line1.style.transition = line2.style.transition = lineleft.style.transition = lineright.style.transition = rect1.style.transition = rect2.style.transition = 'none'
                        toggleChecks(false);
                    }, 350)
                }, 200)
            }, 190)
        }, 175)
    }, 50);
}

function toggleStyles() {
    checkboxes.forEach(x => {
        const parent = x.parentElement;
        const folder = x.parentElement.querySelector(".folder-ico");
        const icon = x.parentElement.querySelector(".lang-ico");
        const folderPos = folder.getBoundingClientRect();

        if (x.checked) {
            current = x;
            folder.classList.replace("fa-folder-closed", "fa-folder-open");
            parent.classList.add("active");
            positionSvg(folderPos, folderPos.width / 2, folderPos.height + 22, true);
            animate();
        } else {
            if (x == current)
                current = null;
            icon.style.opacity = 1;
            folder.classList.replace("fa-folder-open", "fa-folder-closed");
            parent.classList.remove("active");
        }

    })
}

// Reposition svgs
window.addEventListener('resize', () => {
    isWide = window.innerWidth > 1375;
    if (current != null) {
        const pos = current.getBoundingClientRect();
        positionSvg(pos, pos.width / 2, pos.height - 12);
    }
})

checkboxes.forEach(x => x.addEventListener("change", () => {
    if (x.checked) {
        disableAllCheckboxes(x);
        toggleChecks(true);
    }
    toggleStyles();
}))