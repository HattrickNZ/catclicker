var debug = 1;

var arr = ["img/telescope.jpg",
			"img/Snapshot.jpg",
			"img/GameStart.jpg",
			"img/GameWin.jpg",
			"img/Map_Grass.jpg"];
			
// create an array with just the filename
var fn = arr.map(function(item) {
				return item.replace(/^.*[\\\/]/, '')
			})		

// build my data object with my files			
var data = arr.map(function(item) {
				var obj = {
					file_src: item,
					name: item.replace(/^.*[\\\/]/, ''),
					count: 0
				}
				return obj
			})

var arr_len=arr.length			

console.log("arr",arr)
console.log("fn",fn)
console.log("arr_len",arr_len)

var model = 
	{
		init: function() {
			if(debug){console.log("model has started...")}
		},
		getAllCatList: function () {
			if(debug){console.log("getAllCatList...")}
			return data
		},
		updateCatData: function (obj,id) {
			if(debug){console.log("updateCatData...")}
			data[id]=obj;
			octopus.updateCatList()
		}
		

	}

var octopus = 
	{ 
		init: function() {
			if(debug){console.log("octopus has started...")}
			model.init();
            view.init();
		},
		getCatList: function () {
			return model.getAllCatList()
		},
		showCat: function(id) {
			if(debug){console.log("showCat has started...")}
			if(debug){console.log("id",id)}
			var catDisplay=$("#cat-display")
			var h3 = '<h3 >cat name'+id+' : ' + data[id].name + ' </h3>'
			var img = '<img id='+ id + ' alt = ' + data[id].name + ' src=' + data[id].file_src + ' style="width:304px;height:208px;">'
			var p = '<p>count:' + data[id].count + ' </p>'
			catDisplay.empty();
			catDisplay.append(h3+img + p);
		},
		countUp1: function(id) {
			if(debug){console.log("countUp1...")}
			data[id].count=data[id].count+1
			octopus.showCat(id);
		},
		toggleAdminForm: function(id) {
			if(debug){console.log("toggleAdminForm...")}
			this.adminForm = $('#admin-form');
			console.log("this.adminForm",this.adminForm)
			//this.adminForm.apapend('<form class ="form">Cat name:<input type="text" name="cat-name" placeholder="10"><br>Count:   <input type="text" name="count"></form>')
			this.adminForm.toggle();
		},
		changeCatData: function(obj,id) {
			if(debug){console.log("changeCatData...")}
			model.updateCatData(obj,id);
			octopus.showCat(id);
		},
		updateCatList: function() {
			if(debug){console.log("changeCatData...")}
			view.catListRender();
		}
	}

var view = 
	{
		init: function() {
			if(debug){console.log("view has started...")}
			
			//draw the cat list - get the cat list 
			// where do I draw the cat list 
			this.catList = $('#cat-list');
			this.catDisplay = $('#cat-display');
			this.adminButton = $('#admin-button');
			this.cancelButton = $('#cancel-button');
			saveButton = $('#save-button'); //why not use this here 
			
			
			this.catList.click(function(e){
				console.log("catList-e",e);
				console.log("catList-e.id",e.target.id);
				var id = e.target.id
				octopus.showCat(id);			
			});
			
			this.catDisplay.click(function(e){
				console.log("catDisplay-e",e);
				console.log("catDisplay-e.id",e.target.id);
				var id = e.target.id;
				octopus.countUp1(id)
				
			})
			
			this.adminButton.click(function(e){
				console.log("adminButton-e",e);
				console.log("adminButton-e.id",e.target.id);
				octopus.toggleAdminForm()
			})
			
			this.cancelButton.click(function(e){
				console.log("cancelButton-e",e);
				console.log("cancelButton-e.id",e.target.id);
				octopus.toggleAdminForm()
			})
			
			saveButton.click(function(e){
				console.log("saveButton-e",e);
				console.log("saveButton-e.id",e.target.id);
				var catName = $('form #admin-cat-name').val();
				var source = $('form #admin-source').val();
				var count = parseInt($('form #admin-count').val());
				var catId = $('#cat-display img').attr('id')
				var obj = {
					file_src: source,
					name: catName,
					count: count
				}
				
				if(debug){console.log("catName:",catName)};
				if(debug){console.log("source:",source)};
				if(debug){console.log("count:",count)};
				//octopus.toggleAdminForm()
				//get the values that need to be saved 
				//save the changes to data 
				//update the view with the new changes 
				octopus.changeCatData(obj,catId)
			})
			
			view.catListRender();
			view.catDisplayRender();
		},
		catListRender: function() {
			var htmlStr = '';
            octopus.getCatList().forEach(function(list,i){
                htmlStr += '<li id='+ i +' class='+list.name+'>cat name: ' + list.name+' </li>';
            });
			if(debug){console.log("htmlStr",htmlStr)}
            this.catList.html( htmlStr );
		},
		catDisplayRender: function(){
            
			octopus.showCat(0) // always show 1st cat in array at start
        }
	}


    octopus.init(); // this starts it all 


