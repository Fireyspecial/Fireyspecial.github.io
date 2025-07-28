/* jshint esversion: 6 */
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
const homebtn = document.querySelector("#homebtn");
var allpages = document.querySelectorAll(".page");
const menuItemsList = document.querySelector("ul");
const hamBtn = document.querySelector("#hamIcon");
hamBtn.addEventListener("click", toggleMenus);

//secret
var Haruscore = 0;
var Harushown = false;




// Function to hide all pages
function hideall() {
    for (let onepage of allpages) {
        onepage.style.display = "none";
    }
}

// Function to show selected page
function show(pgno) {
    hideall();
    let onepage = document.querySelector("#page" + pgno);
    onepage.style.display = "block";
}

/* Event listeners for page navigation */
homebtn.addEventListener("click", function () {
    show(1);
    playClickSound();
});
page1btn.addEventListener("click", function () {
    show(2);
    const horsepage = document.querySelector("#page2");
    contentWidth = horsepage.offsetWidth;
    playClickSound();
});
page2btn.addEventListener("click", function () {
    show(3);
    playClickSound();
});
page3btn.addEventListener("click", function () {
    show(4);
    playClickSound();
});
page4btn.addEventListener("click", function () {
    show(5);
    playClickSound();
});


// Toggle menu function
function toggleMenus() {
    menuItemsList.classList.toggle("menuShow");
    if (menuItemsList.classList.contains("menuShow")) {
        hamBtn.innerHTML = "Close Menu";
        playClickMenuSound();
    } else {
        hamBtn.innerHTML = "Open Menu";
        playClickMenuSound();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    show(1);
    const hamIcon = document.getElementById("hamIcon");
    const nav = document.querySelector("nav");

    hamIcon.addEventListener("click", function () {
        nav.classList.toggle("menuShow");
    });
});


/* Find references to all the buttons and ball */
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");
const resetBtn = document.querySelector("#resetBtn");
const ball = document.querySelector("#ball");
const horsepage = document.querySelector("#page2");
let contentWidth;

window.addEventListener('resize', function () {
    contentWidth = horsepage.offsetWidth;
    const newWidth = window.innerWidth;

    if (contentWidth < newWidth) {
        //console.log("Browser is wider than the .page container");
    }
});



// Ball position variables
let ballX = 0, ballY = 0;
const MinY = 0;
const MaxY = 0;

// These will adapt to screen width dynamically
function updateMaxX() {
    const style = getComputedStyle(horsepage);
    const paddingLeft = parseFloat(style.paddingLeft);
    const paddingRight = parseFloat(style.paddingRight);
    const usableWidth = horsepage.offsetWidth - paddingLeft - paddingRight;
    return usableWidth - ball.offsetWidth;
}

const MinX = 0;
let MaxX = updateMaxX();
let hitMaxX = false;

// Ball movement functions
function ResetPos() {
    playClickSound();
    ballX = ballY = 0;
    UpdateBallStyle();
}
function MovePos(leftInc, topInc) {
    let newX = ballX + leftInc;
    let newY = ballY + topInc;

    MaxX = updateMaxX(); // update in case of resize

    // Horizontal movement
    if (newX > MaxX) {
        ballX = MaxX;
        hitMaxX = true;
    } else {
        ballX = newX;
        hitMaxX = false;
    }

    if (newX < MinX) {
        ballX = MinX;
    }

    // Vertical movement
    if (newY >= MinY && newY <= MaxY) {
        ballY = newY;
    }

    UpdateBallStyle();

}


function UpdateBallStyle() {
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    //ball.innerText = `${Math.round(ballX)},${Math.round(ballY)}`;
    CheckForTargetArea();
}

function CheckForTargetArea() {
    const zones = [
        {
            start: 0.0, end: 0.01, content: `
            <p>Use the buttons or A & D to move the horse.</p>
        `},
        {
            start: 0.01, end: 0.25, content: `
            <div>
            <h3>Evolution Timeline</h3>
            <ul>
                <li><strong>55 MYA - Eohippus:</strong> Dog-sized, 4 front toes, leaf eater.</li>
                <li><strong>40 MYA - Mesohippus:</strong> Larger, 3 toes, ate grass.</li>
                <li><strong>15 MYA - Merychippus:</strong> Horse-like, grass-eater teeth.</li>
                <li><strong>4 MYA - Equus:</strong> Modern horse, hoofed, bigger.</li>
            </ul>
            </div>
        `},
        {
            start: 0.25, end: 0.5, content: `
            <div class="history-section">
                <h3>Domestication & Early History</h3>
                <ul>
                    <li><strong>4000 BCE:</strong> First domesticated on steppes of Central Asia (modern Kazakhstan)</li>
                    <li><strong>Initially used for:</strong> Milk, meat, and hide - riding came later</li>
                    <li><strong>3500 BCE:</strong> Evidence of horse riding and use in warfare</li>
                    <li><strong>3000 BCE:</strong> Horse-drawn chariots revolutionized warfare</li>
                    <li><strong>1000 BCE:</strong> Mounted cavalry became dominant military force</li>
                </ul>
            </div>
        `},
        {
            start: 0.5, end: 0.75, content: `
            <div class="history-section">
                <h3>Horses in the Americas</h3>
                <ul>
                    <li><strong>Prehistoric:</strong> Horses evolved in North America but went extinct 10,000 years ago</li>
                    <li><strong>1519:</strong> Spanish conquistadors brought horses back to Americas</li>
                    <li><strong>1600s:</strong> Horses spread throughout Native American tribes</li>
                    <li><strong>1800s:</strong> Wild mustang herds established in American West</li>
                    <li><strong>Impact:</strong> Transformed Plains Indian culture and way of life</li>
                </ul>
            </div>
        `},
        {
            start: 0.75, end: 0.99, content: `
            <div class="history-section">
                <h3>Famous Horses in History</h3>
                <ul>
                    <li><strong>Bucephalus:</strong> Alexander the Great's war horse</li>
                    <li><strong>Secretariat:</strong> Triple Crown winner, fastest Kentucky Derby time</li>
                    <li><strong>Trigger:</strong> Roy Rogers' famous movie horse</li>
                    <li><strong>Seabiscuit:</strong> Depression-era racehorse that captured America's heart</li>
                </ul>
            </div>
        `},
        {
            start: 0.99, end: 1.0, content: `
            <div class="history-section">
                <h3>You have reached the end!</h3>
            </div>
        `}
    ];

    // Update MaxX to get current movement boundary
    MaxX = updateMaxX();

    // Special case: if we've hit the maximum X position, show end content
    if (hitMaxX) {
        document.querySelector("#contentBox").innerHTML = `
            <div class="history-section">
                <h3>You have reached the end!</h3>
            </div>
        `;
        return;
    }

    // Check which zone the horse is currently in - USE MaxX instead of contentWidth
    let found = false;
    for (let zone of zones) {
        if (ballX >= MaxX * zone.start && ballX <= MaxX * zone.end) {
            document.querySelector("#contentBox").innerHTML = zone.content;
            found = true;
            console.log(`In zone: ${zone.start}-${zone.end}, ballX: ${ballX}, MaxX: ${MaxX}, ratio: ${ballX/MaxX}`);
            break;
        }
    }

    // Fallback if no zone is found
    if (!found) {
        document.querySelector("#contentBox").innerHTML = "Use the buttons or A & D to move the horse";
        console.log(`No zone found! ballX: ${ballX}, MaxX: ${MaxX}, ratio: ${ballX/MaxX}`);
    }
}

