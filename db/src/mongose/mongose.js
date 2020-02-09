const mongoose = require('mongoose');
mongoose.connect('mongodb://118.190.99.85/local', {useUnifiedTopology: true, useNewUrlParser: true});

const Cat = mongoose.model('Cat', {name: String});

const kitty = new Cat({name: 'Zildjian'});
kitty.save().then(() => console.log('meow'));

Cat.findOne((err, res) => {
    console.log(err, res);
})
