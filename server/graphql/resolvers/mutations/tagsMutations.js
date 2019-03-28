const { ApolloError } = require('apollo-server-express')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

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
    let userId = ObjectId(uid)
    await TagModel.findOneAndUpdate(
      {
        name
      },
      {
        $addToSet: { users: userId }
      },
      {
        upsert: true
      }
    )

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
    let userId = ObjectId(uid)
    let tag = await TagModel.findOneAndUpdate({ name: name },
      {
        $pull: {
          users: userId
        }
      }
    )

    await UserModel.findOneAndUpdate(
      {
        _id: ObjectId(userId),
        'lists.tags': ObjectId(tag._id)
      },
      {
        $pull: {
          'lists.$.tags': ObjectId(tag._id)
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
    let { uid } = req.session
    let userId = ObjectId(uid)
    tagIds = tagIds.map((id) => ObjectId(id))
    await ListModel.updateOne({ _id: ObjectId(id) },
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
    let { uid } = req.session
    let userId = ObjectId(uid)
    tagIds = tagIds.map((id) => ObjectId(id))
    await TagModel.updateMany({ _id: tagIds },
      {
        $addToSet: {
          users: userId
        }
      }
    )

    await ListModel.findOneAndUpdate({ _id: ObjectId(id) },
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
const removeTagsFromNote = async (parent, { tags, id }, { req }, info) => {
  try {
    // let { uid } = req.session
    // let userId = ObjectId(uid)
    let tagIds = await Promise.all(
      tags.map(async (name) => {
        name = name.toLowerCase()
        let tag = await TagModel.findOne(
          { name },
          { name: 1 }
        )

        if (!tag) throw new ApolloError(`Tag doesn't exists.`, 404)
        return ObjectId(tag._id)
      })
    )
    // TODO: attempt remove tag from user
    return NoteModel.findOneAndUpdate({ _id: ObjectId(id) },
      {
        $pull: {
          tags: { $in: tagIds }
        }
      },
      {
        new: true
      }
    )
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
const addTagsToNote = async (parent, { tags, id }, { req }, info) => {
  try {
    let { uid } = req.session
    let userId = ObjectId(uid)

    let tagIds = await Promise.all(
      tags.map(async (name) => {
        name = name.toLowerCase()
        let tag = await TagModel.findOneAndUpdate(
          { name },
          {
            $set: { name },
            $addToSet: {
              users: userId
            }
          },
          { upsert: true, new: true }
        )

        return ObjectId(tag._id)
      })
    )

    return NoteModel.findByIdAndUpdate(ObjectId(id),
      {
        $addToSet: { tags: { $each: tagIds } }
      },
      { new: true }
    )
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
