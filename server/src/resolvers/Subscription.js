function newLinkSubscribe(parent, args, context, info) {
    return context.pubsub.asyncIterator("NEW_LINK")
    // The asyncIterator function is used to resolve subscriptions and push the event data.
}

// the subscription resolver is provided as the value for a subscribe field inside a plain JavaScript object.

const newLink = {
    subscribe: newLinkSubscribe,
    resolve: payload => {
        return payload
    },
}

function newVoteSubscribe(parent, args, context, info) {
    return context.pubsub.asyncIterator("NEW_VOTE")
}

const newVote = {
    subscribe: newVoteSubscribe,
    resolve: payload => {
        return payload
    },
}

module.exports = {
    newLink,
    newVote,
}