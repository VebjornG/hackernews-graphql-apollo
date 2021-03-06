function postedBy(parent, args, context) {
    // fetching the Link from the database using the prisma instance and then invoke postedBy on it.
    return context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy()
}

function votes(parent, args, context) {
    return context.prisma.link.findUnique({ where: { id: parent.id } }).votes()
}

module.exports = {
    postedBy,
    votes,
}