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
                        chrome.storage.sync.set({ "spent_data_array": x });
                    });
                });
            });
        }
        var flipkart = [];
        var Amazon = [];
        var Myntra = [];
        var Snapdeal = [];
        var others = [];

        chrome.storage.sync.get("spent_data_array", function(budget) {
            var x = budget.spent_data_array;
            if (x) {
                for (var i = 0; i < x.length; i++) {
                    if (RegExp("/www.flipkart.com/").test(x[i].url_of_website)) {
                        flipkart.push(x[i]);
                    } else if (RegExp("/www.amazon.in/").test(x[i].url_of_website)) {
                        Amazon.push(x[i]);
                    } else if (RegExp("/www.mytra.com/").test(x[i].url_of_website)) {
                        Myntra.push(x[i]);
                    } else if (RegExp("/www.snapdeal.com/").test(x[i].url_of_website)) {
                        Snapdeal.push(x[i]);
                    } else others.push(x[i]);
                }
                chrome.storage.sync.set({ "flipkart": flipkart });
                chrome.storage.sync.set({ "amazon": Amazon });
                chrome.storage.sync.set({ "myntra": Myntra });
                chrome.storage.sync.set({ "snapdeal": Snapdeal });
                chrome.storage.sync.set({ "others": others });
            }

        });
    }
});

// The websites which will host data are as follows:
// 1. Flipkart
// 2. Amazon
// 3. Myntra
// 4. Snapdeal
// 5. Others

// Knowledge of regex expression is required.
// And file handling with javascript


//separating out data for Flipkart.
var flipkart = [];
var Amazon = [];
var Myntra = [];
var Snapdeal = [];
var others = [];

chrome.storage.sync.get("spent_data_array", function(budget) {
    var x = budget.spent_data_array;
    if (x) {
        for (var i = 0; i < x.length; i++) {
            if (RegExp("/www.flipkart.com/").test(x[i].url_of_website)) {
                flipkart.push(x[i]);
            } else if (RegExp("/www.amazon.in/").test(x[i].url_of_website)) {
                Amazon.push(x[i]);
            } else if (RegExp("/www.mytra.com/").test(x[i].url_of_website)) {
                Myntra.push(x[i]);
            } else if (RegExp("/www.snapdeal.com/").test(x[i].url_of_website)) {
                Snapdeal.push(x[i]);
            } else others.push(x[i]);
        }
        chrome.storage.sync.set({ "flipkart": flipkart });
        chrome.storage.sync.set({ "amazon": Amazon });
        chrome.storage.sync.set({ "myntra": Myntra });
        chrome.storage.sync.set({ "snapdeal": Snapdeal });
        chrome.storage.sync.set({ "others": others });
    }

});
// Learn file handling in Javascript to continue further.
// Larn chrome API fileSystem.

// chrome.storage.sync.get("flipkart", function(budget) {
//     console.log(budget.amazon);
// });

function resolve_for_graph(arr) {
    var arr_new = [];
    if (!arr) {
        return [];
    } else {
        arr_new.push(arr[0]);
        for (var i = 1; i < arr.length; i++) {
            if (arr_new[arr_new.length - 1].date.dd == arr[i].date.dd &&
                arr_new[arr_new.length - 1].date.mm == arr[i].date.mm &&
                arr_new[arr_new.length - 1].date.yy == arr[i].date.yy) {
                arr_new[arr_new.length - 1].spent_amount += arr[i].spent_amount;
            } else {
                arr_new.push(arr[i]);
            }
        }
        return arr_new;
    }
}
// spent_data_array: spent_data_array_graph
// flipkart: flipkart_graph
// amazon: amazon_graph
// myntra: amazon_graph
// snapdeal: snapdeal_graph
// others: others_graph
// overall spendings
chrome.storage.sync.get("spent_data_array", function(budget) {
    console.log("Spent_data_array");
    console.log(budget.spent_data_array);
    var x = resolve_for_graph(budget.spent_data_array);
    console.log("after resolving");
    console.log(x);
    chrome.storage.sync.set({ "spent_data_array_graph": x });
});
// flipkart
chrome.storage.sync.get("flipkart", function(budget) {
    var x = resolve_for_graph(budget.flipkart);
    console.log(x);
    chrome.storage.sync.set({ "flipkart_graph": x });
});
// amazon
chrome.storage.sync.get("amazon", function(budget) {
    var x = resolve_for_graph(budget.amazon);
    console.log(x);
    chrome.storage.sync.set({ "amazon_graph": x });
});

// myntra
chrome.storage.sync.get("myntra", function(budget) {
    var x = resolve_for_graph(budget.myntra);
    console.log(x);
    chrome.storage.sync.set({ "myntra_graph": x });
});

// snapdeal
chrome.storage.sync.get("snapdeal", function(budget) {
    var x = resolve_for_graph(budget.snapdeal);
    console.log(x);
    chrome.storage.sync.set({ "snapdeal_graph": x });
});

// others
chrome.storage.sync.get("others", function(budget) {
    var x = resolve_for_graph(budget.others);
    console.log(x);
    chrome.storage.sync.set({ "others_graph": x });
});

// chrome.storage.sync.get("flipkart_graph", function(budget) {
//     console.log(budget.flipkart);
// });