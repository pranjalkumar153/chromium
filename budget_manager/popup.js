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
        if ($("#entered_amount").val()) {
            var spent_value = parseInt($("#entered_amount").val(), 10);
            newTotal += spent_value;
            $("#entered_amount").val("");
        }
        chrome.storage.sync.get("total", function(budget) {
            if (budget.total)
                newTotal += parseInt(budget.total, 10);
            chrome.storage.sync.set({ "total": newTotal }, function() {
                $("#total_spent_amount").text(newTotal);
                $("#entered_amount").val("");
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