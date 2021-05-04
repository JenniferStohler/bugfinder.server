import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get('', this.getAll) // KEEP THIS
      .get('/:id', this.getById)
      .get('/:id/notes', this.getNotes)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  // <------------gets, posts, puts, and deletes--------->

  async getAll(req, res, next) {
    try {
      const bugs = await bugsService.getAll()
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const bug = await bugsService.getById({ _id: req.params.id })
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getNotes(req, res, next) {
    try {
      const notes = await notesService.getNotes({
        bug: req.params.id
      })
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const bugs = await bugsService.create(req.body)
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      delete req.body.closed
      const bugs = await bugsService.edit(req.body)
      return res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      req.body.closed = true
      const bugs = await bugsService.delete(req.body)
      return res.send(bugs)
    } catch (error) {
      next(error)
    }
  }
}
