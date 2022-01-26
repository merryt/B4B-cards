
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

function checkPath(id) {
    currentPath = [path1, path2, path3][id - 1];
    currentCardSelect = document.getElementById("currentP" + id);
    currentCardloc =
        parseInt(currentCardSelect.options[currentCardSelect.selectedIndex].value);
    goalCardSelect = document.getElementById("goalP" + id);
    goalCardloc = parseInt(goalCardSelect.options[goalCardSelect.selectedIndex].value);
    console.log(`${currentCardloc} - ${goalCardloc}`);

    if (currentCardloc < goalCardloc) {
        cardsToGo = currentPath.slice(currentCardloc, parseInt(goalCardloc) + 1);
        console.log(cardsToGo.length)
        pointToGo = cardsToGo.reduce((acc, item) => {
            //console.log(acc)
            //console.log(item)
            return acc + parseInt(item.cost)
        }, 0)
        console.log("-----")
        console.log(pointToGo)
        document.querySelector("#pointsToGo" + id).innerText = pointToGo;
    } else {
        document.querySelector("#pointsToGo" + id).innerText = "already got it bud";
    }

}

document.addEventListener("input", function (event) {
    targetId = event.target.id;
    pathId = targetId.slice(targetId.length - 1, targetId.length);
    checkPath(pathId);
});
