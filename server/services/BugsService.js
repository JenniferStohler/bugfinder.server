import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getAll(query = {}) {
    const bugs = await dbContext.Bugs.find(query).populate('creator', 'name picture')
    return bugs
  }

  async getById(query) {
    const bug = await dbContext.Bugs.findOne(query).populate('creator', 'name picture')
    return bug
  }

  async create(body) {
    return await dbContext.Bugs.create(body)
  }

  async edit(body) {
    const data = await dbContext.Bugs.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async delete(body) {
    const data = await dbContext.Bugs.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }

  // async findById(id) {
  //   const boards = await dbContext.Boards.findById(id)
  //   if (!boards) {
  //     throw new BadRequest('Invalid Id')
  //   }
  //   return boards
  // }
}

export const bugsService = new BugsService()
