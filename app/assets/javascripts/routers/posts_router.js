JournalApp.Routers.Blogs = Backbone.Router.extend({

	routes: {
  	"":"blogsIndex",
		"blogs/new":"blogNew",
		"blogs/:id":"blogShow",
		"blogs/:id/edit":"blogEdit"
  },

	blogsIndex: function() {
    var view = new JournalApp.Views.BlogsIndex({
    	collection: JournalApp.blogs
    });

		$('.sidebar').html(view.render().$el);
		//$('.content').empty();
	},

	blogShow: function(id) {
    var view = new JournalApp.Views.BlogShow({
    	model: JournalApp.blogs.get(id),
    });

		this.swapView(view);
	},

	blogEdit: function(id) {
		var view = new JournalApp.Views.BlogForm({
			model: JournalApp.blogs.get(id)
		});

		this.swapView(view);
	},

	blogNew: function() {
		var model = new JournalApp.Models.Blog();
		var view = new JournalApp.Views.BlogForm({
			model: model,
			collection: JournalApp.blogs
		});

		this.swapView(view, '.content');
	},

  swapView: function(newView, el) {
    if(this.lastView){
      this.lastView.remove();
    }

    this.lastView = newView;

		$('.content').html(newView.render().$el);
		this.blogsIndex();
  }
});
