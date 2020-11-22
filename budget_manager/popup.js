$(function() {
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
    $("#spend_amount").click(function() {
        var newTotal = 0;
        var d = new Date();
        var spent_now = "";
        var total_till_now = 0;
        var page_url = "";
        if ($("#entered_amount").val()) {
            var spent_value = parseInt($("#entered_amount").val(), 10);
            spent_now = spent_value;
            newTotal += spent_value;
            $("#entered_amount").val("");
        }
        chrome.storage.sync.get("total", function(budget) {
            if (budget.total)
                newTotal += parseInt(budget.total, 10);
            chrome.storage.sync.set({ "total": newTotal }, function() {
                $("#total_spent_amount").text(newTotal);
                $("#entered_amount").val("");
                total_till_now = newTotal;
            });
            chrome.storage.sync.get(["total", "limit"], function(budget) {
                var notify = {
                    type: "basic",
                    title: "Limit Exceeded",
                    message: "Seems like you have spent more than your spending limit!!",
                    iconUrl: "icon.jpg"
                };
                if (parseInt(budget.total) >= parseInt(budget.limit)) {
                    chrome.notifications.create(notify);
                }
            });
        });
        // will make an array of this type of object which will fetch all the requirements
        // for the graph plotting.
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            page_url = tabs[0].url;
            console.log(page_url);
        });
        var spent_obj_information = {
            date: d,
            spent_amount: spent_now,
            total: total_till_now,
            url_of_website: page_url
        };
        console.log(spent_obj_information);
        var spent_data_array = [];
        // storing the array to chrome store
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
    });
    $("#set_limit").click(function() {
        if ($("#set_the_limit").val()) {
            var limit_value = parseInt($("#set_the_limit").val());
            chrome.storage.sync.set({ "limit": limit_value }, function() {
                $("#spending_limit").text(limit_value);
                $("#set_the_limit").val("");
            });
        }
        chrome.storage.sync.get(["total", "limit"], function(budget) {
            var notify = {
                type: "basic",
                title: "Limit Exceeded",
                message: "Seems like you have exceeded your spending limit!!",
                iconUrl: "icon.jpg"
            };
            if (parseInt(budget.total) >= parseInt(budget.limit)) {
                chrome.notifications.create(notify);
            }
        });
    });
});