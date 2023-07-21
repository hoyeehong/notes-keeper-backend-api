import mongoose from "mongoose"
import 'dotenv/config'

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.w8ogeew.mongodb.net/notesDB`, {useNewUrlParser: true})

const notesSchema = {
    noteId: String,
    title: String,
    content: String
}

const Note = mongoose.model("Note", notesSchema)

export default Note
