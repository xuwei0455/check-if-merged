module.exports = function (calls, mock) {
  expect(mock).toHaveBeenCalledTimes(calls.length)

  for (let i = 0; i < calls.length; i++) {
    expect(mock).toHaveBeenNthCalledWith(i + 1, calls[i])
  }
}