// Individual movement functions
function MoveLeft() {
    MovePos(-10, 0);
}

function MoveRight() {
    MovePos(10, 0);
}

function MoveLeftBtn() {
    // Smaller movement on mobile devices
    const moveDistance = window.innerWidth < 768 ? contentWidth / 15 : contentWidth / 6;
    MovePos(-moveDistance, 0);
    console.log("Moved by " + moveDistance + " !");
    playClickShiftSound();

    if (!hitMaxX) {
        toggleSprite();
        setTimeout(() => {
            toggleSprite();
        }, 200);
    }
}

function MoveRightBtn() {
    const moveDistance = window.innerWidth < 768 ? contentWidth / 15 : contentWidth / 6;
    MovePos(moveDistance, 0);
    console.log("Moved by " + moveDistance + " !");
    playClickShiftSound();
    toggleSprite();
    setTimeout(() => {
        toggleSprite();
    }, 200);
}

// Button event listeners
leftBtn.addEventListener("click", MoveLeftBtn);
rightBtn.addEventListener("click", MoveRightBtn);
resetBtn.addEventListener("click", ResetPos);

// Keyboard controls with better structure
document.addEventListener('keydown', (e) => {

    switch (e.code) {
        case "KeyA":
        case "ArrowLeft":
            MoveLeft();
            break;
        case "KeyD":
        case "ArrowRight":
            MoveRight();
            break;
        case "KeyR":
            ResetPos();
            break;
        default:
            // Optional: show controls help
            if (e.code === "KeyH") {
                console.log("Controls: WASD or Arrow Keys to move, R to reset, H for help");
            }
    }

    // // Prevent default browser behavior for these keys
    // if (['KeyA', 'KeyD', 'KeyW', 'KeyS', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
    //     e.preventDefault();
    // }
});




// Initialize ball position on page load
document.addEventListener('DOMContentLoaded', function () {
    UpdateBallStyle();
    console.log("Controls: WASD or Arrow Keys to move ball, R to reset, H for help");
});

function toggleSprite() {
    if (ball.classList.contains("idle")) {
        ball.classList.remove("idle");
        ball.classList.add("move");
    } else {
        ball.classList.remove("move");
        ball.classList.add("idle");
    }
}

const durianId = document.getElementById("durianId");
const scoreBox = document.getElementById("scoreBox");
const bestiaryOneText = document.getElementById("firstBestiaryCreature");
const bestiaryTwoText = document.getElementById("secondBestiaryCreature");
let score = 0;
let scoreAdd = 1;
let scoreMult = false;
let scoregoal = 10;
let pausescore = false;
let gamelestart = false;
let intervalspeed = 1000;
let moveDurianItvId;
let creatureOne = null;
let creatureTwo = null;
let creatureOneInitialInterval = null;
let creatureTwoInitialInterval = null;
var Winner = false;

//One gazillion if statements for condition for win popup
var doubleScoreBought = false;
var firstCreatureBought = false;
var secondCreatureBought = false;
var BestiaryOneBought = false;
var BestiaryTwoBought = false;
var checkedBestiaryOne = false;
var checkedBestiaryTwo = false;

