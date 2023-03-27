const mongoose = requirer('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
})

module.exports = mongoose.model('Author', authorSchema);