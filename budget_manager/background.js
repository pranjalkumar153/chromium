var contextMenuObject = {
    "id": "spending_money",
    "title": "Spend Money",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuObject);

function isInt(value) {
    return !isNaN(value) && parseInt(value) == value;
}

chrome.contextMenus.onClicked.addListener(function(clickData) {
    if (clickData.menuItemId == "spending_money" && clickData.selectionText) {
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
    chrome.storage.sync.get(["total", "limit"], function(budget) {
        var notify = {
            type: "basic",
            iconUrl: "icon.jpg",
            title: "Limit Exceeded",
            message: "Seems like you have exceeded your limit!!"
        };
        if (parseInt(budget.total) >= parseInt(budget.limit)) {
            chrome.notifications.create(notify);
        }
    });
});