function GetRandom(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function MoveDurian(durian) {
    if (pausescore) {
        pausescore = false; // Prevent movement if score is paused
    }

    const gameSection = document.querySelector('#page5');

    // Viewport size
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Durian size
    const durianWidth = durian.offsetWidth;
    const durianHeight = durian.offsetHeight;

    // Random position (within viewport)
    const randomX = GetRandom(0, viewportWidth - durianWidth);
    const randomY = GetRandom(0, viewportHeight - durianHeight);

    // Container (gameSection) position
    const gameRect = gameSection.getBoundingClientRect();

    // Position relative to container
    let left = randomX - gameRect.left;
    let top = randomY - gameRect.top;

    // Clamp to container bounds
    left = Math.min(Math.max(left, 0), gameSection.clientWidth - durianWidth);
    top = Math.min(Math.max(top, 0), gameSection.clientHeight - durianHeight);

    // Apply styles
    durian.style.position = 'absolute';
    durian.style.left = `${left}px`;
    durian.style.top = `${top}px`;
}



function ActivateMamboMovement() {
    if (score === 1 && !moveDurianItvId) {
        moveDurianItvId = setInterval(() => MoveDurian(durianId), intervalspeed);
    }
}


//here
function durianCatch(creature) {
    if (pausescore || creature.mamboPaused) {
        return;
    }

    if (!scoreMult) {
        score += scoreAdd;
    }
    else {
        score += scoreAdd * 2;
    }
    console.log(scoreMult);

    scoreBox.innerHTML = "Score: " + score;
    playSoundWhenClicked(creature);

    if (score === 1 && !gamelestart) {
        pausescore = true;
        gamelestart = true;
        const introText = document.getElementById("introText");
        introText.remove();
        ActivateMamboMovement();
    }

    if (score >= scoregoal) {
        shrinkgrowfunctioncapture(creature);
        creature.mamboPaused = true;
        setTimeout(() => {
            creature.mamboPaused = false;
        }, 3000);


        scoregoal += 10;

        // Update interval speed
        updateIntervalSpeed();

        // Update all creature intervals
        updateAllCreatureIntervals();

    } else if (score < scoregoal) {
        rotatingfunctioncapture(creature);
    }
}

function updateIntervalSpeed() {
    if (scoregoal === 20) {
        intervalspeed = 1000 / 1.1; // Fixed your typo (was 100 instead of 1.1)
    } else if (scoregoal === 30) {
        intervalspeed = 1000 / 1.2;
    } else if (scoregoal === 40) {
        intervalspeed = 1000 / 1.3; // Fixed progression
    } else if (scoregoal === 50) {
        intervalspeed = 1000 / 1.4;
    } else if (scoregoal === 60) {
        intervalspeed = 1000 / 1.5;
    } else if (scoregoal === 70) {
        intervalspeed = 1000 / 1.6;
    } else if (scoregoal === 80) {
        intervalspeed = 1000 / 1.7;
    } else if (scoregoal === 90) {
        intervalspeed = 1000 / 1.8;
    } else if (scoregoal === 100) {
        intervalspeed = 1000 / 1.9;
    }
}

function updateAllCreatureIntervals() {

    // Update original durian
    clearInterval(moveDurianItvId);
    moveDurianItvId = setInterval(() => MoveDurian(durianId), intervalspeed);

    // Update creature one
    if (firstCreatureBought && creatureOne) {
        console.log("Updating creature one interval");
        clearInterval(creatureOneInitialInterval);
        creatureOneInitialInterval = setInterval(() => MoveDurian(creatureOne), intervalspeed);
    } else {
        console.log("Skipping creature one - firstCreatureBought:", firstCreatureBought, "creatureOne:", creatureOne);
    }

    // Update creature two
    if (secondCreatureBought && creatureTwo) {
        console.log("Updating creature two interval");
        clearInterval(creatureTwoInitialInterval);
        creatureTwoInitialInterval = setInterval(() => MoveDurian(creatureTwo), intervalspeed);
    }
}

function rotatingfunctioncapture(durianId) {
    console.log("rotating function called!");
    // Reset rotation
    durianId.classList.remove("rotate");
    void durianId.offsetWidth; // Reflow trick
    durianId.classList.add("rotate");
}

function shrinkgrowfunctioncapture(durianId) {
    // Reset shrink-grow animation
    durianId.classList.remove("shrinkGrow");
    void durianId.offsetWidth; // Reflow trick
    durianId.classList.add("shrinkGrow");

    // Cleanup transform after animation
    durianId.addEventListener("animationend", function handler() {
        durianId.style.transform = ""; // reset inline transform
        durianId.classList.remove("shrinkGrow");
        durianId.removeEventListener("animationend", handler);
    });
}



//Pause the clicks whenever the score goal is passed as the css animations need to be played
if (!pausescore) {
    durianId.addEventListener("click", () => durianCatch(durianId));
}


function spawnCreatureOne() {
    creatureOne = document.createElement("img");
    creatureOne.src = "images/Hachimi.jpg";
    creatureOne.id = "creatureOne";
    creatureOne.style.position = "absolute";

    // Add to container
    const gameSection = document.querySelector('#page5');
    gameSection.appendChild(creatureOne);

    // Add click handler using shared logic
    creatureOne.addEventListener("click", () => durianCatch(creatureOne));

    // Move this durian independently
    creatureOneInitialInterval = setInterval(() => {
        MoveDurian(creatureOne);
    }, intervalspeed);

    firstCreatureBought = true;
}

function spawnCreatureTwo() {
    creatureTwo = document.createElement("img");
    creatureTwo.src = "images/GoldshipChibi.jpg";
    creatureTwo.id = "creatureTwo";
    creatureTwo.style.position = "absolute";

    const gameSection = document.querySelector('#page5');
    gameSection.appendChild(creatureTwo);

    // Add click handler using shared logic
    creatureTwo.addEventListener("click", () => durianCatch(creatureTwo));

    creatureTwoInitialInterval = setInterval(() => {
        MoveDurian(creatureTwo);
    }, intervalspeed);

    secondCreatureBought = true;
}



//Store of the mambo game
const hamStoreBtn = document.querySelector(".dropdown-toggle");
const menuStoreList = document.querySelector(".dropdown-content");

//New Creature Store
const creatureStore = {
    //Create a store object with creatures variable
    doubleScore: {
        price: 20,
        purchased: false,
        elementId: "doubleScore"
    },
    creatureOne: {
        price: 30,
        spawnFunction: spawnCreatureOne,
        purchased: false,
        elementId: "firstCreature"
    },
    creatureTwo: {
        price: 40,
        spawnFunction: spawnCreatureTwo,
        purchased: false,
        elementId: "secondCreature"
    },
    bestiaryLogOne: {
        price: 50,
        purchased: false,
        elementId: "BestiaryLog1"
    },
    bestiaryLogTwo: {
        price: 50,
        purchased: false,
        elementId: "BestiaryLog2"
    }
};

// Toggle menu function
function toggleMenus() {
    menuStoreList.classList.toggle("show");

    if (menuStoreList.classList.contains("show")) {
        hamStoreBtn.innerHTML = "Close Store";
        playClickMenuSound();
        //Show the store list
        menuStoreList.style.display = "block";

        //Kill off the other opened ones
        objectivesMenuList.classList.remove("show");
        objectivesMenuBtn.innerHTML = "Open Objectives";
        objectivesMenuList.style.display = "none";

        bestiaryMenuList.classList.remove("show");
        bestiaryMenuBtn.innerHTML = "Open Bestiary";
        bestiaryMenuList.style.display = "none";
    } else {
        hamStoreBtn.innerHTML = "Open Store";
        playClickMenuSound();
        //Hide the store list
        menuStoreList.style.display = "none";
    }
}

hamStoreBtn.addEventListener("click", toggleMenus);

// Optional: Close when clicking outside
window.addEventListener("click", function (e) {
    if (!document.querySelector(".dropdown-container").contains(e.target)) {
        menuStoreList.classList.remove("show");
        hamStoreBtn.innerHTML = "Open Store";
        menuStoreList.style.display = "none";
    }
    if (!document.querySelector(".dropdown-objectives").contains(e.target)) {
        objectivesMenuList.classList.remove("show");
        objectivesMenuBtn.innerHTML = "Open Objectives";
        objectivesMenuList.style.display = "none";
    }
    if (!document.querySelector(".dropdown-bestiary").contains(e.target)) {
        bestiaryMenuList.classList.remove("show");
        bestiaryMenuBtn.innerHTML = "Open Bestiary";
        bestiaryMenuList.style.display = "none";
    }
});


// Store checker function
function StoreCheck(creatureKey) {
    const creature = creatureStore[creatureKey];
    const btn = document.getElementById(creature.elementId);

    if (creature.purchased) {
        return;
    }

    if (score >= creature.price) {
        // Deduct score and purchase
        score -= creature.price;
        creature.purchased = true;
        btn.innerHTML = "Purchased!";

        console.log(`Remaining Score: ${score}`);
        //Double the score
        if (creatureKey === "doubleScore") {
            scoreMult = true;
            doubleScoreBought = true;
            playWinnerSound();
        }

        //Spawn creature if creature was bought
        if (creature.spawnFunction === spawnCreatureOne || creature.spawnFunction === spawnCreatureTwo) {
            scoreAdd += 1;
            creature.spawnFunction();

            if (creature.spawnFunction === spawnCreatureOne) {
                firstCreatureBought = true;
                playWinnerSound();
            }
            else {
                secondCreatureBought = true;
                playWinnerSound();
            }
        }
        else if (creature.elementId === "BestiaryLog1") {
            BestiaryOneBought = true;
            bestiaryOneText.innerHTML = "Silence Suzuka";
            playWinnerSound();
        }
        else if (creature.elementId === "BestiaryLog2") {
            BestiaryTwoBought = true;
            bestiaryTwoText.innerHTML = "Secretariat";
            playWinnerSound();
        }

        scoreBox.innerHTML = "Score: " + score;

        // Spent the score, update score goal and re-evaluate the spawn interval
        if (score < 10) {
            scoregoal = 10;
        } else if (score >= 10 && score < 20) {
            scoregoal = 20;
        } else if (score >= 20 && score < 30) {
            scoregoal = 30;
        } else if (score >= 30 && score < 40) {
            scoregoal = 40;
        } else if (score >= 30 && score < 50) {
            scoregoal = 50;
        } else if (score >= 50 && score < 60) {
            scoregoal = 60;
        } else if (score >= 60 && score < 70) {
            scoregoal = 70;
        } else if (score >= 70 && score < 80) {
            scoregoal = 80;
        }



        updateIntervalSpeed();
        updateAllCreatureIntervals();

    } else {
        // Cancel any previous timeout
        if (btn._timeoutID) {
            clearTimeout(btn._timeoutID);
        }

        const originalText = btn.innerHTML;

        // Disable the button to prevent clicks
        btn.disabled = true;
        btn.innerHTML = "Can't afford!";
        playDeniedSound();

        // Re-enable button after 2 seconds and restore original text
        btn._timeoutID = setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn._timeoutID = null;
        }, 2000);

        // Return early to prevent further processing
        return;
    }

}

