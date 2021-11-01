// @ts-ignore
import { createServer, Model } from "miragejs"
import fakeData from '@/data-set.json'
import { count } from "console"
// @ts-ignore
export function startFakeServer() {
  const server = createServer({
    models: {
      event: Model,
      user: Model
    },

    routes() {
      this.timing = 0
      this.db.loadData({ events: [...fakeData] })
      this.get("/api/events", function (schema: any, request) {
        const { user_id, number_of_items = 9, page = 1, current_item_id }: any = request.queryParams
        
        const events = user_id ? schema.events.where({ user_id: user_id }) : schema.events.all()
        const numberOfItems = Number(number_of_items)
        // @ts-ignore
        const json = this.serialize(events)
        const currentIndex = current_item_id? json.events.findIndex(({id}:{id:string})=>id===current_item_id):null
        console.log(currentIndex)
        let offset = Number(page) - 1;
        let begin = currentIndex ? currentIndex - Math.ceil(numberOfItems/2-1) : ( 0 + (numberOfItems * offset));
        begin = begin < 0? 0 : begin;
        const eventsCount = json.events.length
        json.meta = { page: page, count: eventsCount }
        const filterd = json.events.slice(begin, begin + numberOfItems)
        return { ...json, events:filterd}
      })
      this.get("/api/events/users", function (schema: any, request) {
        const events = schema.events.all().models
        //^Extract user list from event list / @p = Previous result in reduce / @c = The current item
        const users = Object.keys(events.reduce((p: any, c: any) => ({ ...p, [c['user_id']]: 1 }), {})).map(item => ({ value: item, text: item }))
        // const json = this.serialize(users)
        // @ts-ignore        
        return { users: this.serialize(users) }
      })
      this.delete("/api/events", (schema: any, request) => {
        const id = request.queryParams.id

        return schema.events.where({ id }).destroy()
      })
    },
  })
  return server
}