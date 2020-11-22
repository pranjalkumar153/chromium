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
                    };
                    if (parseInt(budget.limit) <= parseInt(budget.total)) {
                        chrome.notifications.create(notificationObject, function() {
                            console.log("Notified!!");
                        });
                    }
                });
            });
            // Adding the functionality for storing record of each spending. 
            var d = new Date(); // sorted
            var spent_now = ""; //sorted
            var total_till_now = 0; //sorted
            var page_url = "";
            spent_now = parseInt(clickData.selectionText);
            chrome.storage.sync.get("total", function(budget) {
                if (budget.total) {
                    total_till_now = parseInt(budget.total);
                }
            });
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                page_url = tabs[0].url;
                console.log(page_url);
            });
            // Exactly same as that in popup.js
            var spent_obj_information = {
                date: d,
                spent_amount: spent_now,
                total: total_till_now,
                url_of_website: page_url
            };
            chrome.storage.sync.get("spent_data_array", function(budget) {
                if (budget.spent_data_array) {
                    spent_data_array = budget.spent_data_array;
                    spent_data_array.push(spent_obj_information);
                    chrome.storage.sync.set({ "spent_data_array": spent_data_array });
                } else {
                    spent_data_array = [spent_obj_information];
                    chrome.storage.sync.set({ "spent_data_array": spent_data_array });
                }
            });
        }
    }
});