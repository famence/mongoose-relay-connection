import { connectionFromArraySlice, getOffsetWithDefault } from 'graphql-relay'

const connectionFromMongooseQuery = async (sourceQuery, args) => {
  const { after, before, first, last } = args
  const Query = sourceQuery.toConstructor()
  const totalCount = await new Query().countDocuments()

  const beforeOffset = getOffsetWithDefault(before, totalCount)
  const afterOffset = getOffsetWithDefault(after, -1)
  let startOffset = Math.max(0 - 1, afterOffset, -1) + 1
  let endOffset = Math.min(totalCount, beforeOffset, totalCount)

  if (typeof first === 'number') {
    if (first < 0) throw new Error('Argument "first" must be a non-negative integer')

    endOffset = Math.min(endOffset, startOffset + first)
  }
  if (typeof last === 'number') {
    if (last < 0) throw new Error('Argument "last" must be a non-negative integer')

    startOffset = Math.max(startOffset, endOffset - last)
  }

  return {
    ...connectionFromArraySlice(await new Query().skip(startOffset).limit(last), args, {
      sliceStart: startOffset,
      arrayLength: totalCount
    }),
    totalCount
  }
}

export default connectionFromMongooseQuery