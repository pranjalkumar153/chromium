$(function() {
    //=====================================================================================//
    //INITIAL CONTENT OF THE PAGE                                                          //
    //=====================================================================================//
    chrome.storage.sync.get(["subject_list"], function(res) {
        if (!res.subject_list) {
            $("#attendence_record").html("<h6>No record available!!</h6>");
        } else {
            var sub_list = res.subject_list;
            var val = "<table style='border:solid black 5px;'><tr><th> Subject </th><th> Classes Attended </th><th> Total Classes Held </th><th>Mark Attendence</th > <th> Mark Absent </th><th>Remove Subject</th></tr> ";
            for (var i = 0; i < sub_list.length; i++) {
                val += "<tr><td>" + sub_list[i].sub_name + "</td>";
                val += "<td><center>" + sub_list[i].classes_attended + "</center></td>";
                val += "<td><center>" + sub_list[i].classes_held + "</center></td>";
                val += "<td><center>" + "<img src='green_tick.jpg' >" + "</center></td>";
                val += "<td><center>" + "<img src='red_cross.jpg' >" + "</center></td>";
                val += "<td><center>" + "<img src='trash.png' style = 'width: 40px;'>" + "</center></td>";
                val += "</tr>";
            }
            val += "</table>";
            $("#attendence_record").html(val);
        }
    });
    //=====================================================================================//
    //ADD BUTTON FUNCTIONALITY                                                             //
    //=====================================================================================//
    $("#add_subject").click(function() {
        var sub_name = $("#subject_name").val();
        chrome.storage.sync.get(["subject_list"], function(res) {
            var sub_list;
            if (sub_name != "" && sub_name) {
                var classes_attended = 0;
                var classes_held = 0;
                var subject = {
                    sub_name: sub_name,
                    classes_attended: classes_attended,
                    classes_held: classes_held
                };
                if (!res.subject_list) {
                    sub_list = [];
                    sub_list.push(subject);
                    chrome.storage.sync.set({ "subject_list": sub_list }, function() {
                        console.log("New Subject Added!!");
                        alert("New Subject Added Successfully!!");
                    });
                } else {
                    sub_list = res.subject_list;
                    var f = true;
                    // handling duplicates
                    for (var i = 0; i < sub_list.length; i++) {
                        if (sub_name == sub_list[i].sub_name) {
                            f = false;
                            break;
                        }
                    }
                    if (f) {
                        sub_list.push(subject);
                        chrome.storage.sync.set({ "subject_list": sub_list }, function() {
                            console.log("New Subject Added!!");
                            alert("New Subject Added Successfully!!");
                        });
                    } else {
                        alert("The subject already exists!!");
                        console.log("The subject already exists!!");
                    }
                }
            }
            $("#subject_name").val("");
            location.reload();
        });
    });
    //=====================================================================================//
    //REMOVE BUTTON FUNCTIONALITY                                                          //
    //=====================================================================================//
    $("#remove_subject").click(function() {
        var sub_name = $("#subject_name").val();
        chrome.storage.sync.get(["subject_list"], function(res) {
            var sub_list = res.subject_list;
            if (!sub_list) {
                console.log("Your subject list is empty!! Hence can't remove any subject.");
                alert("Your subject list is empty!! Hence can't remove any subject.");
            } else {
                var f = false;
                var aux_sub_list = [];
                for (var i = 0; i < sub_list.length; i++) {
                    if (sub_name != sub_list[i].sub_name) {
                        aux_sub_list.push(sub_list[i]);
                    } else {
                        f = true;
                    }
                }
                chrome.storage.sync.set({ "subject_list": aux_sub_list }, function() {
                    if (!f) {
                        console.log("The subject which you were trying to delete isn't available!!");
                        alert("The subject which you were trying to delete isn't available!");
                    } else {
                        console.log("Subject successfully deleted!!");
                        alert("Subject successfully deleted!!");
                    }
                });
            }
        });
        $("#subject_name").val("");
        location.reload();
    });
    //=====================================================================================//
    //CLEAR BUTTON FUNCTIONALITY                                                           //
    //=====================================================================================//
    $("#clear_data").click(function() {
        chrome.storage.sync.clear(function() {
            console.log("Data Cleared Successfully!!");
            alert("Data Cleared Successfully!!");
        });
        location.reload();
    });
});