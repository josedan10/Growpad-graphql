const mongoose = require('mongoose')
const { ApolloError } = require('apollo-server-express')
const moment = require('moment')
const _ = require('lodash')

// Models
const UserModel = require('../../../models/User')

/**
 * @name: signUp
 * @summary: Create the user
 * @tutorial:
 *  Resolvers https://www.youtube.com/watch?v=TIAfjBXsY2E&index=6&list=PLcCp4mjO-z9_y8lByvIfNgA_F18l-soQv
 *  Authentication  https://www.youtube.com/watch?v=zNcNghhKZjo&list=PLcCp4mjO-z9_y8lByvIfNgA_F18l-soQv&index=9
 *                  https://www.youtube.com/watch?v=Ejw9YA3kC3o&list=PLcCp4mjO-z9_y8lByvIfNgA_F18l-soQv&index=10
 *
 * @description:
 *  Successfully status:
 *  * 200: OK
 *  * 201: Created
 *  * 202: Accepted
 *  * 204: No content
 *
 *  Errors:
 *  * 400: Bad Request
 *  * 401: Unauthorized
 *  * 412: Precondition Failed
 *  * 500: Internal Server Error
 *
 * @param {*} parent
 * @param {*} args
 * @param {*} context
 * @param {*} info
 * @returns { User | ApolloError }
 */
const signUp = async (parent, args, context, info) => {
  let user

  try {
    user = await new UserModel(args)
    return await user.save()
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error creating user '${args.username}'.`, '400')
  }
}

/**
 *
 *
 * @param {*} parent
 * @param { username, title } args
 * @param {*} context
 * @param {*} info
 * @returns
 */
const createList = async (parent, { username, title }, context, info) => {
  try {
    await UserModel.findOneAndUpdate({ username },
      {
        $push: {
          lists: { title }
        }
      },
      {
        safe: true,
        upsert: true
      }
    )
    return {
      msg: `List '${title}' successfully.`,
      status: 200,
      errors: []
    }
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error creating '${title}' list`, '400')
  }
}

const changeListTitle = async (parent, { username, listId, listTitle }, context, info) => {
  try {
    await UserModel.findOneAndUpdate(
      {
        username,
        'lists._id': mongoose.Types.ObjectId(listId)
      },
      {
        $set: {
          'lists.$.title': listTitle
        }
      }
    )

    return {
      msg: `List renamed to '${listTitle}'.`,
      status: 200,
      errors: []
    }
  } catch (error) {
    console.log('error')
    throw new ApolloError(`Error renaming list.`, '400')
  }
}

const deleteList = async (parent, { username, listId }, context, info) => {
  try {
    await UserModel.findOneAndUpdate(
      {
        username
      },
      {
        $pull: {
          lists: { _id: mongoose.Types.ObjectId(listId) }
        }
      },
      {
        safe: true,
        upsert: true
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

const addItemToList = async (parent, { itemName, username, listId }, context, info) => {
  try {
    await UserModel.findOneAndUpdate({ username, 'lists._id': mongoose.Types.ObjectId(listId) }, {
      $push: {
        'lists.$.items': {
          name: itemName
        }
      },
      $set: {
        'lists.$.updatedAt': moment.now()
      }
    })
    return {
      msg: `Item '${itemName}' added successfully`,
      status: 200,
      errors: []
    }
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error adding '${itemName}' to list: '`, '400', error)
  }
}

const modifyListItem = async (parent, { itemId, listId, username, itemName, isChecked }) => {
  try {
    let user = await UserModel.findOne(
      {
        username
      },
      { lists: 1 }
    )

    let listIndex = _.findIndex(user.lists, { id: listId })
    let list = user.lists[listIndex]
    let itemIndex = _.findIndex(list.items, { _id: mongoose.Types.ObjectId(itemId) })
    let item = list.items[itemIndex]

    item.name = itemName
    item.checked = isChecked

    user.lists[listIndex].items[itemIndex] = item
    await user.save()

    return {
      msg: `Item '${itemName}' modified successfully`,
      status: 200,
      errors: []
    }
  } catch (error) {
    console.log(error)
    throw new ApolloError('Error modifying item.', '400', error)
  }
}

const deleteListItem = async (parent, { username, listId, itemId }, context, info) => {
  try {
    let user = await UserModel.findOne(
      {
        username
      },
      { lists: 1 }
    )
    const listIndex = _.findIndex(user.lists, { _id: mongoose.Types.ObjectId(listId) })
    const updatedItems = _.remove(user.lists[listIndex].items, { _id: mongoose.Types.ObjectId(itemId) })

    user.lists[listIndex].items = updatedItems

    await user.save()
    return {
      msg: 'Item deleted successfully.',
      status: 200,
      errors: []
    }
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error deleting list item.`, '400')
  }
}

module.exports = {
  signUp,
  createList,
  changeListTitle,
  deleteList,
  addItemToList,
  modifyListItem,
  deleteListItem
}
