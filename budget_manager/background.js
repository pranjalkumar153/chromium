var contextMenuObject = {
    "id": "SpendBucks",
    "title": "Spend Money",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuObject);

function isInt(value) {
    return !isNaN(value) && parseInt(value) == value && !isNaN(parseInt(value, 10));
}


chrome.contextMenus.onClicked.addListener(function(clickdata) {
    if (clickdata.menuItemId == "spendBucks" && clickdata.selectionText) {
        var newTotal = 0; //issue resolved
        var d = new Date(); //issue resolved
        var spent_now = ""; //issue resolved
        var total_till_now = 0; //issue resolved
        var page_url = ""; //issue resolved
        if (parseInt(clickdata.selectionText) && isInt(clickdata.selectionText)) {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                page_url = tabs[0].url;
                console.log(page_url);
                spent_now = parseInt(clickdata.selectionText);
                chrome.storage.sync.get("total", function(budget) {
                    if (budget.total) {
                        newTotal += parseInt(budget.total);
                    }
                    newTotal += parseInt(clickdata.selectionText);
                    total_till_now = newTotal;
                    var spent_obj_information = {
                        date: d,
                        spent_amount: spent_now,
                        total: total_till_now,
                        url_of_website: page_url
                    };
                    chrome.storage.sync.get("spent_data_array", function(budget) {
                        var x;
                        if (budget.spent_data_array) {
                            x = budget.spent_data_array;
                            x.push(spent_obj_information);
                        } else {
                            x = [spent_obj_information];
                        }
                        console.log(x);
                        chrome.storage.sync.set({ "spent_data_array": x }, function() {
                            chrome.storage.sync.set({ "total": newTotal }, function() {
                                chrome.storage.sync.get(["total", "limit"], function(budget) {
                                    if (budget.total || parseInt(budget.total) == 0) {
                                        var total_amount = parseInt(budget.total, 10);
                                        $("#total_spent_amount").text(total_amount);
                                    } else if (!(budget.total)) {
                                        $("#total_spent_amount").text("NA");
                                    }
                                    if (budget.limit) {
                                        var limit_value = parseInt(budget.limit, 10);
                                        $("#spending_limit").text(limit_value);
                                    } else if (!(budget.limit)) {
                                        $("#spending_limit").text("NA");
                                    }
                                });
                            });
                        });
                    });
                });
            });
        }
    }
});