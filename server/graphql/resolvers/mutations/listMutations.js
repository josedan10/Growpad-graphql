const mongoose = require('mongoose')
const moment = require('moment')
const { ApolloError } = require('apollo-server-express')

// Models
const UserModel = require('../../../models/User')
const ListModel = require('../../../models/List')

/**
 * @description: Creates a new list and set the list's title
 *
 * @param {*} parent
 * @param { username, title } args
 * @param {*} context
 * @param {*} info
 * @returns
 */
const createList = async (parent, { title }, context, info) => {
  try {
    // Get userId by authetication
    let userId = mongoose.Types.ObjectId(uid)
    let list = new ListModel({ title, createdBy: userId })
    list = await list.save()
    await UserModel.findOneAndUpdate({ _id: userId },
      {
        $push: {
          lists: mongoose.Types.ObjectId(list._id)
        }
      }
    )
    return {
      msg: `List '${title}' successfully created.`,
      status: 200,
      errors: []
    }
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
const deleteList = async (parent, { id }, context, info) => {
  try {
    let userId = mongoose.Types.ObjectId(uid)
    await ListModel.findOneAndDelete(
      {
        _id: mongoose.Types.ObjectId(id),
        createdBy: userId
      }
    )

    await UserModel.updateMany(
      {
        lists: mongoose.Types.ObjectId(id)
      },
      {
        $pull: { lists: mongoose.Types.ObjectId(id) }
      }
    )

    return {
      msg: `List deleted successfully.`,
      status: 200,
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
 * @description: set the list with new list passed in "input" array, and the list title
 *
 * @param {*} parent
 * @param { id, input, title } args
 * @param {*} context
 * @param {*} info
 * @returns { List }
 */
const modifyList = async (parent, { id, input, title }, context, info) => {
  try {
    await ListModel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      {
        $set: { title, items: input }
      }
    )

    return {
      msg: `List '${title}' updated successfully: saved ${input.length} items.`,
      status: 200,
      errors: []
    }
  } catch (error) {
    console.log(error)
    throw new ApolloError('Error modifying item.', '400', error)
  }
}

module.exports = {
  createList,
  modifyList,
  deleteList
}
