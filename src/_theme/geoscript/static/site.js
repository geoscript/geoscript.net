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
        
        var language = site.getLanguage();
        
        var languages = [{
            id: "js", title: "JavaScript"
        }, {
            id: "py", title: "Python"
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
        var repos = {
            js: "tschaub/geoscript-js",
            py: "jdeolive/geoscript-py",
        };
        var head = document.getElementsByTagName("head")[0];
        var script;
        for (var key in repos) {
            script = document.createElement("script");
            script.src = "http://github.com/api/v2/json/commits/list/" + repos[key] + "/master/?callback=site.showCommits('" + key + "commits')";
            head.appendChild(script);
        }
        
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

