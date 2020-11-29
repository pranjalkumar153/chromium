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
                        message: "Seems Like you have spent more than your spending limit!!",
                        iconUrl: "icon.jpg"
                    };
                    if (parseInt(budget.limit) <= parseInt(budget.total)) {
                        chrome.notifications.create(notificationObject, function() {
                            console.log("Notified!!");
                        });
                    }
                });
                // var newTotal = 0; //sorted
                var d = new Date(); //sorted
                var day = d.getDate();
                var month = d.getMonth();
                var year = d.getFullYear();
                var hh = d.getHours();
                var min = d.getMinutes();
                var secs = d.getSeconds();
                var spent_now = parseInt(clickData.selectionText);
                var total_till_now = newTotal; //sorted
                var page_url = ""; //sorted
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    page_url = tabs[0].url;
                    console.log(page_url);
                    var spent_obj_information = {
                        date: { dd: day, mm: month, yy: year, hrs: hh, mins: min, ss: secs },
                        spent_amount: spent_now,
                        total: total_till_now,
                        url_of_website: page_url
                    };
                    console.log(spent_obj_information);
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
                            var obj = x[x.length - 1];
                            if (RegExp("/www.flipkart.com/").test(obj.url_of_website)) {
                                chrome.storage.sync.get("flipkart", function(budget) {
                                    var x = [];
                                    if (budget.flipkart) {
                                        x = budget.flipkart;
                                        x.push(obj);
                                    } else {
                                        x = [obj];
                                    }
                                    chrome.storage.sync.set({ "flipkart": x });
                                    console.log(x);
                                });
                            } else if (RegExp("/www.amazon.in/").test(obj.url_of_website)) {
                                chrome.storage.sync.get("amazon", function(budget) {
                                    var x;
                                    if (budget.amazon) {
                                        x = budget.amazon;
                                        x.push(obj);
                                    } else {
                                        x = [obj];
                                    }
                                    chrome.storage.sync.set({ "amazon": x });
                                    console.log(x);
                                });
                            } else if (RegExp("/www.myntra.com/").test(obj.url_of_website)) {
                                chrome.storage.sync.get("myntra", function(budget) {
                                    var x;
                                    if (budget.myntra) {
                                        x = budget.myntra;
                                        x.push(obj);
                                    } else {
                                        x = [obj];
                                    }
                                    chrome.storage.sync.set({ "myntra": x });
                                    console.log(x);
                                });
                            } else if (RegExp("/www.snapdeal.com/").test(obj.url_of_website)) {
                                chrome.storage.sync.get("snapdeal", function(budget) {
                                    var x;
                                    if (budget.snapdeal) {
                                        x = budget.snapdeal;
                                        x.push(obj);
                                    } else {
                                        x = [obj];
                                    }
                                    chrome.storage.sync.set({ "snapdeal": x });
                                    console.log(x);
                                });
                            } else {
                                chrome.storage.sync.get("others", function(budget) {
                                    var x;
                                    if (budget.others) {
                                        x = budget.others;
                                        x.push(obj);
                                    } else {
                                        x = [obj];
                                    }
                                    chrome.storage.sync.set({ "others": x });
                                    console.log(x);
                                });
                            }
                        });
                    });
                });
            });
        }
    }
});

// The websites which will host data are as follows:
// 1. Flipkart
// 2. Amazon
// 3. Myntra
// 4. Snapdeal
// 5. Others