//Store Buttons
const doubleptsBtn = document.getElementById("doubleScore");
doubleptsBtn.addEventListener("click", () => StoreCheck("doubleScore"));

const firstcreatureBtn = document.getElementById("firstCreature");
firstcreatureBtn.addEventListener("click", () => StoreCheck("creatureOne"));

const secondcreatureBtn = document.getElementById("secondCreature");
secondcreatureBtn.addEventListener("click", () => StoreCheck("creatureTwo"));

const bestiarylog1Btn = document.getElementById("BestiaryLog1");
bestiarylog1Btn.addEventListener("click", () => StoreCheck("bestiaryLogOne"));

const bestiarylog2Btn = document.getElementById("BestiaryLog2");
bestiarylog2Btn.addEventListener("click", () => StoreCheck("bestiaryLogTwo"));


// Bestiary Section Menu
const bestiaryMenuBtn = document.querySelector(".bestiary-toggle");
const bestiaryMenuList = document.querySelector(".bestiary-content");

function toggleBestiaryMenu(e) {
    e.stopPropagation();
    bestiaryMenuList.classList.toggle("show");

    if (bestiaryMenuList.classList.contains("show")) {
        bestiaryMenuBtn.innerHTML = "Close Bestiary";
        playClickMenuSound();
        bestiaryMenuList.style.display = "block";

        
        //Kill off the other opened ones
        objectivesMenuList.classList.remove("show");
        objectivesMenuBtn.innerHTML = "Open Objectives";
        objectivesMenuList.style.display = "none";

        menuStoreList.classList.remove("show");
        hamStoreBtn.innerHTML = "Open Store";
        menuStoreList.style.display = "none";
    } else {
        bestiaryMenuBtn.innerHTML = "Open Bestiary";
        playClickMenuSound();
        bestiaryMenuList.style.display = "none";
    }
}

bestiaryMenuBtn.addEventListener("click", toggleBestiaryMenu);

// window.addEventListener("click", function (e) {
//     fif (!document.querySelector(".dropdown-bestiary").contains(e.target)) {
//         bestiaryMenuList.classList.remove("show");
//         bestiaryMenuList.style.display = "none";
//         bestiaryMenuBtn.innerHTML = "Open Bestiary";
//     }
// });

//Bestiary Buttons

const ssBtn = document.getElementById("firstBestiaryCreature");
const bestiaryPage1 = document.querySelector(".bestiary-page1");
const XButton = document.querySelector(".close-btn");

const secBtn = document.getElementById("secondBestiaryCreature");
const bestiaryPage2 = document.querySelector(".bestiary-page2");
const XButton2 = bestiaryPage2.querySelector(".close-btn");

ssBtn.addEventListener("click", toggleSSPopup);


