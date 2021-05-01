import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getNotes(query) {
    const notes = await dbContext.Notes.find(query).populate('creator', 'name picture')
    return notes
  }

  async create(body) {
    return await dbContext.Notes.create(body)
  }

  async edit(body) {
    const notes = await dbContext.Notes.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!notes) {
      throw new BadRequest('Invalid Id')
    }
    return notes
  }

  async delete(id, creatorId) {
    const notes = await dbContext.Notes.findOneAndDelete({ _id: id, creatorId })
    if (!notes) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}

export const notesService = new NotesService()
