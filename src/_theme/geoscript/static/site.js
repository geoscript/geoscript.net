var site = {
    
    showCommits: function(id) {
        var template = new jugl.Template("gitcommits");
        return function(data) {
            var commit, msg, words, commits = data.commits;
            for (var i=0, len=commits.length; i<len; ++i) {
                commit = commits[i];
                msg = commit.message;
                words = msg.split(/\s+/);
                if (words.length > 10) {
                    words = words.splice(0, 10);
                    words.push("...");
                }
                commit.message = words.join(" ");
            }
            template.process({
                clone: true,
                parent: id,
                context: {commits: commits}
            });
        };
    },
    
    makeTabs: function() {
        
        var languages = [{
            id: "js", title: "JavaScript"
        }, {
            id: "py", title: "Python"
        }];
        
        var list = $("<ul></ul>");

        var selectors = [], lang, sel, id, href, li;
        for (var i = 0; i<languages.length; ++i) {
            lang = languages[i];
            id = "tab-" + lang.id;
            href = "#" + id;
            $("." + id).eq(0).each(function() {this.id = id});
            selectors.push(href);
            li = "<li><a href='" + href + "'>" + lang.title + "</a></li>";
            list.append(li);
        }
        
        $(selectors.join(", ")).wrapAll("<div id='tab-group'></div>");

        $("#tab-group").prepend(list).tabs();
        
    }
    
};

