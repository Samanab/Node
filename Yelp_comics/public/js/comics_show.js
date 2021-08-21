// ==============================
// Select Elements
// ==============================
const upvoteBtn = document.getElementById("upvote_btn");
const downvoteBtn = document.getElementById("downvote_btn");

// ==============================
// Helper Functions
// ==============================
const sendVote = async (voteType) => {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },   
    }
    if (voteType === "up") {
        options.body = JSON.stringify({vote: "up"});
    } else if (voteType === "down") {
        options.body = JSON.stringify({vote: "down"});
    } else {
        throw "voteType must be 'up' or 'down'"
    }

    await fetch("/comics/vote", options)
    .then(data => {
        return data.json()
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}

// ==============================
// Add Event Elements
// ==============================
upvoteBtn.addEventListener("click", async function() {
    sendVote("up")
})
downvoteBtn.addEventListener("click", async function() {
    sendVote("down")
})