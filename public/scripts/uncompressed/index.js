$(document).ready(function () {
    var articles = []
    var socket = io.connect('http://localhost:8080/');
    socket.on('article', function (data) {
        // console.log(data);
        // console.log(data["pubDate"])
        articles.push(data)

        // console.log(containsObject(data,articles))
        // if (!containsObject(data,articles)) {
        //     console.log(data)
        // }
    });
    console.log(articles)
    setInterval(function(){
        console.log(articles)
    }, 1000);
})
function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (JSON.stringify(list[i]) == JSON.stringify(obj)) {
            return true;
        }
    }

    return false;
}
function urlParse(url) {
    var url = url.substring(url.indexOf("/") + 2);
    var urlPoint = url.replace(/[^.]/g, "").length;
    if (urlPoint > 1) {
        return url.substring(url.indexOf(".") + 1);
    } else {
        return url;
    }
}
function articleCreate(title,author,url,date) {
    // var randTitle = ['Designing a Userspace Disk I/O Scheduler for Modern Datastores (2016)', 'List of places to find remote jobs and freelancing projects', 'Apple open sources FoundationDB', 'A manufacturing process that produces long strips of high-quality graphene', 'Robot Conquers One of the Hardest Human Tasks: Assembling Ikea Furniture', 'Darwin: a genomics co-processor provides up to 15,000x acceleration ', 'Southwest 1380: think about the flight attendants', 'The History of Processing', 'Facebook Is Forming a Team to Design Its Own Chips', 'Ask HN: What tools do you use to automate your business?'];
    // var randAuthor = ['nytimes.com', 'llvm.org', 'medium.com', 'qz.com', 'harvard.edu'];
    // let authorTrue;
    let age;

    // If author does not exist do not show the box
    // if (author == null || author.length == 0) {authorTrue = 'style="display: false; padding: 0"'} else {authorTrue = ""}

    // Calculating article age
    var articleAgeSeconds = Math.abs(Date.now() - date) / 1000;
    var days = Math.floor(articleAgeSeconds / 86400);
    articleAgeSeconds -= days * 86400;
    var hours = Math.floor(articleAgeSeconds / 3600) % 24;
    articleAgeSeconds -= hours * 3600;
    var minutes = Math.floor(articleAgeSeconds / 60) % 60;
    if (days > 0) {
        if (days > 1) {
            age = days + " days ago"
        } else {
            age = days + " day ago"
        }
    } else if (hours > 0) {
        if (hours > 1) {
            age = hours + " hours ago"
        } else {
            age = hours + " hour ago"
        }
    } else {
        if (minutes > 1) {
            age = minutes + " minutes ago"
        } else {
            age = minutes + " minute ago"
        }
    }
    $('#articleContainer').prepend(`<div id="article"><span id="author">${author}</span><a id="title" target="_blank" href="${url}">${title}</a><a href="${url.origin}" target="_blank" id="source">(${urlParse(url.origin)})</a><span id="age">${age}</span></div>`);
}
