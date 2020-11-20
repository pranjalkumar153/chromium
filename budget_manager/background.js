var contextMenuObject = {
    "id": "spendMoneynow",
    "title": "Spend Money",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuObject);

function isInt(value) {
    return !isNaN(value) && parseInt(value) == value;
}

chrome.contextMenus.onClicked.addListener(function(clickData) {
    if (clickData.menuItemId == "spendMoneynow" && clickData.selectionText) {
        if (isInt(clickData.selectionText)) {
            var newTotal = 0;
            chrome.storage.sync.get("total", function(budget) {
                if (budget.total) {
                    newTotal += parseInt(budget.total);
                }
            });
            newTotal += parseInt(clickData.selectionText);
            chrome.storage.sync.set({ "total": newTotal });
        }
    }
});