Template.quiz4.helpers({
	donations:function(){
		return Donations.find({},{sort:{createdAt:-1}});
	}
})

Template.showDonation.helpers({
	picture: function(who){
		switch(who) {
		   case "Hillary": return "hillary.jpg"; break;
			 case "Donald": return "trump.jpg"; break;
		 }
		 return "";
	},

	donationsOf: function(name){
		return Donations.find({name});
	}

})
