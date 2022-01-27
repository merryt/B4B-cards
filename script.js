
function populateList(path, selector) {
    var select = document.getElementById(selector);
    for (var i = 0; i < path.length; i++) {
        var opt = path[i].name;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = path[i].id;
        select.appendChild(el);
    }
}

function checkPath() {
    const { currentplace, idealdeck } = readQueryStrings()


    const sortedDeck = ["a0", "b0", "c0"]
        .map((letter) => idealdeck.filter((card) => card.includes(letter.slice(0, 1))))
        .map((cards) => cards.reduce((acc, card) => {
            if (parseInt(acc.slice(1)) > parseInt(card.slice(1))) {
                return acc
            }
            return card
        }, []))
    currentplace.forEach((item, index) => {
        currentPath = [path1, path2, path3][index];
        if (item.slice(1) < sortedDeck[index].slice(1)) {
            cardsToGo = currentPath.slice(item.slice(1), sortedDeck[index].slice(1));
            pointToGo = cardsToGo.reduce((acc, item) => {
                return acc + parseInt(item.cost)
            }, 0)
            document.querySelector("#pointsToGo" + index).innerText = pointToGo;
        } else {
            document.querySelector("#pointsToGo" + index).innerText = "already got it bud";
        }
    })
}

document.addEventListener("input", function (event) {
    writeQueryStrings()
    checkPath();
});


function readQueryStrings() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const currentplace = params.currentplace.split(',')
    const idealdeck = params.deck.split(',');
    return { currentplace, idealdeck }
}

function writeQueryStrings() {
    currentCardsIds = ["currentP0", "currentP1", "currentP2"].map((name, index) => {
        goalCardSelect = document.getElementById(name);
        goalCardloc = parseInt(goalCardSelect.options[goalCardSelect.selectedIndex].value);
        return goalCardSelect.options[goalCardSelect.selectedIndex].value;
    })

    let emptygoals = new Array(15).fill(0).map((_, i) => `goalCard${i}`)
    goalDeckIds = emptygoals.map((name) => {
        goalCardSelect = document.getElementById(name);
        return goalCardSelect.options[goalCardSelect.selectedIndex].value;
    })


    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?currentplace=${currentCardsIds}&deck=${goalDeckIds}`;
        window.history.pushState({ path: newurl }, '', newurl);
    }
}

function init() {

    // build top3 selectors
    populateList(path1, "currentP0");
    populateList(path2, "currentP1");
    populateList(path3, "currentP2");

    // build deck selectors
    const deck = new Array(15).fill()
    fulldeck = [path1, path2, path3].flat().sort((a, b) => a.name.localeCompare(b.name));
    deck.forEach((_card, index) => {
        var select = document.createElement("select")
        var label = document.createElement("label")
        label.innerText = "Goal Card " + (parseInt(index) + 1)
        select.id = "goalCard" + index
        for (var i = 0; i < fulldeck.length; i++) {
            var opt = fulldeck[i].name;
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = fulldeck[i].id;
            select.appendChild(el);
        }
        document.querySelector("#idealDeck").appendChild(label)
        document.querySelector("#idealDeck").appendChild(select)
        document.querySelector("#idealDeck").appendChild(document.createElement("br"))
    })


    const { currentplace, idealdeck } = readQueryStrings()
    currentplace.forEach((item, index) => {
        select = document.getElementById("currentP" + index).value = item
    })
    idealdeck.forEach((item, index) => {
        select = document.getElementById("goalCard" + index).value = item
    })
}

init()