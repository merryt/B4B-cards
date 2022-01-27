
function populateList(path, selector) {
    var select = document.getElementById(selector);
    for (var i = 0; i < path.length; i++) {
        var opt = path[i].name;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = i;
        select.appendChild(el);
    }
}

populateList(path1, "currentP1");
populateList(path1, "goalP1");
populateList(path2, "currentP2");
populateList(path2, "goalP2");
populateList(path3, "currentP3");
populateList(path3, "goalP3");

deck = new Array(15).fill()
fulldeck = [path1, path2, path3].flat().sort((a, b) => a.name.localeCompare(b.name));
deck.forEach((card, index) => {
    var select = document.createElement("select")
    var label = document.createElement("label")
    label.innerText = "Goal Card " + (parseInt(index) + 1)
    select.id = "_goalCard" + index
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

function checkPath(id) {
    currentPath = [path1, path2, path3][id - 1];
    currentCardSelect = document.getElementById("currentP" + id);
    currentCardloc =
        parseInt(currentCardSelect.options[currentCardSelect.selectedIndex].value);
    goalCardSelect = document.getElementById("goalP" + id);
    goalCardloc = parseInt(goalCardSelect.options[goalCardSelect.selectedIndex].value);

    if (currentCardloc < goalCardloc) {
        cardsToGo = currentPath.slice(currentCardloc, parseInt(goalCardloc) + 1);
        pointToGo = cardsToGo.reduce((acc, item) => {
            return acc + parseInt(item.cost)
        }, 0)
        document.querySelector("#pointsToGo" + id).innerText = pointToGo;
    } else {
        document.querySelector("#pointsToGo" + id).innerText = "already got it bud";
    }

}

document.addEventListener("input", function (event) {
    targetId = event.target.id;
    pathId = targetId.slice(targetId.length - 1, targetId.length);
    console.log(targetId.slice(0, 4))

    addQueryStrings()


    if (targetId.slice(0, 5) !== "_goal") {
        checkPath(pathId);
    }
});


function addQueryStrings() {
    currentCardsIds = ["currentP1", "currentP2", "currentP3"].map((name, index) => {
        goalCardSelect = document.getElementById(name);
        goalCardloc = parseInt(goalCardSelect.options[goalCardSelect.selectedIndex].value);
        return [path1, path2, path3][index][goalCardloc].id;
    })

    let emptygoals = new Array(15).fill(0).map((_, i) => `_goalCard${i}`)
    goalDeckIds = emptygoals.map((name) => {
        goalCardSelect = document.getElementById(name);
        goalCardloc = parseInt(goalCardSelect.options[goalCardSelect.selectedIndex].value);
        return goalCardSelect.options[goalCardSelect.selectedIndex].value;
    })


    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?currentplace=${currentCardsIds}&deck=${goalDeckIds}`;
        window.history.pushState({ path: newurl }, '', newurl);
    }
}