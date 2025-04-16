let list;
// Fetch gets your (local) JSON file…
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // renderItems(data)
        list = data;
        populateSelect(data);
        showNPCList(data)
    })



function showNPCList(npcs) {
    const container = document.getElementById('npc-list');
    const npcDisplay = document.getElementById('npc-display');

    npcs.forEach(npc => {
        const card = document.createElement('div');
        card.className = 'npc-card';
        card.innerHTML = `
            <img src="${npc.image}" alt="${npc.name}">
            <div><strong>${npc.name}</strong></div>`;
        card.addEventListener('click', () => {
            container.classList.add('hidden');        // Hide NPC grid
            npcDisplay.classList.remove('hidden');    // Show gift view
            displayGifts({ value: npc.name });
        });
        container.appendChild(card);
    });
}


const populateSelect = (npcList) => {
    const npcSelect = document.getElementById('npc-select')

    npcList.forEach(npc => {
        const item = `<option value="${npc.name}">${npc.name}</option>`
        npcSelect.insertAdjacentHTML('beforeend', item)
    });

}

const displayGifts = (npcSelect) => {

    document.getElementById('npc-list').classList.add('hidden');
    document.getElementById('npc-display').classList.remove('hidden');


    const selectedNPC = list.find((item) => item.name === npcSelect.value)

    const npcDisplay = document.getElementById('npc-display')

    let item = `<button class="link-button" onclick="goBack()">  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10.6667 1.33331V1.99998H9.33333V3.33331H8V4.66665H6.66667V5.99998H5.33333V6.66665H4.66667V7.33331H4V8.66665H4.66667V9.33331H5.33333V9.99998H6.66667V11.3333H8V12.6666H8.66667H9.33333V13.3333V14H10.6667V14.6666H12V12.6666H10.6667V11.3333H9.33333V9.99998H8V8.66665H6.66667V7.33331H8V5.99998H9.33333V4.66665H10.6667V3.33331H12V1.33331H10.6667Z" fill="white"/></svg>  NPC List</button>
    <section class="npc-info">
        <section class="npc-frame">
            <img src="${selectedNPC.image}"></img>
            <h2>${selectedNPC.name}</h2>
        </section>
         <p class="birthday"><img src="assets/cake.png" alt="Birthday" /> ${selectedNPC.Birthday}</p>
        <div class="gift-nav">
            <button class="tags" onclick="scrollToCategory('loved')">Loved</button>
            <button class="tags" onclick="scrollToCategory('liked')">Liked</button>
            <button class="tags" onclick="scrollToCategory('neutral')">Neutral</button>
            <button class="tags" onclick="scrollToCategory('disliked')">Disliked</button>
            <button class="tags" onclick="scrollToCategory('hated')">Hated</button>
        </div>
    </section>
    
    <section class="gift-grid"><section id="loved"><h3>Loved gifts</h3><ul>`

    selectedNPC.Loves.forEach(lovedGift => {
        item = item + `<li><span>${lovedGift.name}</span><img src="${lovedGift.image}"></img></li>`
    })
    item = item + '</ul></section><section id="liked"><h3>Liked Gifts</h3><ul>'

    selectedNPC.Likes.forEach(likedGift => {
        item = item + `<li><span>${likedGift.name}</span><img src="${likedGift.image}"></img></li>`
    })
    item = item + '</ul></section><section id="neutral"><h3>Neutral Gifts</h3><ul>'

    selectedNPC.Neutral.forEach(neutralGift => {
        item = item + `<li><span>${neutralGift.name}</span><img src="${neutralGift.image}"></img></li>`
    })
    item = item + '</ul></section><section id="disliked"><h3>Disliked Gifts</h3><ul>'

    selectedNPC.Dislikes.forEach(dislikedGift => {
        item = item + `<li><span>${dislikedGift.name}</span><img src="${dislikedGift.image}"></img></li>`
    })
    item = item + '</ul></section><section id="hated"><h3>Hated Gifts</h3><ul>'

    selectedNPC.Hates.forEach(hatedGift => {
        item = item + `<li><span>${hatedGift.name}</span><img src="${hatedGift.image}"></img></li>`
    })
    item = item + '</ul></section></section>'


    npcDisplay.innerHTML = item;
}


// const npcSearch = document.getElementById('npc-search');
// const npcSelect = document.getElementById('npc-select');

// // getting input in the search bar
// npcSearch.addEventListener('input', () => {
//     const inputValue = npcSearch.value.toLowerCase().trim();

//     // matching NPC by name
//     const match = list.find(npc => npc.name.toLowerCase().startsWith(inputValue));

//     if (match) {
//         npcSelect.value = match.name;
//         displayGifts(npcSelect);
//     }
// });



let universalData = {};

fetch('universalgifts.json')
    .then(res => res.json())
    .then(data => universalData = data);

function showUniversalGifts(category) {
    const modal = document.getElementById("universalModal");
    const title = document.getElementById("modalTitle");
    const list = document.getElementById("universalGiftList");

    title.textContent = category;
    list.innerHTML = "";

    (universalData[category] || []).forEach(gift => {
        list.innerHTML += `
      <li>
        <img src="${gift.image}" alt="${gift.name}">
        <br>${gift.name}
      </li>
    `;
    });

    modal.classList.remove("hidden");
}


// interaction functions



function goBack() {
    document.getElementById('npc-display').classList.add('hidden');
    document.getElementById('npc-list').classList.remove('hidden');
    npcSearch.value = ''
    npcSelect.value = ''
}


function scrollToCategory(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}



// Get the button:from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
let topButton = document.getElementById("scroll-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}




