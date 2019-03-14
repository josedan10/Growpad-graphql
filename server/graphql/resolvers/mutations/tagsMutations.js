const { ApolloError } = require('apollo-server-express')
const mongoose = require('mongoose')

// Models
const TagModel = require('../../../models/Tag')
const UserModel = require('../../../models/User')

/**
 * Preconditions:
 * * The user must be exists
 *
 * @param {*} parent
 * @param { userId, tagName } args
 * @param {*} context
 * @param {*} info
 * @returns { Tag }
 */
const createTag = async (parent, { userId, tagName }, context, info) => {
  tagName = tagName.toLowerCase()
  try {
    let existsTag = await TagModel.findOne({ name: tagName })
    let tag
    userId = mongoose.Types.ObjectId(userId)

    // No duplicate users
    if (existsTag) {
      tag = await TagModel.findOneAndUpdate(
        {
          name: tagName
        },
        {
          $addToSet: { users: userId }
        }
      )
    } else {
      tag = new TagModel({
        name: tagName,
        users: [userId]
      })
      await tag.save()
    }

    return tag
  } catch (error) {
    throw new ApolloError(`Error creating tag '${tagName}': ${error.message}`, '400')
  }
}

/**
 * Preconditions:
 * * The user must exists
 * * The tagName must exists
 *
 * @param {*} parent
 * @param { userId, tagName } args
 * @param {*} context
 * @param {*} info
 * @returns { Response }
 */
const removeUserFromTag = async (parent, { userId, tagName }, context, info) => {
  try {
    let tag = await TagModel.findOneAndUpdate({ name: tagName },
      {
        $pull: {
          users: userId
        }
      }
    )

    await UserModel.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(userId),
        'lists.tags': mongoose.Types.ObjectId(tag._id)
      },
      {
        $pull: {
          'lists.$.tags': mongoose.Types.ObjectId(tag._id)
        }
      }
    )

    return {
      msg: 'User removed from tag successfully.',
      status: 200,
      errors: []
    }
  } catch (error) {
    throw new ApolloError(`Error removing user from '${tagName}' tag: ${error.message}`, '400')
  }
}

/**
 * Preconditions:
 * * The tag must exists
 * * The list must exists
 * * The username must exists
 *
 * @param {*} parent
 * @param { tagId, listId, username } args
 * @param {*} context
 * @param {*} info
 * @returns { Response }
 */
const addTagToList = async (parent, { tagId, listId, username }, context, info) => {
  try {
    let user = await UserModel.findOneAndUpdate({ username, 'lists._id': mongoose.Types.ObjectId(listId) },
      {
        $addToSet: {
          'lists.$.tags': mongoose.Types.ObjectId(tagId)
        }
      },
      {
        _id: 1
      }
    )

    TagModel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(tagId) },
      {
        $addToSet: {
          users: mongoose.Types.ObjectId(user._id)
        }
      }
    )

    return {
      msg: `Tag added successfully to user's list.`,
      status: 200,
      errors: []
    }
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error adding tag to list: ${error.message}`, '400')
  }
}

/**
 * Preconditions:
 * * The user must exists
 * * The list must exists
 * * The tag must exists
 *
 * @param {*} parent
 * @param { username, listId, tagId } args
 * @param {*} context
 * @param {*} info
 * @returns { Response }
 */
const removeTagFromList = async (parent, { username, listId, tagId }, context, info) => {
  try {
    await UserModel.findOneAndUpdate(
      { username, 'lists._id': listId },
      {
        $pull: {
          'lists.$.tags': mongoose.Types.ObjectId(tagId)
        }
      }
    )

    return {
      msg: `Tag successfully removed from list`,
      status: 200,
      errors: []
    }
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error removing tag from list: ${error.message}`, '400')
  }
}

module.exports = {
  createTag,
  removeUserFromTag,
  addTagToList,
  removeTagFromList
}