function toggleSSPopup(e) {
    if (!BestiaryOneBought) {
        playDeniedSound();
        return;
    }

    e.stopPropagation();
    bestiaryPage1.classList.toggle("show");

    if (bestiaryPage1.classList.contains("show")) {
        playClickMenuSound();
        bestiaryPage1.style.display = "block";
        objectivesMenuList.style.display = "none";
        objectivesMenuList.classList.remove("show");
        menuStoreList.style.display = "none";
        menuStoreList.classList.remove("show");
        objectivesMenuBtn.innerHTML = "Open Objectives";
        hamStoreBtn.innerHTML = "Open Store";
        //Bool check
        checkedBestiaryOne = true;

        //Also close the other one
        bestiaryPage2.style.display = "none";
        bestiaryPage2.classList.remove("show");
    } else {
        playClickMenuSound();
        bestiaryPage1.style.display = "none";

    }
}

XButton.addEventListener("click", function () {
    bestiaryPage1.style.display = "none";
    bestiaryPage1.classList.remove("show");

    playCrossXSound();
});


secBtn.addEventListener("click", toggleSecPopup);

function toggleSecPopup(e) {
    if (!BestiaryTwoBought) {
        playDeniedSound();
        return;
    }
    e.stopPropagation();
    bestiaryPage2.classList.toggle("show");

    if (bestiaryPage2.classList.contains("show")) {
        playClickMenuSound();
        bestiaryPage2.style.display = "flex";
        objectivesMenuList.style.display = "none";
        objectivesMenuList.classList.remove("show");
        menuStoreList.style.display = "none";
        menuStoreList.classList.remove("show");
        objectivesMenuBtn.innerHTML = "Open Objectives";
        hamStoreBtn.innerHTML = "Open Store";
        //Bool check
        checkedBestiaryTwo = true;

        //Also close the other one
        bestiaryPage1.style.display = "none";
        bestiaryPage1.classList.remove("show");


    } else {
        playClickMenuSound();
        bestiaryPage2.style.display = "none";
    }
}
XButton2.addEventListener("click", function () {
    bestiaryPage2.style.display = "none";
    bestiaryPage2.classList.remove("show");
    playCrossXSound();
});

//Hide bestiary section initially
bestiaryPage1.style.display = "none";
bestiaryPage2.style.display = "none";

//Objectives section menu
const objectivesMenuBtn = document.querySelector(".objectives-toggle");
const objectivesMenuList = document.querySelector(".objectives-content");
function toggleObjectivesMenu(e) {
    e.stopPropagation();
    objectivesMenuList.classList.toggle("show");

    if (objectivesMenuList.classList.contains("show")) {
        objectivesMenuBtn.innerHTML = "Close Objectives";
        playClickMenuSound();
        objectivesMenuList.style.display = "block";
        //Kill off the other opened ones
        menuStoreList.classList.remove("show");
        hamStoreBtn.innerHTML = "Open Store";
        menuStoreList.style.display = "none";

        bestiaryMenuList.classList.remove("show");
        bestiaryMenuBtn.innerHTML = "Open Bestiary";
        bestiaryMenuList.style.display = "none";
        ObjCheck();
    } else {
        objectivesMenuBtn.innerHTML = "Open Objectives";
        playClickMenuSound();
        objectivesMenuList.style.display = "none";
    }
}

objectivesMenuBtn.addEventListener("click", toggleObjectivesMenu);

//Objectives and strikethroughs
const Objective1 = document.querySelector("#obj1");
const Objective2 = document.querySelector("#obj2");
const Objective3 = document.querySelector("#obj3");

function ObjCheck() {
    //Obj1
    if (doubleScoreBought && firstCreatureBought && secondCreatureBought && BestiaryOneBought && BestiaryTwoBought) {
        Objective1.style.textDecoration = "line-through";
    }
    //Obj2
    if (checkedBestiaryOne && checkedBestiaryTwo) {
        Objective2.style.textDecoration = "line-through";
    }

    //Obj3
    if (score >= 100) {
        Objective3.style.textDecoration = "line-through";
    }
    else
    {
        Objective3.style.textDecoration = "none";
    }

    if (doubleScoreBought && firstCreatureBought && secondCreatureBought &&
        BestiaryOneBought && BestiaryTwoBought &&
        checkedBestiaryOne && checkedBestiaryTwo &&
        score >= 100 && !Winner) {
        const objectivesContainer = document.querySelector(".objectives-content");
        const WinMessage = document.createElement("p");
        WinMessage.id = "Win";
        WinMessage.innerHTML = "All Objectives Complete!<br> You should click on the 1st horse in the Horse Behaviour section 20 times now.";
        Winner = true;


        objectivesContainer.appendChild(WinMessage); // Adds it at the end
    }


}


// Create tooltip element
const tooltip = document.createElement('div');
tooltip.id = 'floatingTooltip';
document.body.appendChild(tooltip);

const buttons = document.querySelectorAll('.mamboNav');

buttons.forEach(button => {
    button.addEventListener('mousemove', e => {
        const text = button.getAttribute('data-tooltip');
        tooltip.textContent = text;

        const tooltipWidth = tooltip.offsetWidth;

        tooltip.style.top = (e.pageY + 15) + 'px';
        tooltip.style.left = (e.pageX - tooltipWidth) + 'px'; // position to left

        tooltip.style.opacity = 1;
    });

    button.addEventListener('mouseleave', () => {
        tooltip.style.opacity = 0;
    });
});




// Get all anatomy buttons and info elements
const anatomyButtons = document.querySelectorAll('.anatomy-buttons button');
const anatomyText = document.querySelector('#anatomyText');
const anatomyInfo = document.querySelector('.anatomy-info');

// Anatomy content data
const anatomyData = {
    head: {
        title: "Horse Head",
        content: "The horse's head contains the brain, eyes, ears, nostrils, and mouth. The eyes are positioned on the sides of the head, giving horses nearly 360-degree vision. The ears can rotate independently to detect sounds from different directions. The nostrils are large to allow for efficient breathing during physical activity."
    },
    neck: {
        title: "Horse Neck",
        content: "The neck is a crucial part of the horse's anatomy that provides balance and flexibility. It contains powerful muscles that help the horse raise and lower its head, and turn left or right. The neck also houses the esophagus and trachea. A strong, well-muscled neck is essential for proper movement and collection."
    },
    body: {
        title: "Horse Body (Torso)",
        content: "The horse's body includes the chest, back, and barrel (ribcage area). This houses vital organs including the heart, lungs, stomach, and other digestive organs. The withers (highest point of the back) is where the neck meets the back. The strong back muscles support the rider's weight and transfer power from the hindquarters."
    },
    legs: {
        title: "Horse Legs",
        content: "Horses have four legs, each ending in a single toe (the hoof). The front legs bear about 60% of the horse's weight and are responsible for steering and braking. The hind legs provide the main propulsive power for movement. Each leg contains numerous bones, joints, tendons, and ligaments that work together for efficient movement."
    },
    hooves: {
        title: "Horse Hooves",
        content: "The hoof is actually a modified toenail that covers and protects the sensitive internal structures of the foot. It's made of keratin (the same material as human fingernails). The hoof wall grows continuously and needs regular trimming. The frog (V-shaped structure on the bottom) acts as a shock absorber and helps with circulation."
    }
};

