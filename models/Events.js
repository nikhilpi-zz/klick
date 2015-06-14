Events = new Mongo.Collection('Events');

Events.attachSchema(
    new SimpleSchema({
    title: {
      type: String
    },
    area: {
      type: String,
      label: 'Area',
      autoform: {
        options: function () {
          return _.map(Areas.find().fetch(), function (area) {
            return {label: area.name, value: area._id};
          });
        }
      }
    },
    createdAt: {
      type: Date,
      autoValue: function() {
        if (this.isInsert) {
          return new Date;
        } else if (this.isUpsert) {
          return {$setOnInsert: new Date};
        } else {
          this.unset();
        }
      },
      autoform: {
        omit: true
      }
    },
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Events.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
}
