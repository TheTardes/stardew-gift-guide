let list;
// Fetch gets your (local) JSON file…
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // renderItems(data)
        list = data;
        populateSelect(data)
    })

const populateSelect = (npcList) => {
    const npcSelect = document.getElementById('npc-select')

    npcList.forEach(npc => {
        const item = `<option value="${npc.name}">${npc.name}</option>`
        npcSelect.insertAdjacentHTML('beforeend', item)
    });

}

const displayGifts = (npcSelect) => {
    console.log(npcSelect)
    const selectedNPC = list.find((item) => item.name === npcSelect.value)
    console.log(selectedNPC)

    const npcDisplay = document.getElementById('npc-display')

    let item = `<h2>${selectedNPC.name}</h2><img src="${selectedNPC.image}"></img><p>${selectedNPC.Birthday}</p>
    <section><h3>Loved gifts</h3><ul>`

    selectedNPC.Loves.forEach(lovedGift => {
        item = item + `<li><span>${lovedGift.name}</span><img src="${lovedGift.image}"></img></li>`
    })
    item = item + '</ul></section><section><h3>Liked Gifts</h3><ul>'

    selectedNPC.Likes.forEach(likedGift => {
        item = item + `<li><span>${likedGift.name}</span><img src="${likedGift.image}"></img></li>`
    })
    item = item + '</ul></section><h3>Neutral Gifts</h3><ul>'

    selectedNPC.Neutral.forEach(neutralGift => {
        item = item + `<li><span>${neutralGift.name}</span><img src="${neutralGift.image}"></img></li>`
    })
    item = item + '</ul></section><h3>Disliked Gifts</h3><ul>'

    selectedNPC.Dislikes.forEach(dislikedGift => {
        item = item + `<li><span>${dislikedGift.name}</span><img src="${dislikedGift.image}"></img></li>`
    })
    item = item + '</ul></section><h3>Hated Gifts</h3><ul>'

    selectedNPC.Hates.forEach(hatedGift => {
        item = item + `<li><span>${hatedGift.name}</span><img src="${hatedGift.image}"></img></li>`
    })
    item = item + '</ul></section>'


    npcDisplay.insertAdjacentHTML('beforeend', item)
}


// gift - NPC; Univerlikes - like  - input, filter

// // Function to render your items
// const renderItems = (data) => {
// 	// The `ul` where the items will be inserted
// 	const dataList = document.getElementById('data-list')

// 	// Loop through each item in the data array
// 	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// 	data.forEach((item) => {
// 		let conditionalClass = '' // Set an empty class variable

// 		// Conditional if this is `false` (“not true”)
// 		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
// 		if (!item.alsoWasWriter) {
// 			conditionalClass = 'faded' // Update the variable
// 		}

// 		// Make a “template literal” as we have before, inserting your data (and maybe the class)
// 		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
// 		let listItem =
// 			`
// 				<li class="${conditionalClass}">
// 					<h2>${item.title}</h2>
// 					<img src="${item.posterImage}">
// 					<p>Released in <time>${item.year}</time></p>
// 					<p><em>${item.runTime}</em></p>
// 					<a href="${item.imdbLink}">
// 						<p>${item.imdbRating} / 10 →</p>
// 					</a>
// 				</li>
// 			`

// 		dataList.insertAdjacentHTML('beforeend', listItem) // Add it to the `ul`!

// 		// Don’t feel limited to `ul > li` for these—you can insert any DOM, anywhere!
// 	})
// }


