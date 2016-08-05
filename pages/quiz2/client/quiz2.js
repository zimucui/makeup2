Template.quiz2.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    sort: "All",
    show: 10,     //这个不太知道什么意思
    who: "none",  //这个其实也不需要


  });
});


Template.quiz2.helpers({
	donations: function(){
    const instance = Template.instance();
    const sort = instance.state.get("sort");   
    const show= instance.state.get("show");
    console.log("sort="+sort);
    let donations = [];
    switch(sort){

      case "TraWorld":
            donations =
                Donations.find({team:"TraWorld"},{limit:show});
            console.dir(donations);
            break;

      case "TalkBoard":
            donations =
                Donations.find({team:"TalkBoard"},{limit:show});    //排序
            break;


      case "ChefsAssistant":
            donations =
              Donations.find({team:"ChefsAssistant"},{limit:show}); 
            break;

      case "Epoch":
            donations =
              Donations.find({team:"Epoch"},{limit:show}); 
            break;

      case "VirtualPet":
            donations =
              Donations.find({team:"VirtualPet"},{limit:show}); 
            break;
      case "PlanDeis":
            donations =
              Donations.find({team:"PlanDeis"},{limit:show}); 
            break;

      default:
            donations =
              Donations.find({},{sort:{team:-1}, limit:show});
            break;


       }
    return donations;
  },
})

Template.quiz2.events({
   "change .js-sort": function(event,instance){
    const sortby = $(".js-sort").val();
    instance.state.set("sort", sortby);
    console.log("sortby="+sortby);
  },
});

Template.donationForm.events({
  "click .js-share": function(event,instance){
     event.preventDefault();
     //console.dir(event);
     const  name = $(".js-name").val();
     if (name=="") {
      window.alert("you must enter a name!");
      return;
     }
     const rating = $(".js-rating").val();
     const comment = $(".feedback").val();
     const team = $(".js-who").val();
     const donation_obj =
     {name,rating,comment, team,
      createdAt: new Date(),
      createdBy: Meteor.userId(),
    };
      //console.dir(comment_obj);
      Donations.insert(donation_obj);
      $(".js-name").val("");
      $(".js-rating").val("");
      $(".feedback").val("");
      //Router.go('/');
      console.log("Did we get here????")
  },

});


Template.donationRow.events({
	"click .js-delete-comment": function(event){
    console.log("clicked on the x");
    console.dir(this);
    Donations.remove(this.d._id);
  },
})
