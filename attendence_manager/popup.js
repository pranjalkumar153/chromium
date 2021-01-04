$(function() {
    //=====================================================================================//
    //ADD BUTTON FUNCTIONALITY                                                             //
    //=====================================================================================//
    $("#add_subject").click(function() {
        var sub_name = $("subject_name").val();
        chrome.storage.sync.get(["subject_list"], function(res) {
            var sub_list;
            if (sub_name != "" && sub_name) {
                if (!res.subject_list) {
                    sub_list = [];
                    sub_list.push(sub_name);
                    chrome.storage.sync.set({ "subject_list": sub_list }, function() {
                        console.log("New Subject Added!!");
                        alert("New Subject Added Successfully!!");
                    });
                } else {
                    sub_list = res.subject_list;
                    sub_list.push(sub_name);
                    chrome.storage.sync.set({ "subject_list": sub_list }, function() {
                        console.log("New Subject Added!!");
                        alert("New Subject Added Successfully!!");
                    });

                }
            }
        });
    });
    $("#remove_subject").click(function() {});
});