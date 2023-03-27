/**
 * Subjects in nats === a channel (event name etc...)
 *
 * Enum similar to object with properties and then
 * an implementation must have the properties listed
 * in the enum
 *
 * Forces strict adherence (typing) when adding event names in the
 * nats publishers/subscribers
 *
 * Implementatoion example:
 *
 * const printSubject = (subject: Subjects) => {};
 * printSubject(Subjects.TicketCreated); ------> no error
 * printSubject('some-random-string'); ------> ERROR
 */
export enum Subjects {
  TicketCreated = 'ticket:created',
  TicketUpdated = 'ticket:updated',
}
