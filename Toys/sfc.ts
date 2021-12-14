export type SFCHook<S> = (from: S, to: S) => void

export interface SFCEvent<S> {
  name: string
  from: S[]
  to: S
  before?: SFCHook<S>
  after?: SFCHook<S>
}

export interface SFCEventNormal<S> {
  from: S | S[]
  to: S
  before?: SFCHook<S>
  after?: SFCHook<S>
}

export interface StateEvents<S> {
  state: S
  events: SFCEvent<S>[]
}

export interface StateEqual<S> {
  (a: S, b: S): boolean
}

class SFC<S> {
  private state: S
  private events: { [key: string]: SFCEvent<S> } = {}
  private stateEvents: StateEvents<S>[] = []

  private equal: StateEqual<S> = (a, b) => a === b
  private before?: SFCHook<S>
  private after?: SFCHook<S>

  constructor(initState: S, option?: { equal?: StateEqual<S>; before?: SFCHook<S>; after?: SFCHook<S> }) {
    this.state = initState
    if (option) {
      if (option.equal) this.equal = option.equal
      if (option.before) this.before = option.before
      if (option.after) this.after = option.after
    }
  }

  private getStateEvent = (state: S): StateEvents<S> | undefined => {
    return this.stateEvents.find((se) => this.equal(se.state, state))
  }

  public addEvent(name: string, event: SFCEventNormal<S>) {
    if (this.events[name]) throw new Error(`event: ${name} already existed`)

    const from = Array.isArray(event.from) ? event.from : [event.from]
    const eve = { ...event, name, from }
    this.events[name] = eve

    from.forEach((f) => {
      const stateEvent = this.getStateEvent(f)
      if (stateEvent) stateEvent.events.push(eve)
      else this.stateEvents.push({ state: f, events: [eve] })
    })
  }

  public getCanExecEvent(state: S = this.state): string[] {
    const stateEvent = this.getStateEvent(state)
    return stateEvent ? stateEvent.events.map((e) => e.name) : []
  }

  public canExecEvent(name: string, state: S = this.state): boolean {
    const stateEvent = this.getStateEvent(state)
    if (!stateEvent) return false
    return stateEvent.events.some((e) => e.name === name)
  }

  public currentState(): S {
    return this.state
  }

  public call(name: string) {
    if (!this.canExecEvent(name)) throw new Error(`can't exec ${name}`)

    const event = this.events[name]
    const from = this.state
    const to = event.to
    this.before && this.before(from, to)
    event.before && event.before(from, to)
    this.state = to
    event.before && event.before(from, to)
    this.after && this.after(from, to)
  }
}

export default SFC
