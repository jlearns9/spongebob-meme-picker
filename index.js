import { spongeBobMemeData } from "/data.js"

const spongeBobRadios = document.getElementById("spongeBobRadios")
const testBtn = document.getElementById("testBtn")




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
        <div>
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value=${emotion}"
            name="emotions"
            >
        </div>
        `
    }
    spongeBobRadios.innerHTML = radioItems
}



renderEmotionsRadios(spongeBobMemeData)


// Console Log Button Tester //
testBtn.addEventListener("click", function() {
    console.log(emotions)
}
)



