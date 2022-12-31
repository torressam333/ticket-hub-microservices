/**
 * Absrtact class that can be used by other error classes
 *
 * Any sub classes must satisfy this AB classe's requirements
 *
 * Using AB class so JS will have this class definition when
 * TS gets compiled (interfaces completely go away from the type
 * definition file)
 *
 */
export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor() {
    super();

    // Must do this since this class extends a BUILT IN class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // Subclass must return array of objects w/ string msg prop and option string field property
  abstract serializeErrors(): { message: string; field?: string }[];
}