function updateAnatomyInfo(partName) {
    const data = anatomyData[partName];

    if (data) {
        anatomyInfo.classList.add('loading');

        setTimeout(() => {
            // Split content into sentences by period + space
            const sentences = data.content.split('. ').filter(s => s.trim().length > 0);

            // Build list items
            const listItems = sentences.map(sentence => `<li>${sentence.trim()}.</li>`).join('');

            anatomyText.innerHTML = `
                <strong style="color: #b16e09; font-size: 1.3rem; display: block; margin-bottom: 1rem;">
                    ${data.title}
                </strong>
                <ul style="padding-left: 1.2rem; margin-top: 0;">
                    ${listItems}
                </ul>
            `;

            anatomyInfo.classList.remove('loading');
            anatomyInfo.classList.add('highlight');

            setTimeout(() => {
                anatomyInfo.classList.remove('highlight');
            }, 1000);
        }, 300);
    }
}


// Function to set active button
function setActiveButton(activeButton) {
    // Remove active class from all buttons
    anatomyButtons.forEach(btn => btn.classList.remove('active'));

    // Add active class to clicked button
    activeButton.classList.add('active');
}

// Function to add interactive button effects
function addButtonEffects() {
    anatomyButtons.forEach(button => {
        // Add click sound effect (if you have audio)
        button.addEventListener('click', function () {
            // Optional: Add click sound
            playClickSound();

            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            setTimeout(() => {  
                ripple.remove();
            }, 600);
        });

        // Add hover sound effect
        button.addEventListener('mouseenter', function () {
            // Optional: Add hover sound
            // playHoverSound();
        });
    });
}

//Form
document.getElementById("KeywordInput").addEventListener("submit", function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const userInput = formData.get("Keyword").toLowerCase().trim();

  const validParts = ["Head", "head", "Neck", "neck", "Body", "body", "Legs", "legs", "Hooves", "hooves"]; // Add more parts as needed

  if (validParts.includes(userInput)) {
    updateAnatomyInfo(userInput);

    const button = document.querySelector(`.anatomy-buttons button[data-part="${userInput}"]`);
    if (button) setActiveButton(button);

    document.getElementById("output").innerText = 'Success!'; // Clear error if valid
    playWinnerSound();
  } else {
    document.getElementById("output").innerText = `Invalid Input! Try again...`;
    playDeniedSound();
  }

  this.reset(); // optional: clears the input field
});
// Event listeners for anatomy buttons
document.addEventListener('DOMContentLoaded', function () {
    // Head button
    const headBtn = document.querySelector('#headBtn');
    if (headBtn) {
        headBtn.addEventListener('click', function () {
            updateAnatomyInfo('head');
            setActiveButton(this);
        });
    }

    // Neck button
    const neckBtn = document.querySelector('#neckBtn');
    if (neckBtn) {
        neckBtn.addEventListener('click', function () {
            updateAnatomyInfo('neck');
            setActiveButton(this);
        });
    }

    // Body button
    const bodyBtn = document.querySelector('#bodyBtn');
    if (bodyBtn) {
        bodyBtn.addEventListener('click', function () {
            updateAnatomyInfo('body');
            setActiveButton(this);
        });
    }

    // Legs button
    const legsBtn = document.querySelector('#legsBtn');
    if (legsBtn) {
        legsBtn.addEventListener('click', function () {
            updateAnatomyInfo('legs');
            setActiveButton(this);
        });
    }

    // Hooves button
    const hoovesBtn = document.querySelector('#hoovesBtn');
    if (hoovesBtn) {
        hoovesBtn.addEventListener('click', function () {
            updateAnatomyInfo('hooves');
            setActiveButton(this);
        });
    }

    // Add button effects
    addButtonEffects();

    // Optional: Add keyboard navigation
    document.addEventListener('keydown', function (e) {
        const keys = ['1', '2', '3', '4', '5'];
        const parts = ['head', 'neck', 'body', 'legs', 'hooves'];
        const buttons = [headBtn, neckBtn, bodyBtn, legsBtn, hoovesBtn];

        const keyIndex = keys.indexOf(e.key);
        if (keyIndex !== -1 && buttons[keyIndex]) {
            updateAnatomyInfo(parts[keyIndex]);
            setActiveButton(buttons[keyIndex]);
            e.preventDefault();
        }
    });
});

// Optional: Function to reset to default state
function resetAnatomyInfo() {
    anatomyText.innerHTML = "Click on the buttons to learn more about each part of the horse's anatomy.";
    anatomyButtons.forEach(btn => btn.classList.remove('active'));
    anatomyInfo.classList.remove('highlight', 'loading');
}

// Optional: Add reset functionality with double-click on info area
if (anatomyInfo) {
    anatomyInfo.addEventListener('dblclick', resetAnatomyInfo);
}

// CSS for ripple effect
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject ripple CSS if not already present
if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = rippleCSS;
    document.head.appendChild(style);
}

// Horse Behavior Interactive JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Initialize behavior section functionality
    initializeBehaviorSection();

    // Add scroll animations
    addScrollAnimations();

    // Add image lazy loading
    addImageLazyLoading();

    // Add interactive hover effects
    addInteractiveEffects();
});

// Function to initialize the behavior section
function initializeBehaviorSection() {
    const behaviorSections = document.querySelectorAll('.behavior-section');

    behaviorSections.forEach((section, index) => {
        // Create structured content for each section
        restructureSection(section, index);

        // Add click interaction
        addSectionClickHandler(section, index);

        // Add keyboard navigation
        section.setAttribute('tabindex', '0');
        section.setAttribute('role', 'article');
        section.setAttribute('aria-label', `Horse behavior section ${index + 1}`);
    });
}

