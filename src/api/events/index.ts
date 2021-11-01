const getUserList = async () => {
    const response = await (await fetch("/api/events/users")).json()
    return response.users || null
  }
  const getEvents = async ({ user_id }: { user_id: any }) => {
    const response = await (await fetch(`/api/events?user_id=${user_id}`)).json()
    return response.events
  }
  const delateEvent = async ({ id }: { id: any }) => {
    const response = await (await fetch(`/api/events?id=${id}`, {
      method: 'DELETE'})).json()
    return response.events
  }
 
  export {getUserList,getEvents,delateEvent}