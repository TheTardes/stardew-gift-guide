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
            // Hide NPC grid
            container.hidden = true;
            // Show gift view
            npcDisplay.hidden = false;
            displayGifts({ value: npc.name });
        });
        container.appendChild(card);
    });

}


const populateSelect = (npcList) => {
    const npcSelects = document.querySelectorAll('.npc-select')

    npcSelects.forEach(npcSelect => {
        npcList.forEach(npc => {
            const item = `<option value="${npc.name}">${npc.name}</option>`;
            npcSelect.insertAdjacentHTML('beforeend', item);
        });
    });

}

const displayGifts = (npcSelect) => {

    document.getElementById('npc-list').hidden = true;
    document.getElementById('npc-display').hidden = false;


    const selectedNPC = list.find((item) => item.name === npcSelect.value)
    const npcDisplay = document.getElementById('npc-display')

    let item = `
    <section class="npc-info">
        <section class="npc-frame shadow-effect-green">
            <img src="${selectedNPC.image}"></img>
            <h2>${selectedNPC.name}</h2>
        </section>
         <p class="birthday shadow-effect-cards"><img src="Assets/cake.png" alt="Birthday" /> ${selectedNPC.Birthday}</p>
    </section>
    <section>
        <div class="gift-nav">
            <button class="tags" data-target="loved" onclick="scrollToCategory('loved')"><img src="Assets/love.png" alt="about"/><p class="hide-tagtext" >Loved</p></button>
            <button class="tags" data-target="liked" onclick="scrollToCategory('liked')"><img src="Assets/like.png" alt="about" /><p class="hide-tagtext" >Liked</p></button>
            <button class="tags" data-target="neutral" onclick="scrollToCategory('neutral')"><img src="Assets/neutral.png" alt="about" /><p class="hide-tagtext" >Neutral</p></button>
            <button class="tags" data-target="disliked" onclick="scrollToCategory('disliked')"><img src="Assets/Sad.png" alt="about" /><p class="hide-tagtext" >Disliked</p></button>
            <button class="tags" data-target="hated" onclick="scrollToCategory('hated')"><img src="Assets/hate.png" alt="about"/><p class="hide-tagtext" >Hated</p></button>
            </div>
        <section class="gift-grid shadow-effect-cards">
            <section id="loved"><h3 class="gift-title">Loved gifts</h3><ul>`

    selectedNPC.Loves.forEach(lovedGift => {
        item = item + `<li><img src="${lovedGift.image}"></img><p>${lovedGift.name}</p></li>`
    })
    item = item + '</ul></section><section id="liked"><h3 class="gift-title">Liked Gifts</h3><ul>'

    selectedNPC.Likes.forEach(likedGift => {
        item = item + `<li><img src="${likedGift.image}"></img><p>${likedGift.name}</p></li>`
    })
    item = item + '</ul></section><section id="neutral"><h3 class="gift-title">Neutral Gifts</h3><ul>'

    selectedNPC.Neutral.forEach(neutralGift => {
        item = item + `<li><img src="${neutralGift.image}"></img><p>${neutralGift.name}</p></li>`
    })
    item = item + '</ul></section><section id="disliked"><h3 class="gift-title">Disliked Gifts</h3><ul>'

    selectedNPC.Dislikes.forEach(dislikedGift => {
        item = item + `<li><img src="${dislikedGift.image}"></img><p>${dislikedGift.name}</p></li>`
    })
    item = item + '</ul></section><section id="hated"><h3 class="gift-title">Hated Gifts</h3><ul>'

    selectedNPC.Hates.forEach(hatedGift => {
        item = item + `<li><img src="${hatedGift.image}"></img><p>${hatedGift.name}</p></li>`
    })
    item = item + '</ul></section></section></section><button class="back-button mobile-fixed" onclick="goBack()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10.6667 1.33331V1.99998H9.33333V3.33331H8V4.66665H6.66667V5.99998H5.33333V6.66665H4.66667V7.33331H4V8.66665H4.66667V9.33331H5.33333V9.99998H6.66667V11.3333H8V12.6666H8.66667H9.33333V13.3333V14H10.6667V14.6666H12V12.6666H10.6667V11.3333H9.33333V9.99998H8V8.66665H6.66667V7.33331H8V5.99998H9.33333V4.66665H10.6667V3.33331H12V1.33331H10.6667Z" fill="black"/></svg>  NPC List</button>'


    npcDisplay.innerHTML = item;
    npcDisplay.scrollIntoView({ behavior: 'smooth' });
}


