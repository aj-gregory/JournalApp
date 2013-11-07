JournalApp.Views.BlogShow = Backbone.View.extend({

  template: JST['blogs/show'],

	events: {
		'dblclick .name':'editName',
		'dblclick .description':'editDescription',
		'blur .nameEditBox':'updateName',
		'blur .descriptionEditBox':'updateDescription',
		'click .addPostBtn':'addPost',
    'click .followBtn':'followBlog'
	},

	render: function() {
    var that = this;

		var renderedContent = this.template({
			blog: this.model,
			blogPosts: this.model.blogPosts
		});

    this.$el.html(renderedContent);

    this.model.blogPosts.each(function(post) {
      that.$el.children('.posts').append(that.renderPost(post));
    });

		return this;
	},

  renderPost: function(post) {
    postView = new JournalApp.Views.PostShow({ model: post });
    return postView.render().$el;
  },

	editName: function() {
		var boxTemp = JST['blogs/nameEditBox'];
		box = boxTemp({
			attr: this.model.get('name')
		});

		$('.name').html(box);
	},

	editDescription: function() {
		var boxTemp = JST['blogs/descriptionEditBox'];
		box = boxTemp({
			attr: this.model.get('description')
		});

		$('.description').html(box);
	},

	updateName: function(event) {
		var newName = $(event.currentTarget).val();
    this.model.set({
			"name":newName
		});

		this.model.save();
    $('.name').html(newName);
	},

	updateDescription: function(event) {
		var newDescription = $(event.currentTarget).val();
    this.model.set({
			"description":newDescription
		});

		this.model.save();
    $('.description').html(newDescription);
	},

	addPost: function() {
		var newPost = new JournalApp.Models.Post();
		var postTitle = $('.newPostTitle').val();
		var postBody = $('.newPostBody').val();

		newPost.set({
      "title": postTitle,
      "body": postBody
    });

		this.model.blogPosts.add(newPost);
		this.model.save();

    $('.posts').append('<li>' + newPost.escape('title') + '</li>');
	},

  followBlog: function() {
    $.ajax ({
      url: "/blogs/" + this.model.get('id') + "/follows",
      type: 'POST',
      success: function(data) {
        console.log("success", data);
      }
    });
  }
});