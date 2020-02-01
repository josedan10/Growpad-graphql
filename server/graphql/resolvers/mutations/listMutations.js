const mongoose = require('mongoose')
const moment = require('moment')
const { ApolloError } = require('apollo-server-express')

// Models
const UserModel = require('../../../models/User')
const ListModel = require('../../../models/List')

const { ObjectId } = mongoose.Types

/**
 * @description: Creates a new list and set the list's title
 *
 * @param {*} parent
 * @param { username, title } args
 * @param {*} context
 * @param {*} info
 * @returns
 */
const createList = async (parent, { title }, { req, uid }, info) => {
  try {
    // Get userId by authetication
    let userId = ObjectId(uid)
    let list = await ListModel.create({ title, createdBy: userId })
    UserModel.updateOne({ _id: userId },
      {
        $push: {
          lists: ObjectId(list._id)
        }
      }
    ).exec()

    return list
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error creating '${title}' list`, '400')
  }
}

/**
 * @description: Delete all references of the list (delete refs if the list was shared)
 * Only the creator can delete the list
 *
 * @param {*} parent
 * @param { id } args
 * @param {*} context
 * @param {*} info
 * @returns { Response }
 */
const deleteList = async (parent, { id }, { req, uid }, info) => {
  try {
    let userId = ObjectId(uid)
    let list = await ListModel.findOneAndDelete(
      {
        _id: ObjectId(id),
        createdBy: userId
      }
    )

    await UserModel.updateMany(
      {
        lists: ObjectId(id)
      },
      {
        $pull: { lists: ObjectId(id) }
      }
    )

    return {
      success: true,
      msg: 'List deleted',
      errors: []
    }
  } catch (error) {
    console.log(error)
    throw new ApolloError(
      `Error deleting the list: ${error.message.replace('"', '\'')}`,
      '400',
      {
        errorMsg: error.message
      }
    )
  }
}
/**
 * @description: Creates a new item in user's list
 *
 * @param {*} parent
 * @param {*} args
 * @param {*} context
 * @param {*} info
 */
const addItemToList = async (parent, { id, name }, context, info) => {
  try {
    return ListModel.findOneAndUpdate(
      {
        _id: ObjectId(id)
      },
      {
        $addToSet: {
          items: {
            name,
            checked: false
          }
        }
      },
      {
        new: true
      }
    )
  } catch (error) {
    console.log(error)
    throw new ApolloError('Error adding new item.', '400', error)
  }
}

/**
 * @description: set the list with new list passed in "input" array, and the list title
 *
 * @param {*} parent
 * @param { id, input, title } args
 * @param {*} context
 * @param {*} info
 * @returns { List }
 */
const modifyList = async (parent, { id, items, title }, { req, uid }, info) => {
  try {
    // TODO: verify uid in list
    return ListModel.findOneAndUpdate(
      {
        _id: ObjectId(id)
      },
      {
        $set: { title, items }
      },
      {
        new: true
      }
    )
  } catch (error) {
    console.log(error)
    throw new ApolloError('Error modifying item.', '400', error)
  }
}

/**
 *
 *
 * @param {*} parent
 * @param { id, users } args
 * @param { req } context
 * @param {*} info
 * @returns [List]
 */
const shareListWith = async (parent, { id, users }, { req }, info) => {
  try {
    let { uid } = req.session
    let usersDB = await UserModel.find({ username: { $in: users } }, { _id: 1 })

    if (users.length !== usersDB.length) {
      throw new ApolloError(`One or more users doesn't exists`, 404)
    }

    UserModel.updateMany(
      { username: { $in: users } },
      { $addToSet: { lists: ObjectId(id) } }
    ).exec()

    let usersIds = usersDB.map(user => user._id)
    return ListModel.findByIdAndUpdate(
      {
        _id: ObjectId(id),
        createdBy: ObjectId(uid)
      },
      {
        $addToSet: {
          sharedWith: { $each: usersIds }
        }
      },
      {
        new: true
      }
    )
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error sharing list: ${error.message}.`, 500)
  }
}

const stopShareListWithUsers = async (parent, { id, users }, { req }, info) => {
  try {
    UserModel.updateMany(
      { username: { $in: users } },
      {
        $pull: {
          lists: { $each: users }
        }
      }
    )
    users = await UserModel.find({ username: { $in: users } }, { _id: 1 })
    let userIds = users.map(user => user._id)
    let { uid } = req
    let userId = ObjectId(uid)
    return ListModel.findOneAndUpdate(
      {
        _id: ObjectId(id),
        createdBy: userId
      },
      {
        $pull: {
          sharedWith: { $each: userIds }
        }
      },
      { new: true }
    )
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error stopping share list: ${error.message}.`, 500)
  }
}

module.exports = {
  createList,
  addItemToList,
  modifyList,
  deleteList,
  shareListWith,
  stopShareListWithUsers
}
