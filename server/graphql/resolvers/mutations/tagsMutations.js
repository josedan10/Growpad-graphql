const { ApolloError } = require('apollo-server-express')
const mongoose = require('mongoose')

// Models
const TagModel = require('../../../models/Tag')
const UserModel = require('../../../models/User')
const ListModel = require('../../../models/List')
const NoteModel = require('../../../models/Note')

let uid = '5c8b23ac145b1136f4b6b244'

/**
 * Preconditions:
 * * The user must be exists
 *
 * @param {*} parent
 * @param { userId, name } args
 * @param {*} context
 * @param {*} info
 * @returns { Tag }
 */
const addUserToTag = async (parent, { name }, context, info) => {
  name = name.toLowerCase()
  try {
    let existsTag = await TagModel.findOne({ name })
    let tag
    let userId = mongoose.Types.ObjectId(uid)

    // No duplicate users
    if (existsTag) {
      tag = await TagModel.findOneAndUpdate(
        {
          name
        },
        {
          $addToSet: { users: userId }
        }
      )
    } else {
      tag = new TagModel({
        name,
        users: [userId]
      })
      await tag.save()
    }

    return {
      msg: `User added to tag '${name}'.`,
      status: 200,
      errors: []
    }
  } catch (error) {
    throw new ApolloError(`Error creating tag '${name}': ${error.message}`, '400')
  }
}

/**
 * @description: remove all user refs in tag (notes, lists)
 *
 * Preconditions:
 * * The user must exists
 * * The name must exists
 *
 * @param {*} parent
 * @param { userId, name } args
 * @param {*} context
 * @param {*} info
 * @returns { Response }
 */
const removeUserFromTag = async (parent, { name }, context, info) => {
  try {
    let userId = mongoose.Types.ObjectId(uid)
    let tag = await TagModel.findOneAndUpdate({ name: name },
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
    throw new ApolloError(`Error removing user from '${name}' tag: ${error.message}`, '400')
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
const removeTagsFromList = async (parent, { id, tagIds }, { req }, info) => {
  try {
    let { uid } = req
    let userId = mongoose.Types.ObjectId(uid)
    tagIds = tagIds.map((id) => mongoose.Types.ObjectId(id))
    await ListModel.updateOne({ _id: mongoose.Types.ObjectId(id) },
      {
        $pull: {
          tags: { $in: tagIds }
        }
      }
    )

    await TagModel.updateMany({ _id: tagIds },
      {
        $pull: {
          users: userId
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

/**
 * @description: add tags to list.
 *
 * IMPORTANT: In TagModel doesn't put the ListId.
 * Tag is associated to Users
 *
 * @param {*} parent
 * @param { tags, id } args
 * @param {*} context
 * @param {*} info
 * @return { Response }
 */
const addTagsToList = async (parent, { tagIds, id }, { req }, info) => {
  try {
    let { uid } = req
    let userId = mongoose.Types.ObjectId(uid)
    tagIds = tagIds.map((id) => mongoose.Types.ObjectId(id))
    await TagModel.updateMany({ _id: tagIds },
      {
        $addToSet: {
          users: userId
        }
      }
    )

    await ListModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) },
      {
        $addToSet: { tags: { $each: tagIds } }
      }
    )

    return {
      msg: `Added tags to list.`,
      status: 200,
      errors: []
    }
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error adding tags to list: ${error.message}`)
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
const removeTagsFromNote = async (parent, { tagIds, id }, { req }, info) => {
  try {
    let { uid } = req
    let userId = mongoose.Types.ObjectId(uid)
    tagIds = tagIds.map((id) => mongoose.Types.ObjectId(id))
    await NoteModel.updateOne({ _id: mongoose.Types.ObjectId(id) },
      {
        $pull: {
          tags: { $in: tagIds }
        }
      }
    )

    await TagModel.updateMany({ _id: tagIds },
      {
        $pull: {
          users: userId
        }
      }
    )

    return {
      msg: `Tag successfully removed from note`,
      status: 200,
      errors: []
    }
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error removing tag from Note: ${error.message}`, '400')
  }
}

/**
 * @description: add tags to note.
 *
 * IMPORTANT: In TagModel doesn't put the NoteId.
 * Tag is associated to Users
 *
 * @param {*} parent
 * @param { tags, id } args
 * @param {*} context
 * @param {*} info
 * @return { Response }
 */
const addTagsToNote = async (parent, { tagIds, id }, { req }, info) => {
  try {
    let { uid } = req
    let userId = mongoose.Types.ObjectId(uid)
    tagIds = tagIds.map((id) => mongoose.Types.ObjectId(id))
    await TagModel.updateMany({ _id: tagIds },
      {
        $addToSet: {
          users: userId
        }
      }
    )

    await NoteModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) },
      {
        $addToSet: { tags: { $each: tagIds } }
      }
    )

    return {
      msg: `Added tags to note.`,
      status: 200,
      errors: []
    }
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error adding tags to note: ${error.message}`)
  }
}

module.exports = {
  addUserToTag,
  removeUserFromTag,
  addTagsToList,
  removeTagsFromList,
  addTagsToNote,
  removeTagsFromNote
}
