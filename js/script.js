$(function(){
    var timeNow = new Date();
    $('h1#dateHeader').text($.format.date(timeNow, "ddd D MMM"));

    $.getJSON("data.json", function(data) {
        var htmlToAdd = $('<div></div>');

        //Build the content column
        var contentColContent = $('<div></div>');
        $.each(data.dailyTasks, function(index, task){
            var taskHtml = $("<div class='task col-md-12'></div>");
            taskHtml.attr("data-starttime", task.start);
            taskHtml.attr("data-endtime", task.end);
            taskHtml.attr("data-name", task.name);
            taskHtml.append("<span class='task-name'>" + task.name + "</span>");
            taskHtml.append("<input type='checkbox'>");
            contentColContent.append(taskHtml);
        });

        //set up people
        var peopleCount = data.people.length;
        var colWidth = Math.floor(12 / peopleCount);

        $.each(data.people, function(index, person){
            personContent = contentColContent;
            if (person.hasOwnProperty("freePass")) { 

                $.each(person.freePass, function(index, pass){
                    personContent.find("[data-name='" + pass.name + "']").children('input').attr('checked', true);
                });
           }

            htmlToAdd.append(
                "<div class='content-column col-md-" + colWidth + "'>" + personContent.html() + "</div>"
            );
        });
        $('#contentContainer').append(htmlToAdd.html());

        //start timer
    });

    //Set up timer
})