// universal gifts

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
        <p>${gift.name}</p>
      </li>
    `;
    });

    modal.classList.remove("hidden");
}


// interaction functions

// back
function goBack() {
    document.getElementById('npc-display').hidden = true;
    document.getElementById('npc-list').hidden = false;

    // Reset all (web and mobile) select dropdowns, Source https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll. I select class not the ID as I have 2 select dropdwons (web hidden on mobile)
    const npcSelects = document.querySelectorAll('.npc-select');
    npcSelects.forEach(select => {
        select.value = '';
    });
    // To go through each dropdown and reset their selected value.
    window.scrollTo({ top: 0, behavior: 'auto' });

    //  Scroll to top or back to NPC grid
    const npcList = document.getElementById('npc-list');
    if (npcList) {
        npcList.scrollIntoView({ behavior: 'smooth' });
    }
}

// tags
function scrollToCategory(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveTag(id);
    }
}

function setActiveTag(activeId) {
    document.querySelectorAll('.gift-nav .tags').forEach(btn => {
        if (btn.dataset.target === activeId) {
            btn.classList.add('active-tag');
        } else {
            btn.classList.remove('active-tag');
        }
    });
}

// tag nav bar
// dynamically highlightig the active gift category tag based on which section is currently visible in the viewport as the user scrolls through the page. Looked at sources like : https://css-tricks.com/sticky-table-of-contents-with-scrolling-active-states/
// I defined an array giftSections that contains the IDs of each category section. Then, I added a scroll event listener to the window.

const giftSections = ['loved', 'liked', 'neutral', 'disliked', 'hated'];

function setActiveTag(activeId) {
    document.querySelectorAll('.gift-nav .tags').forEach(btn => {
        if (btn.dataset.target === activeId) {
            btn.classList.add('active-tag');
        } else {
            btn.classList.remove('active-tag');
        }
    });
}

// Becasue on my web version "main-content" is scrollable but not he whole page, when I added it to just "window" - it did not work, so, I attached "scroll" to both
// now it goes through all gift sections by ID. Uses `getBoundingClientRect()` to find their position  Picks the first one that’s roughly near the center of the screen
//   https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

function trackVisibleGiftSection() {
    let current = null;

    for (const id of giftSections) {
        const section = document.getElementById(id);
        if (!section) continue;

        // If top of the section is near the top of viewport If the top of the section is between 0 and half the viewport height, it's considered the "active" section.
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.top <= window.innerHeight / 2;

        if (isVisible) {
            current = id;
            break;
        }
    }

    if (current) {
        setActiveTag(current);
    }
}

//  both listeners to support both layouts
// `window.addEventListener` is for mobile layouts (full-page scroll) and `mainContent.addEventListener` is for dashboard layouts (scrolling only inside `.main-content`)
window.addEventListener('scroll', trackVisibleGiftSection);

const mainContent = document.querySelector('.main-content');
if (mainContent) {
    mainContent.addEventListener('scroll', trackVisibleGiftSection);
}


// modals

function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}


// scroll to top
// Get the button:from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
const topButton = document.getElementById("scroll-top");
const scrollContainer = document.getElementById("main-content");

// Detect scroll on main-content (web layout)
scrollContainer.addEventListener("scroll", () => {
    scrollButton(scrollContainer.scrollTop);
});

// Detect scroll on window (mobile layout)
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    scrollButton(scrollTop);
});

// When the user scrolls down 20px from the top of the document, show the button

function scrollButton(scrollTop) {
    if (scrollTop > 20) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
};

// When the user clicks on the button, scroll to the top of the document for both window and main content
function topFunction() {
    scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}




