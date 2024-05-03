import { auth } from "@clerk/nextjs"

const adminIds = ["user_2eC1aDtmkgHiie3swX7RUgwHsdx"]

export function isAdmin() {
  const { userId } = auth()

  if (!userId) {
    return false
  }

  return adminIds.indexOf(userId) !== -1
}
