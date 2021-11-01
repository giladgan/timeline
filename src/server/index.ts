// @ts-ignore
import { createServer ,Model} from "miragejs"
import fakeData from '@/data-set.json'
// @ts-ignore
export function startFakeServer() {
    const server = createServer({
      models: {
        event: Model,
        user: Model
      },
        routes() {
          this.db.loadData({events:[...fakeData]})
          this.get("/api/events", (schema:any, request) =>{
          const user_id = request.queryParams.user_id
          console.log(schema)
           return user_id ? schema.events.where({ user_id:user_id }) : schema.events.all()
          } )
          this.get("/api/events/users", (schema:any, request) =>{
            const events = schema.events.all().models
            //^Extract user list from event list / @p = Previous result in reduce / @c = The current item
            const users = Object.keys(events.reduce((p:any,c:any)=>({...p,[c['user_id']]:1}),{})).map(item=>({value:item,text:item}))         
           return {users}

          })
          this.delete("/api/events", (schema:any, request) => {
            const id = request.queryParams.id
            console.log('id',id)
            return schema.events.where({ id }).destroy()
          })
        },
      })
      return server
}