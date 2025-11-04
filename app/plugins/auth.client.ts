export default defineNuxtPlugin(async () => {
  const { fetchUser } = useAuth()
  
  // Try to fetch user on app initialization
  // This will work if there's a valid auth cookie
  try {
    await fetchUser()
  } catch (error) {
    // If fetch fails, user remains null (not logged in)
    console.log('User not authenticated')
  }
})