// Function to restructure sections with proper layout
function restructureSection(section, index) {
    // Get existing content
    const heading = section.querySelector('h3');
    const paragraphs = section.querySelectorAll('p');
    const image = section.querySelector('img');

    if (!heading || !image || paragraphs.length === 0) return;

    // Clear the section
    section.innerHTML = '';

    // Add proper class for styling
    image.className = 'behavior-image';

    // Create content wrapper
    const contentDiv = document.createElement('div');
    contentDiv.className = 'behavior-content';

    // Add heading to content
    contentDiv.appendChild(heading);

    // Add paragraphs to content
    paragraphs.forEach(p => {
        contentDiv.appendChild(p);
    });

    // Arrange image and content based on section index
    if (index % 2 === 0) {
        // Even sections: image left, content right
        section.appendChild(image);
        section.appendChild(contentDiv);
    } else {
        // Odd sections: content left, image right  
        section.appendChild(contentDiv);
        section.appendChild(image);
    }

    // Add entrance animation delay
    section.style.animationDelay = `${index * 0.2}s`;
}

// Function to add click handlers for sections
function addSectionClickHandler(section, index) {
    section.addEventListener('click', function () {
        // Add a subtle animation when clicked
        this.style.transform = 'scale(0.98)';

        setTimeout(() => {
            this.style.transform = '';
        }, 150);

        //Score +1

        //Check if the section clicked is the first one out of the three
        if (Haruscore < 20 && index === 0) {
            Haruscore++;
            playInfoClickSound();
        }
        else if (Haruscore >= 20 && !Harushown && Winner) {
            const haruSection = document.getElementById('haru');
            const oldImage = haruSection.querySelector('img');
            const newParagraph1 = document.querySelector("#Haru1");
            const newParagraph2 = document.querySelector("#Haru2");
            const newParagraph3 = document.querySelector("#Haru3");


            if (oldImage) {
                const newImage = document.createElement('img');
                newImage.src = 'images/HaruGrass.jpg';
                newImage.alt = 'Congratulations!';
                newImage.className = 'behavior-image';

                // Update text content of existing paragraphs
                newParagraph1.textContent = 'Haru Urara';
                newParagraph2.textContent = 'No matter how many times she falls, this girl always picks herself back up!';
                newParagraph3.textContent = 'She\'s on a losing streak... but she never gives up!';

                // Replace the old image
                haruSection.replaceChild(newImage, oldImage);
            }

            playRocketClickSound();
            Harushown = true;
        }

        else {
            playInfoClickSound();
        }
        // Log interaction (useful for analytics)
        //console.log(`Behavior section ${index + 1} clicked`);

        // Optional: Show detailed modal or expand content
        showBehaviorDetails(section, index);
    });
}

// Function to show detailed behavior information
function showBehaviorDetails(section, index) {
    if (index === 0 && Harushown === true) {
        const existingTooltips = document.querySelectorAll('.behavior-tooltip');
        existingTooltips.forEach(tooltip => tooltip.remove());
        return; // Don't show details if haru is already shown and index is 0
    }

    const detailedInfo = {
        0: {
            title: "Horse Herds - Social Structure",
            details: "In the wild, horses live in family groups led by a dominant stallion and a lead mare. The lead mare makes decisions about where to graze and when to move to water. Horses have a complex social hierarchy and form strong emotional bonds with other horses. They engage in mutual grooming, play together, and protect each other from predators."
        },
        1: {
            title: "Horse Communication - Complex Language",
            details: "Horses communicate through over 30 different vocalizations including neighs, whinnies, nickering, and snorts. Their body language is equally complex - ear position, tail movement, and posture all convey different messages. Horses can also communicate through scent marking and physical contact. Understanding these signals is crucial for safe horse handling."
        },
        2: {
            title: "Playful Nature - Learning Through Fun",
            details: "Play behavior in horses serves multiple purposes: it helps young horses develop motor skills, establishes social bonds, and provides mental stimulation. Adult horses continue to play throughout their lives. Common play behaviors include running in groups, mock fighting, chasing, and investigating new objects. Play is a sign of a healthy, well-adjusted horse."
        }
    };

    const info = detailedInfo[index];
    if (!info) return;

    showTooltip(section, info);
}

// Function to create and show tooltip with detailed information
function showTooltip(section, info) {
    // Remove existing tooltips
    const existingTooltips = document.querySelectorAll('.behavior-tooltip');
    existingTooltips.forEach(tooltip => tooltip.remove());

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'behavior-tooltip';
    tooltip.innerHTML = `
        <h4>${info.title}</h4>
        <p>${info.details}</p>
        <button class="tooltip-close">×</button>
    `;

    // Add tooltip styles
    Object.assign(tooltip.style, {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '2px solid #b16e09',
        borderRadius: '1rem',
        padding: '1rem',
        maxWidth: '300px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        zIndex: '1000',
        animation: 'fadeIn 0.3s ease'
    });

    // Add to section
    section.style.position = 'relative';
    section.appendChild(tooltip);

    // Add close functionality
    const closeBtn = tooltip.querySelector('.tooltip-close');
    closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        tooltip.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => tooltip.remove(), 300);
        playClickShiftSound();
    });

    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => tooltip.remove(), 300);
        }
    }, 5000);
}

// Function to add scroll animations
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px'
    });

    // Observe all behavior sections
    const behaviorSections = document.querySelectorAll('.behavior-section');
    behaviorSections.forEach(section => {
        section.classList.add('scroll-animate');
        observer.observe(section);
    });
}

// Function to add image lazy loading and error handling
function addImageLazyLoading() {
    const behaviorImages = document.querySelectorAll('.behavior-image');

    behaviorImages.forEach(img => {
        // Add loading placeholder
        img.style.background = 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 50%, #f0f0f0 50%, #f0f0f0 75%, transparent 75%, transparent)';
        img.style.backgroundSize = '20px 20px';

        // Handle load success
        img.addEventListener('load', function () {
            this.style.background = '';
            this.classList.add('loaded');
        });

    });
}

