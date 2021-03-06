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
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            page_url = tabs[0].url;
            // console.log(page_url);
            if ($("#entered_amount").val()) {
                spent_now = parseInt($("#entered_amount").val());
                $("#entered_amount").val("");
                chrome.storage.sync.get("total", function(budget) {
                    if (budget.total) {
                        total_till_now += parseInt(budget.total);
                    }
                    var day = d.getDate();
                    var month = d.getMonth();
                    var year = d.getFullYear();
                    var hh = d.getHours();
                    var min = d.getMinutes();
                    var secs = d.getSeconds();
                    total_till_now += spent_now;
                    newTotal = total_till_now;
                    chrome.storage.sync.set({ "total": total_till_now }, function() {
                        var spent_obj_information = {
                            date: { dd: day, mm: month, yy: year, hrs: hh, mins: min, ss: secs },
                            spent_amount: spent_now,
                            total: total_till_now,
                            url_of_website: page_url
                        };
                        // console.log(spent_obj_information);
                        chrome.storage.sync.get("spent_data_array", function(budget) {
                            var x;
                            if (budget.spent_data_array) {
                                x = budget.spent_data_array;
                                x.push(spent_obj_information);
                            } else {
                                x = [spent_obj_information];
                            }
                            // console.log(x);
                            chrome.storage.sync.set({ "spent_data_array": x }, function() {
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
                            chrome.storage.sync.get(["total", "limit"], function(budget) {
                                if (parseInt(budget.total) >= parseInt(budget.limit)) {
                                    var notifyObj = {
                                        type: "basic",
                                        title: "Limit Exceeded!!",
                                        message: "Seems Like you have spent more than your spending limit!!",
                                        iconUrl: "icon.jpg"
                                    };
                                    chrome.notifications.create(notifyObj);
                                }
                            });
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
                                            var x;
                                            if (budget.flipkart) {
                                                x = budget.flipkart;
                                                x.push(obj);
                                            } else {
                                                x = [obj];
                                            }
                                            chrome.storage.sync.set({ "flipkart": x });
                                            // console.log(x);
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
                                            // console.log(x);
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
                                            // console.log(x);
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
                                            // console.log(x);
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
                                            // console.log(x);
                                        });
                                    }
                                });
                            });
                        });
                    });
                });
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
                message: "Seems Like you have spent more than your spending limit!!",
                iconUrl: "icon.jpg"
            };
            if (parseInt(budget.total) >= parseInt(budget.limit)) {
                chrome.notifications.create(notify);
            }
        });
    });
});