var site = {
    
    showCommits: function(id) {
        var template = new jugl.Template("gitcommits");
        return function(data) {
            var commit, msg, words, commitsToReturn = [], commits = data.data;
            for (var i=0, len=commits.length; i<len; ++i) {
                commit = commits[i].commit;
                msg = commit.message;
                words = msg.split(/\s+/);
                if (words.length > 10) {
                    words = words.splice(0, 10);
                    words.push("...");
                }
                commitsToReturn.push({
                    url: commit.url,
                    message : words.join(" "),
                    author: {
                        login: commit.author.login,
                        name: commit.author.name
                    },
                    authored_date: commit.author.date
                });
            }
            template.process({
                clone: true,
                parent: id,
                context: {commits: commitsToReturn}
            });
        };
    },
    
    prepCommits: function(key, repo) {
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        var functionName = "show_" + key + "_commits";
        this[functionName] = site.showCommits(key + "commits");
        script.src = "https://api.github.com/repos/" + repo + "/commits?callback=site." + functionName;
        head.appendChild(script);
    },  
    
    prepDownloads: function(key, repo) {
        // page must have element with "downloads-link" class name to fetch tag list
        if ($(".downloads-link").length > 0) {
            var head = document.getElementsByTagName("head")[0];
            var script = document.createElement("script");
            var functionName = "show_" + key + "_releases";
            this[functionName] = site.showDownloads(key, repo);
            script.src = "https://api.github.com/repos/" + repo + "/releases/?callback=site." + functionName;
            head.appendChild(script);        
        }
    },
    
    showDownloads: function(key, repo) {

        var ul = $("<ul></ul>")
            .addClass("download-tag-list")
            .insertAfter($(".downloads-link")[0]);

        // sort tags assuming semantic versioning
        var sorter = function(a, b) {
            a = a.replace(/^\D*/, "");
            var aParts = a.split("."); 
            var aX = parseInt(aParts[0], 10) || 0; 
            var aY = parseInt(aParts[1], 10) || 0; 
            var aZ = parseInt(aParts[2], 10) || 0; 
            var aExt = a.match(/[^\.]+$/);
            if (aExt) {
                aExt = aExt[0].replace(/^\d*/, "");
            }
            b = b.replace(/^\D*/, "");
            var bParts = b.split("."); 
            var bX = parseInt(bParts[0], 10) || 0; 
            var bY = parseInt(bParts[1], 10) || 0; 
            var bZ = parseInt(bParts[2], 10) || 0; 
            var bExt = b.match(/[^\.]+$/);
            if (bExt) {
                bExt = bExt[0].replace(/^\d*/, "");
            }
            return bX - aX || bY - aY || bZ - aZ || (aExt && bExt > aExt);
        }

        return function(data) {
            var names = [];
            for (var name in data.tags) {
                names.push(name);
            }
            names = names.sort(sorter);
            var zip, tgz;
            for (var i=0; i<names.length; ++i) {
                name = names[i];
                zip = "http://github.com/" + repo + "/zipball/" + name;
                tgz = "http://github.com/" + repo + "/tarball/" + name
                ul.append(
                    "<li>" + name + " <a href=" + zip + ">zip</a> | <a href=" + tgz + ">tgz</a></li>"
                );
            }
        };
    },

    makeTabs: function() {
        
        var language = site.getLanguage();
        
        var languages = [{
            id: "js", title: "JavaScript"
        }, {
            id: "py", title: "Python"
        }, {
            id: "scala", title: "Scala"
        }, {
            id: "groovy", title: "Groovy"
        }];
        
        var list = $("<ul></ul>");

        var selectors = [], lang, id, href, li;
        var activeIndex = 0;
        for (var i = 0; i<languages.length; ++i) {
            lang = languages[i];
            if (lang.id === language) {
                activeIndex = i;
            }
            id = "tab-" + lang.id;
            href = "#" + id;
            $("." + id).eq(0).each(function() {this.id = id});
            selectors.push(href);
            li = "<li><a href='" + href + "'>" + lang.title + "</a></li>";
            list.append(li);
        }
        
        $(selectors.join(", ")).wrapAll("<div id='tab-group'></div>");

        $("#tab-group").prepend(list).tabs({
            show: function(event, ui) {
                var language = ui.panel.id.split("-").pop();
                site.setLanguage(language);
            },
            selected: activeIndex
        });
        
    },
    
    prepIndex: function() {
        site.makeTabs();        
    },
    
    prepPage: function() {
        
        // determine whether chooser should be shown
        if ($(".show-chooser").length > 0) {
            $("#code-chooser").show();
        }
        
        // prep buttons
        $(".fg-button:not(.ui-state-disabled)")
        .hover(
            function() { 
                $(this).addClass("ui-state-hover"); 
            },
            function() { 
                $(this).removeClass("ui-state-hover"); 
            }
        )
        .mousedown(function() {
            $(this)
            .parents('.fg-buttonset-single:first')
            .find(".fg-button.ui-state-active")
            .removeClass("ui-state-active");

            if ($(this).is('.ui-state-active.fg-button-toggleable, .fg-buttonset-multi .ui-state-active')) {
                $(this).removeClass("ui-state-active");
            } else {
                $(this).addClass("ui-state-active");
                var language = this.id.split("-").pop();
                site.showCode(language);
            }	
        })
        .mouseup(function() {
            if (!$(this).is('.fg-button-toggleable, .fg-buttonset-single .fg-button,  .fg-buttonset-multi .fg-button')) {
                $(this).removeClass("ui-state-active");
            }
        });

        // show language specific blocks
        site.showCode();
        
    },
    
    showCode: function(language) {
        
        language = language || site.getLanguage();
        $(".code").hide();
        $(".code." + language).show();
        
        $(".refs").hide();
        $(".refs." + language).show();
        
        var chooser = $("#chooser-" + language);
        if (chooser && !chooser.hasClass("ui-state-active")) {
            chooser.addClass("ui-state-active");
        }
        
        site.setLanguage(language);        
        return language;
        
    },
    
    getLanguage: function() {
        return $.cookie("code") || "js";
    },
    
    setLanguage: function(language) {
        $.cookie("code", language, {expires: 180, path: "/"});
    }
    
};

