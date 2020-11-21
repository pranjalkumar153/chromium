var contextMenuObject = {
    "id": "SpendMoney",
    "title": "Spend Money",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuObject);

function isInt(value) {
    return !isNaN(value) && parseInt(value) == value && !isNaN(parseInt(value, 10));
}

chrome.contextMenus.onClicked.addListener(function(clickData) {
    if (clickData.menuItemId == "SpendMoney" && clickData.selectionText) {
        if (isInt(clickData.selectionText)) {
            chrome.storage.sync.get(["limit", "total"], function(budget) {
                var newTotal = 0;
                if (budget.total) {
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({ "total": newTotal }, function() {
                    var notificationObject = {
                        type: "basic",
                        title: "Limit Exceeded!!",
                        message: "Looks like you have spent more than your sepnding limit!!",
                        iconUrl: "moneyicon.jpg"
                    }
                    if (parseInt(budget.limit) <= parseInt(budget.total)) {
                        chrome.notifications.create(notificationObject, function() {
                            console.log("Notified!!");
                        });
                    }
                });
            });
        }
    }
});