// Function to add interactive effects
function addInteractiveEffects() {
    const behaviorSections = document.querySelectorAll('.behavior-section');

    behaviorSections.forEach((section) => {
        const image = section.querySelector('.behavior-image');
        const content = section.querySelector('.behavior-content');

        if (!image || !content) return;

        // Add parallax-like effect on mouse move
        section.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const moveX = (x - 0.5) * 10;
            const moveY = (y - 0.5) * 10;

            image.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.02)`;
        });

        // Reset on mouse leave
        section.addEventListener('mouseleave', function () {
            image.style.transform = '';
        });

        // Add focus effects for accessibility
        section.addEventListener('focus', function () {
            this.style.outline = '3px solid #b16e09';
            this.style.outlineOffset = '4px';
        });

        section.addEventListener('blur', function () {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Add CSS animations for tooltips
const tooltipCSS = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-10px); }
}

.behavior-tooltip h4 {
    margin: 0 0 0.5rem 0;
    color: #b16e09;
    font-size: 1.1rem;
}

.behavior-tooltip p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #374151;
}

.tooltip-close {
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6b7280;
    line-height: 1;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tooltip-close:hover {
    color: #dc2626;
    background: rgba(239, 68, 68, 0.1);
    border-radius: 50%;
}

.behavior-image.loaded {
    animation: imageLoad 0.5s ease;
}

@keyframes imageLoad {
    from { opacity: 0; filter: blur(5px); }
    to { opacity: 1; filter: blur(0); }
}
`;

// Inject tooltip CSS
if (!document.querySelector('#behavior-tooltip-styles')) {
    const style = document.createElement('style');
    style.id = 'behavior-tooltip-styles';
    style.textContent = tooltipCSS;
    document.head.appendChild(style);
}

//Sounds all sounds

const MamboClick = new Audio("audio/Mambo.mp3");
const ClickSound = new Audio("audio/ButtonClick.mp3");
const ClickShiftSound = new Audio("audio/ClickShiftSound.mp3");
const ClickMenuSound = new Audio("audio/ClickMenu.mp3");
const ClickInfoSound = new Audio("audio/InfoClick.mp3");
const RocketClickSound = new Audio("audio/Explode.mp3");
const WOWSound = new Audio("audio/WOW.mp3");
const HachimiSound = new Audio("audio/Hachimi.mp3");
const GoldshiScreamSound = new Audio("audio/GoldshiScream.mp3");
const WinnerSound = new Audio("audio/Success.mp3");
const XSound = new Audio("audio/JumpXButton.mp3");
const DeniedSound = new Audio ("audio/Denied.mp3");

//Audio adjust
GoldshiScreamSound.volume = 0.5; // Lower volume for Goldshi scream

// Instead of using a single MamboClick audio element:
function playMamboSound() {
    const mambo = MamboClick.cloneNode(); // Duplicate to allow overlapping
    mambo.play();
}

function playClickSound() {
    const click = ClickSound.cloneNode(); // Duplicate to allow overlapping
    click.play();
}

function playClickShiftSound() {
    const clickS = ClickShiftSound.cloneNode(); // Duplicate to allow overlapping
    clickS.play();
}

function playClickMenuSound() {
    const clickM = ClickMenuSound.cloneNode(); // Duplicate to allow overlapping
    clickM.play();
}

function playInfoClickSound() {
    const clickI = ClickInfoSound.cloneNode(); // Duplicate to allow overlapping
    clickI.play();
}

function playRocketClickSound() {
    const clickR = RocketClickSound.cloneNode(); // Duplicate to allow overlapping
    clickR.play();
}

function playWOWSound() {
    const wow = WOWSound.cloneNode(); // Duplicate to allow overlapping
    wow.play();
}

function playHachimiSound() {
    const hachimi = HachimiSound.cloneNode(); // Duplicate to allow overlapping
    hachimi.play();
}

function playGoldshiScreamSound() {
    const goldshi = GoldshiScreamSound.cloneNode(); // Duplicate to allow overlapping
    goldshi.play();
}

function playWinnerSound() {
    const Winner = WinnerSound.cloneNode(); // Duplicate to allow overlapping
    Winner.play();
}

function playCrossXSound() {
    const JumpSoundX = XSound.cloneNode(); // Duplicate to allow overlapping
    JumpSoundX.play();
}

function playDeniedSound () {
    const Denied = DeniedSound.cloneNode(); // Duplicate to allow overlapping
    Denied.play();
}

const BGM = new Audio("audio/NCS.mp3");
BGM.volume = 1;
BGM.loop = true;
// Wait for the user to click anywhere on the page before playing BGM
document.addEventListener("click", function startMusicOnce() {
    BGM.play().then(() => {
        //console.log("BGM started playing");
    }).catch(err => {
        console.warn("BGM failed to play:", err);
    });

    // Remove this listener so BGM doesn't try to start again every click

    document.removeEventListener("click", startMusicOnce);
});

function playSoundWhenClicked(creature) {

    //If creature is:
    // duriandId, play mambo.
    // creatureOne, play hachimi
    // creatureTwo, play goldship
    const id = creature.id;
    if (score >= scoregoal) {
        playWOWSound();
    }
    else if (id === "durianId") {
        playMamboSound();
    } else if (id === "creatureOne") {
        playHachimiSound();
    } else if (id === "creatureTwo") {
        playGoldshiScreamSound();
    }
}

document.addEventListener("click", enterFullscreen);

function enterFullscreen() { //must be called by user generated event
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
}

/*What to do.

1. Code out double score when the player purchases the item from the store. (Done)
2. When hover over the store item, show a tooltip that says "buy?", and the "purchased!" when the player buys it. (Done)
3. Add logic to have the 2nd and 3rd creature have the same behavior as mambo. They are Silence Suzuka and King Halo (USA and UK horses). (Done)
4. bestiary section: add a popup in the page that shows some fun facts about the horse. (Done)
5. When player buys all upgrades and gets 100 Score, tell the player to click on the first horse in the "Horse Behavior" section 20 times for a surprise.   (Done)
6. Win, roll credits.(yay)


7. Also, have css sprites for the History of Horses section. :( ((Done))

8. Fix the minigame on mobile seriously its horrible (Everything is css related) (Done)
8.5 try to fix history of horses left and right (It goes to the right too fast and doesnt clear all 4 sections) (i hate this)
9. 2nd and 3rd creature dont dynamically scale with the size of the screen. (Done)

*/