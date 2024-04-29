const checkboxes = document.querySelectorAll('.folder > input[type="checkbox"]');
const disableAllCheckboxes = (y) => checkboxes.forEach(x => {if(x != y) x.checked = false});
disableAllCheckboxes(null);
console.log(checkboxes);

function toggleStyles() {
    checkboxes.forEach(x => {
        const folder = x.parentElement.querySelector(".folder-ico");
        const icon =  x.parentElement.querySelector(".lang-ico");
        if(x.checked){
            icon.style.opacity = 0;
            folder.classList.replace("fa-folder-closed", "fa-folder-open");
        }else{
            icon.style.opacity = 1;
            folder.classList.replace("fa-folder-open", "fa-folder-closed");
        }

    })
}

checkboxes.forEach(x => x.addEventListener("change", () => {
    if(x.checked){
        disableAllCheckboxes(x);
    }
    toggleStyles();
}))