const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

//import { bcrypt } from 'bcryptjs'
//import { jwt } from 'jsonwebtoken'
//import { APP_SECRET, getUserId } from '../utils'

/*async function signup(parent, args, context, info) {
    // encrypt the User’s password using the bcryptjs library 
    const password = await bcrypt.hash(args.password, 10)

    // store the new User record in the database 
    const user = await context.prisma.user.create({ data: { ...args, password } })

    // generating a JSON Web Token which is signed with an APP_SECRET using the jwt library
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    // return the token and the user in an object that adheres to the shape of an 
    // AuthPayload object from your GraphQL schema.
    return {
        token, 
        user,
    }
}

async function login(parent, args, context, info) {

    // retrieve an existing User record by the email address that was sent along as an argument in the login mutation. 
    const user = await context.prisma.user.findUnique({ where: { email: args.email } })

    if (!user) {
        throw new Error('No such user found')
    }

    // compare the provided password with the one that is stored in the database.
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('No such user found')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

async function post(parent, args, context, info) {
    const { userId } = context

    return await context.prisma.link.create({
        data: {
            url: args.url,
            description: args.description,
            postedBy: { connect: { id: userId } },
        }
    })
}

module.exports = {
    signup, 
    login, 
    post,
}*/
async function signup(parent, args, context, info) {
    // 1
    const password = await bcrypt.hash(args.password, 10)
  
    // 2
    const user = await context.prisma.user.create({ data: { ...args, password } })
  
    // 3
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    // 4
    return {
      token,
      user,
    }
  }
  
  async function login(parent, args, context, info) {
    // 1
    const user = await context.prisma.user.findUnique({ where: { email: args.email } })
    if (!user) {
      throw new Error('No such user found')
    }
  
    // 2
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    // 3
    return {
      token,
      user,
    }
  }

  async function post(parent, args, context, info) {
    const { userId } = context;

    const newLink = await context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
          postedBy: { connect: { id: userId } },
        }
    })

    context.pubsub.publish("NEW_LINK", newLink)

    return newLink
  }

  async function vote(parent, args, context, info) {

      // the first step is to validate the incoming JWT with the getUserId helper function
      const userId = getUserId(context)

      // If the vote exists, it will be stored in the vote variable, resulting in the boolean
      // true from your call to Boolean(vote) — throwing an error kindly telling the user that they already voted.
      const vote = await context.prisma.vote.findUnique({
          where: {
              linkId_userId: {
                  linkId: Number(args.linkId),
                  userId: userId
              }
          }
      })

      if (Boolean(vote)) {
          throw new Error(`Already voted for link: ${args.linkId}`)
      }

      // If that Boolean(vote) call returns false, the vote.create method will be 
      // used to create a new Vote that’s connected to the User and the Link.
      const newVote = context.prisma.vote.create({
          data: {
              user: { connect: { id: userId } },
              link: { conntect: { id: Number(args.linkId) } },
          }
      })
      context.pubsub.publish("NEW_VOTE", newVote)

      return newVote
  }
  
  module.exports = {
    signup,
    login,
    post,
    vote,
  }