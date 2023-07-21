import Note from '../models/notes-model'

describe("Notes Service Unit Tests", function () {
    test('Save Note functionality into database', async () => {
        const newNote = {
            noteId: '456',
            title: 'Title1',
            content: 'This is title1'
        }
        const note = new Note(newNote)
        const insertedData = await note.save()
        
        expect(insertedData).toBeDefined()
        expect(insertedData._id).toBeDefined()
        expect(insertedData.noteId).toBe(newNote.noteId)
        expect(insertedData.title).toBe(newNote.title)
        expect(insertedData.content).toBe(newNote.content)
    })
    
    test('Delete Note functionality from database', async () => {
        const noteId = '123'
        const deletedData = await Note.findOneAndDelete({noteId : noteId})
        expect(deletedData).toBeDefined()
    })

      
})