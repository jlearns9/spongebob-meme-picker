import { spongeBobMemeData } from "/data.js"

const spongeBobRadios = document.getElementById("spongeBobRadios")
const getImgBtn = document.getElementById("getImgBtn")
const gifsOnlyOption = document.getElementById("gifs-only-option")
const memeModalInner = document.getElementById("meme-modal-inner")
const memeModal = document.getElementById("meme-modal")
const closeMemeModalBtn = document.getElementById("close-meme-modal-btn")

const testBtn = document.getElementById("testBtn")


spongeBobRadios.addEventListener('change', highlightSelectedEmotion)
getImgBtn.addEventListener('click', renderMeme)
closeMemeModalBtn.addEventListener("click", closeMemeModal)



// Step 1 - Get the emotions and store it in an array.  Does not store duplicates.
function getEmotionsArray(memes) {
    const emotionsArray = []
    for (let meme of memes) {
        for (let emotion of meme.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

// Step 2 - Rendder each emotion as a radio item.
function renderEmotionsRadios(memes) {
    let radioItems = ""
    const emotions = getEmotionsArray(memes)
    for (let emotion of emotions) {
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>
        `
    }
    spongeBobRadios.innerHTML = radioItems
}

renderEmotionsRadios(spongeBobMemeData)

// Step 3 - Highlight the selected emotion, remove highlight if different emotion is selected
function highlightSelectedEmotion(e) {
    const radios = document.getElementsByClassName("radio")
    for (let radio of radios) {
        radio.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

// Step 4 - When the get image button is pressed, it displays a meme

// 4.1 - Renders the meme on the page when get image button is clicked
function renderMeme() {
    setTimeout(function() {
        document.addEventListener('click', closeMemeModalTwo)   
    }, 250)
    const memeObject = getSingleMemeObject()
    memeModalInner.innerHTML = `
        <img
        class="meme-img"
        src="./images/${memeObject.image}"
        alt="${memeObject.alt}"
        >
        `
    memeModal.style.display = "flex"
}

// 4.2 - Grabs a single meme at randon
function getSingleMemeObject() {
    const memesArray = getMatchingMemesArray()

    if (memesArray.length === 1) {
        return memesArray[0]
    } else {
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        return memesArray[randomNumber]
    }
}

//4.3 - 
function getMatchingMemesArray() {
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked

        const matchingMemesArray = spongeBobMemeData.filter(function(meme) {
            if (isGif) {
                return meme.emotionTags.includes(selectedEmotion) && meme.isGif
            }
            else{
                return meme.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingMemesArray
    }
}

// Step 5 - Closes the meme and starts over

//5.1 - Sets meme modal display to none
function closeMemeModal() {
    memeModal.style.display = "none"

}

//5.2 - Removes the event listener that allows you to close the modal by clicking anywhere on the page
function closeMemeModalTwo(e) {
    if (e.target.closest(".meme-modal")) {
        console.log("hello")
    } else {
        closeMemeModal()
        document.removeEventListener('click', closeMemeModalTwo)
    }
}

// Console Log Button Tester //
testBtn.addEventListener("click", function() {

}
)



