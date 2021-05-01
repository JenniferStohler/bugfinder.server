import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class NotesController extends BaseController {
  constructor() {
    super('/api/notes')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      // .get('', this.getAll) // KEEP THIS
      // .get('/:id', this.getById)
      // .get('/:id/notes', this.getNotes)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  // <----------------gets, posts, puts, deletes------------>
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const notes = await notesService.create(req.body)
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const notes = await notesService.edit(req.body)
      return res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const notes = await notesService.delete(req.params.id, req.userInfo.id)
      return res.send(notes)
    } catch (error) {
      next(error)
    }
  }
}
