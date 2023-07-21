const mainmenu = document.querySelector(".mainmenu");
const openmenu = document.querySelector(".openmenu");
const closemenu = document.querySelector(".closemenu");
const contact = document.querySelector(".contact")



openmenu.addEventListener('click', show);
closemenu.addEventListener('click', close);

function show() {
    mainmenu.style.display = 'flex';
    mainmenu.style.width='100%'
    mainmenu.style.top = '0';
    closemenu.style.display='block';
    contact.style.display='block';
}

function close() {
    mainmenu.style.top = '100%';
}
