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
function renderMeme() {
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

function getSingleMemeObject() {
    const memesArray = getMatchingMemesArray()

    if (memesArray.length === 1) {
        return memesArray[0]
    } else {
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        return memesArray[randomNumber]
    }
}

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

// Step 5 - When the X button is pressed, it closes the meme and starts over
function closeMemeModal() {
    memeModal.style.display = "none"
}

// Console Log Button Tester //
testBtn.addEventListener("click", function() {

}
)



