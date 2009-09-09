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
    }
    
};
